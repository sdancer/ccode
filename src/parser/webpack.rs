use swc_common::Span;
use swc_ecma_ast::*;

/// Represents a detected webpack module
#[derive(Debug, Clone)]
pub struct WebpackModule {
    pub id: String,
    pub span: Span,
    pub body: Vec<Stmt>,
}

/// Detect webpack runtime patterns and extract modules
pub fn detect_webpack_modules(module: &Module) -> Vec<WebpackModule> {
    let mut modules = Vec::new();

    for item in &module.body {
        if let ModuleItem::Stmt(stmt) = item {
            // Try to detect webpack patterns
            if let Some(detected) = detect_iife_pattern(stmt) {
                modules.extend(detected);
            } else if let Some(detected) = detect_webpack_chunk_pattern(stmt) {
                modules.extend(detected);
            }
        }
    }

    // If no webpack pattern detected, treat the whole file as a single module
    if modules.is_empty() {
        let stmts: Vec<Stmt> = module
            .body
            .iter()
            .filter_map(|item| {
                if let ModuleItem::Stmt(stmt) = item {
                    Some(stmt.clone())
                } else {
                    None
                }
            })
            .collect();

        if !stmts.is_empty() {
            modules.push(WebpackModule {
                id: "main".to_string(),
                span: module.span,
                body: stmts,
            });
        }
    }

    modules
}

/// Detect webpack 4/5 IIFE pattern: (function(modules) { ... })([...])
fn detect_iife_pattern(stmt: &Stmt) -> Option<Vec<WebpackModule>> {
    let expr_stmt = stmt.as_expr()?;
    let call = expr_stmt.expr.as_call()?;

    // Check if callee is a function expression or parenthesized
    let _func = extract_function_from_callee(&call.callee)?;

    // Check if the first argument is an array or object of modules
    if let Some(arg) = call.args.first() {
        return extract_modules_from_arg(&arg.expr);
    }

    None
}

/// Detect webpack chunk pattern: (self["webpackChunk"] = self["webpackChunk"] || []).push([...])
fn detect_webpack_chunk_pattern(stmt: &Stmt) -> Option<Vec<WebpackModule>> {
    let expr_stmt = stmt.as_expr()?;
    let call = expr_stmt.expr.as_call()?;

    // Check for .push() call
    let member = call.callee.as_expr()?.as_member()?;
    let prop = member.prop.as_ident()?;

    if prop.sym.as_str() != "push" {
        return None;
    }

    // The argument to push should be an array
    if let Some(arg) = call.args.first() {
        if let Some(arr) = arg.expr.as_array() {
            // Webpack chunk format: [[chunkIds], {moduleId: module, ...}, runtime]
            if arr.elems.len() >= 2 {
                if let Some(Some(modules_elem)) = arr.elems.get(1) {
                    return extract_modules_from_arg(&modules_elem.expr);
                }
            }
        }
    }

    None
}

fn extract_function_from_callee(callee: &Callee) -> Option<&Function> {
    match callee {
        Callee::Expr(expr) => {
            if let Some(func) = expr.as_fn_expr() {
                return Some(&func.function);
            }
            if let Some(paren) = expr.as_paren() {
                if let Some(func) = paren.expr.as_fn_expr() {
                    return Some(&func.function);
                }
            }
            None
        }
        _ => None,
    }
}

fn extract_modules_from_arg(expr: &Expr) -> Option<Vec<WebpackModule>> {
    let mut modules = Vec::new();

    match expr {
        // Array of modules: [function(module, exports, require) {...}, ...]
        Expr::Array(arr) => {
            for (idx, elem) in arr.elems.iter().enumerate() {
                if let Some(elem) = elem {
                    if let Some(module) = extract_module_from_elem(&elem.expr, idx.to_string()) {
                        modules.push(module);
                    }
                }
            }
        }
        // Object of modules: {0: function(...) {...}, 1: ...}
        Expr::Object(obj) => {
            for prop in &obj.props {
                if let PropOrSpread::Prop(prop) = prop {
                    if let Prop::KeyValue(kv) = prop.as_ref() {
                        let key = prop_name_to_string(&kv.key);
                        if let Some(module) = extract_module_from_elem(&kv.value, key) {
                            modules.push(module);
                        }
                    }
                }
            }
        }
        _ => {}
    }

    if modules.is_empty() {
        None
    } else {
        Some(modules)
    }
}

fn extract_module_from_elem(expr: &Expr, id: String) -> Option<WebpackModule> {
    match expr {
        Expr::Fn(fn_expr) => {
            let body = fn_expr.function.body.as_ref()?;
            Some(WebpackModule {
                id,
                span: fn_expr.function.span,
                body: body.stmts.clone(),
            })
        }
        Expr::Arrow(arrow) => {
            let stmts = match &*arrow.body {
                BlockStmtOrExpr::BlockStmt(block) => block.stmts.clone(),
                BlockStmtOrExpr::Expr(expr) => {
                    vec![Stmt::Return(ReturnStmt {
                        span: arrow.span,
                        arg: Some(expr.clone()),
                    })]
                }
            };
            Some(WebpackModule {
                id,
                span: arrow.span,
                body: stmts,
            })
        }
        // Handle wrapped functions
        Expr::Paren(paren) => extract_module_from_elem(&paren.expr, id),
        Expr::Call(call) => {
            // Handle factory functions like (function() { return function(m,e,r) {...} })()
            if call.args.is_empty() {
                if let Some(func) = extract_function_from_callee(&call.callee) {
                    let body = func.body.as_ref()?;
                    // Look for the return statement
                    for stmt in &body.stmts {
                        if let Stmt::Return(ret) = stmt {
                            if let Some(arg) = &ret.arg {
                                return extract_module_from_elem(arg, id);
                            }
                        }
                    }
                }
            }
            None
        }
        _ => None,
    }
}

fn prop_name_to_string(name: &PropName) -> String {
    match name {
        PropName::Ident(ident) => ident.sym.as_str().to_string(),
        PropName::Str(s) => s.raw.as_ref().map(|r| r.as_str().to_string()).unwrap_or_else(|| format!("{:?}", s.value)),
        PropName::Num(n) => n.value.to_string(),
        PropName::BigInt(b) => b.value.to_string(),
        PropName::Computed(c) => {
            if let Some(lit) = c.expr.as_lit() {
                match lit {
                    Lit::Str(s) => s.raw.as_ref().map(|r| r.as_str().to_string()).unwrap_or_else(|| format!("{:?}", s.value)),
                    Lit::Num(n) => n.value.to_string(),
                    _ => "computed".to_string(),
                }
            } else {
                "computed".to_string()
            }
        }
    }
}
