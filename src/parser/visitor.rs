use sha2::{Sha256, Digest};
use swc_ecma_ast::*;
use swc_ecma_visit::{Visit, VisitWith};

use crate::store::models::{CallType, SymbolKind};

// Helper to convert string literal value to String
fn str_value_to_string(s: &Str) -> String {
    // Str.value is a Wtf8Atom, convert via as_str()
    s.raw.as_ref().map(|r| r.as_str().to_string())
        .unwrap_or_else(|| format!("{:?}", s.value))
}

/// Extracted symbol information
#[derive(Debug, Clone)]
pub struct ExtractedSymbol {
    pub kind: SymbolKind,
    pub name: String,
    pub parent_name: Option<String>,
    pub body_hash: Option<String>,
    pub signature: Option<String>,
    pub param_count: usize,
}

/// Extracted string literal
#[derive(Debug, Clone)]
pub struct ExtractedString {
    pub value: String,
    pub context: StringContext,
    pub parent_symbol: Option<String>,
}

#[derive(Debug, Clone)]
pub enum StringContext {
    CallArgument,
    PropertyAccess,
    Assignment,
    Return,
    Other,
}

impl StringContext {
    pub fn as_str(&self) -> &'static str {
        match self {
            StringContext::CallArgument => "call_arg",
            StringContext::PropertyAccess => "property",
            StringContext::Assignment => "assignment",
            StringContext::Return => "return",
            StringContext::Other => "other",
        }
    }
}

/// Extracted call edge
#[derive(Debug, Clone)]
pub struct ExtractedCall {
    pub caller: String,
    pub callee: String,
    pub call_type: CallType,
}

/// AST visitor for symbol extraction
pub struct SymbolVisitor {
    pub symbols: Vec<ExtractedSymbol>,
    pub strings: Vec<ExtractedString>,
    pub calls: Vec<ExtractedCall>,

    // Current scope tracking
    scope_stack: Vec<String>,
    in_class: Option<String>,
    // Pending name for next arrow/fn expression from var declarator
    pending_name: Option<String>,
}

impl SymbolVisitor {
    pub fn new() -> Self {
        Self {
            symbols: Vec::new(),
            strings: Vec::new(),
            calls: Vec::new(),
            scope_stack: Vec::new(),
            in_class: None,
            pending_name: None,
        }
    }

    fn take_pending_name(&mut self) -> Option<String> {
        self.pending_name.take()
    }

    fn current_scope(&self) -> Option<String> {
        self.scope_stack.last().cloned()
    }

    fn push_scope(&mut self, name: &str) {
        self.scope_stack.push(name.to_string());
    }

    fn pop_scope(&mut self) {
        self.scope_stack.pop();
    }

    fn add_symbol(&mut self, kind: SymbolKind, name: String, body_hash: Option<String>, signature: Option<String>, param_count: usize) {
        self.symbols.push(ExtractedSymbol {
            kind,
            name,
            parent_name: self.current_scope(),
            body_hash,
            signature,
            param_count,
        });
    }

    fn add_string(&mut self, value: String, context: StringContext) {
        // Skip very short strings and common noise
        if value.len() < 2 || is_noise_string(&value) {
            return;
        }

        self.strings.push(ExtractedString {
            value,
            context,
            parent_symbol: self.current_scope(),
        });
    }

    fn add_call(&mut self, callee: String, call_type: CallType) {
        if let Some(caller) = self.current_scope() {
            self.calls.push(ExtractedCall {
                caller,
                callee,
                call_type,
            });
        }
    }

    fn compute_body_hash(&self, stmts: &[Stmt]) -> String {
        let normalized = normalize_statements(stmts);
        let mut hasher = Sha256::new();
        hasher.update(normalized.as_bytes());
        hex::encode(hasher.finalize())
    }

    fn compute_function_signature(&self, params: &[Param]) -> String {
        // Create a signature based on parameter patterns
        let param_types: Vec<&str> = params
            .iter()
            .map(|p| match &p.pat {
                Pat::Ident(_) => "i",
                Pat::Array(_) => "a",
                Pat::Object(_) => "o",
                Pat::Rest(_) => "r",
                Pat::Assign(_) => "d", // default
                _ => "?",
            })
            .collect();

        format!("({}):{}", param_types.join(","), params.len())
    }
}

impl Visit for SymbolVisitor {
    fn visit_fn_decl(&mut self, n: &FnDecl) {
        let name = n.ident.sym.as_str().to_string();
        let body_hash = n.function.body.as_ref().map(|b| self.compute_body_hash(&b.stmts));
        let signature = Some(self.compute_function_signature(&n.function.params));
        let param_count = n.function.params.len();

        self.add_symbol(SymbolKind::Function, name.clone(), body_hash, signature, param_count);

        self.push_scope(&name);
        n.function.visit_children_with(self);
        self.pop_scope();
    }

    fn visit_fn_expr(&mut self, n: &FnExpr) {
        // Use pending name from var declarator if available
        let name = self.take_pending_name()
            .or_else(|| n.ident.as_ref().map(|i| i.sym.as_str().to_string()))
            .unwrap_or_else(|| format!("anon_{}", self.symbols.len()));

        let body_hash = n.function.body.as_ref().map(|b| self.compute_body_hash(&b.stmts));
        let signature = Some(self.compute_function_signature(&n.function.params));
        let param_count = n.function.params.len();

        self.add_symbol(SymbolKind::Function, name.clone(), body_hash, signature, param_count);

        self.push_scope(&name);
        n.function.visit_children_with(self);
        self.pop_scope();
    }

    fn visit_arrow_expr(&mut self, n: &ArrowExpr) {
        // Use pending name from var declarator if available
        let name = self.take_pending_name()
            .unwrap_or_else(|| format!("arrow_{}", self.symbols.len()));

        let body_hash = match &*n.body {
            BlockStmtOrExpr::BlockStmt(block) => Some(self.compute_body_hash(&block.stmts)),
            BlockStmtOrExpr::Expr(_) => None,
        };

        let param_types: Vec<&str> = n
            .params
            .iter()
            .map(|p| match p {
                Pat::Ident(_) => "i",
                Pat::Array(_) => "a",
                Pat::Object(_) => "o",
                Pat::Rest(_) => "r",
                Pat::Assign(_) => "d",
                _ => "?",
            })
            .collect();

        let signature = Some(format!("({}):{}", param_types.join(","), n.params.len()));
        let param_count = n.params.len();

        self.add_symbol(SymbolKind::Function, name.clone(), body_hash, signature, param_count);

        self.push_scope(&name);
        n.body.visit_children_with(self);
        self.pop_scope();
    }

    fn visit_class_decl(&mut self, n: &ClassDecl) {
        let name = n.ident.sym.as_str().to_string();
        self.add_symbol(SymbolKind::Class, name.clone(), None, None, 0);

        let old_class = self.in_class.take();
        self.in_class = Some(name.clone());
        self.push_scope(&name);
        n.class.visit_children_with(self);
        self.pop_scope();
        self.in_class = old_class;
    }

    fn visit_class_expr(&mut self, n: &ClassExpr) {
        // Use pending name from var declarator if available
        let name = self.take_pending_name()
            .or_else(|| n.ident.as_ref().map(|i| i.sym.as_str().to_string()))
            .unwrap_or_else(|| format!("class_{}", self.symbols.len()));

        self.add_symbol(SymbolKind::Class, name.clone(), None, None, 0);

        let old_class = self.in_class.take();
        self.in_class = Some(name.clone());
        self.push_scope(&name);
        n.class.visit_children_with(self);
        self.pop_scope();
        self.in_class = old_class;
    }

    fn visit_class_method(&mut self, n: &ClassMethod) {
        if let PropName::Ident(ident) = &n.key {
            let method_name = ident.sym.as_str().to_string();
            let full_name = if let Some(class) = &self.in_class {
                format!("{}.{}", class, method_name)
            } else {
                method_name.clone()
            };

            let body_hash = n.function.body.as_ref().map(|b| self.compute_body_hash(&b.stmts));
            let signature = Some(self.compute_function_signature(&n.function.params));
            let param_count = n.function.params.len();

            self.add_symbol(SymbolKind::Method, full_name.clone(), body_hash, signature, param_count);

            self.push_scope(&full_name);
            n.function.visit_children_with(self);
            self.pop_scope();
        }
    }

    fn visit_var_declarator(&mut self, n: &VarDeclarator) {
        if let Pat::Ident(ident) = &n.name {
            let name = ident.id.sym.as_str().to_string();

            // Check if it's a function or class expression
            if let Some(init) = &n.init {
                match init.as_ref() {
                    Expr::Fn(_) | Expr::Arrow(_) => {
                        // Set pending name so arrow_expr/fn_expr uses the variable name
                        self.pending_name = Some(name);
                    }
                    Expr::Class(_) => {
                        // Set pending name for class_expr
                        self.pending_name = Some(name);
                    }
                    _ => {
                        self.add_symbol(SymbolKind::Variable, name, None, None, 0);
                    }
                }
            } else {
                self.add_symbol(SymbolKind::Variable, name, None, None, 0);
            }
        }

        n.visit_children_with(self);
    }

    fn visit_call_expr(&mut self, n: &CallExpr) {
        // Extract callee information
        match &n.callee {
            Callee::Expr(expr) => {
                if let Some(ident) = expr.as_ident() {
                    self.add_call(ident.sym.as_str().to_string(), CallType::Direct);
                } else if let Some(member) = expr.as_member() {
                    if let Some(prop) = member.prop.as_ident() {
                        let callee = if let Some(obj_ident) = member.obj.as_ident() {
                            format!("{}.{}", obj_ident.sym.as_str(), prop.sym.as_str())
                        } else {
                            prop.sym.as_str().to_string()
                        };
                        self.add_call(callee, CallType::Property);
                    }
                }
            }
            _ => {}
        }

        // Extract string arguments
        for arg in &n.args {
            if let Some(lit) = arg.expr.as_lit() {
                if let Lit::Str(s) = lit {
                    self.add_string(str_value_to_string(s), StringContext::CallArgument);
                }
            }
        }

        n.visit_children_with(self);
    }

    fn visit_member_expr(&mut self, n: &MemberExpr) {
        // Extract property access strings
        if let MemberProp::Computed(comp) = &n.prop {
            if let Some(lit) = comp.expr.as_lit() {
                if let Lit::Str(s) = lit {
                    self.add_string(str_value_to_string(s), StringContext::PropertyAccess);
                }
            }
        }

        n.visit_children_with(self);
    }

    fn visit_lit(&mut self, n: &Lit) {
        if let Lit::Str(s) = n {
            self.add_string(str_value_to_string(s), StringContext::Other);
        }
    }

    fn visit_return_stmt(&mut self, n: &ReturnStmt) {
        if let Some(arg) = &n.arg {
            if let Some(lit) = arg.as_lit() {
                if let Lit::Str(s) = lit {
                    self.add_string(str_value_to_string(s), StringContext::Return);
                }
            }
        }
        n.visit_children_with(self);
    }

    fn visit_import_decl(&mut self, n: &ImportDecl) {
        for specifier in &n.specifiers {
            let name = match specifier {
                ImportSpecifier::Named(named) => named.local.sym.as_str().to_string(),
                ImportSpecifier::Default(default) => default.local.sym.as_str().to_string(),
                ImportSpecifier::Namespace(ns) => ns.local.sym.as_str().to_string(),
            };
            self.add_symbol(SymbolKind::Import, name, None, None, 0);
        }
    }

    fn visit_export_decl(&mut self, n: &ExportDecl) {
        match &n.decl {
            Decl::Fn(fn_decl) => {
                self.add_symbol(SymbolKind::Export, fn_decl.ident.sym.as_str().to_string(), None, None, 0);
            }
            Decl::Class(class_decl) => {
                self.add_symbol(SymbolKind::Export, class_decl.ident.sym.as_str().to_string(), None, None, 0);
            }
            Decl::Var(var_decl) => {
                for decl in &var_decl.decls {
                    if let Pat::Ident(ident) = &decl.name {
                        self.add_symbol(SymbolKind::Export, ident.id.sym.as_str().to_string(), None, None, 0);
                    }
                }
            }
            _ => {}
        }
        n.visit_children_with(self);
    }
}

/// Normalize statements for hashing (strip identifiers, keep structure)
fn normalize_statements(stmts: &[Stmt]) -> String {
    let mut result = String::new();

    for stmt in stmts {
        result.push_str(&normalize_stmt(stmt));
    }

    result
}

fn normalize_stmt(stmt: &Stmt) -> String {
    match stmt {
        Stmt::Block(b) => format!("B{{{}}}", normalize_statements(&b.stmts)),
        Stmt::Empty(_) => ";".to_string(),
        Stmt::Debugger(_) => "D".to_string(),
        Stmt::With(_) => "W".to_string(),
        Stmt::Return(r) => {
            if r.arg.is_some() {
                "R1".to_string()
            } else {
                "R0".to_string()
            }
        }
        Stmt::Labeled(_) => "L".to_string(),
        Stmt::Break(_) => "b".to_string(),
        Stmt::Continue(_) => "c".to_string(),
        Stmt::If(i) => {
            let alt = if i.alt.is_some() { "1" } else { "0" };
            format!("I{}", alt)
        }
        Stmt::Switch(s) => format!("S{}", s.cases.len()),
        Stmt::Throw(_) => "T".to_string(),
        Stmt::Try(t) => {
            let c = if t.handler.is_some() { "1" } else { "0" };
            let f = if t.finalizer.is_some() { "1" } else { "0" };
            format!("Y{}{}", c, f)
        }
        Stmt::While(_) => "w".to_string(),
        Stmt::DoWhile(_) => "d".to_string(),
        Stmt::For(_) => "F".to_string(),
        Stmt::ForIn(_) => "FI".to_string(),
        Stmt::ForOf(_) => "FO".to_string(),
        Stmt::Decl(d) => match d {
            Decl::Fn(f) => format!("fn{}", f.function.params.len()),
            Decl::Class(_) => "C".to_string(),
            Decl::Var(v) => format!("V{}", v.decls.len()),
            _ => "?".to_string(),
        },
        Stmt::Expr(_) => "E".to_string(),
    }
}

/// Check if a string is likely noise (common words, single chars, etc.)
fn is_noise_string(s: &str) -> bool {
    // Skip common noise patterns
    let noise = [
        "use strict",
        "undefined",
        "object",
        "function",
        "string",
        "number",
        "boolean",
        "default",
        "exports",
        "module",
        "require",
        "__esModule",
        "__webpack_require__",
        "__webpack_exports__",
    ];

    if noise.contains(&s) {
        return true;
    }

    // Skip if all single character or very common patterns
    if s.len() <= 2 {
        return true;
    }

    false
}

impl Default for SymbolVisitor {
    fn default() -> Self {
        Self::new()
    }
}
