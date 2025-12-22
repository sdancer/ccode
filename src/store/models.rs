use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Bundle {
    pub id: i64,
    pub name: String,
    pub version: Option<String>,
    pub path: String,
    pub hash: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Module {
    pub id: i64,
    pub bundle_id: i64,
    pub module_id: String,
    pub size: i64,
    pub body_hash: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SymbolKind {
    Function,
    Class,
    Variable,
    Property,
    Method,
    Parameter,
    Import,
    Export,
}

impl SymbolKind {
    pub fn as_str(&self) -> &'static str {
        match self {
            SymbolKind::Function => "function",
            SymbolKind::Class => "class",
            SymbolKind::Variable => "variable",
            SymbolKind::Property => "property",
            SymbolKind::Method => "method",
            SymbolKind::Parameter => "parameter",
            SymbolKind::Import => "import",
            SymbolKind::Export => "export",
        }
    }

    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "function" => Some(SymbolKind::Function),
            "class" => Some(SymbolKind::Class),
            "variable" => Some(SymbolKind::Variable),
            "property" => Some(SymbolKind::Property),
            "method" => Some(SymbolKind::Method),
            "parameter" => Some(SymbolKind::Parameter),
            "import" => Some(SymbolKind::Import),
            "export" => Some(SymbolKind::Export),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Symbol {
    pub id: i64,
    pub module_id: i64,
    pub kind: SymbolKind,
    pub name: String,
    pub parent_id: Option<i64>,
    pub body_hash: Option<String>,
    pub signature: Option<String>,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StringLiteral {
    pub id: i64,
    pub module_id: i64,
    pub symbol_id: Option<i64>,
    pub value: String,
    pub context: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum CallType {
    Direct,
    Property,
    Computed,
}

impl CallType {
    pub fn as_str(&self) -> &'static str {
        match self {
            CallType::Direct => "direct",
            CallType::Property => "property",
            CallType::Computed => "computed",
        }
    }

    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "direct" => Some(CallType::Direct),
            "property" => Some(CallType::Property),
            "computed" => Some(CallType::Computed),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Call {
    pub id: i64,
    pub caller_id: i64,
    pub callee_id: i64,
    pub call_type: CallType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Mapping {
    pub id: i64,
    pub source_bundle_id: i64,
    pub target_bundle_id: i64,
    pub source_symbol_id: i64,
    pub target_symbol_id: i64,
    pub confidence: f64,
    pub match_reason: String,
}

// New structs for insertion (without id field)
#[derive(Debug, Clone)]
pub struct NewBundle {
    pub name: String,
    pub version: Option<String>,
    pub path: String,
    pub hash: String,
}

#[derive(Debug, Clone)]
pub struct NewModule {
    pub bundle_id: i64,
    pub module_id: String,
    pub size: i64,
    pub body_hash: Option<String>,
}

#[derive(Debug, Clone)]
pub struct NewSymbol {
    pub module_id: i64,
    pub kind: SymbolKind,
    pub name: String,
    pub parent_id: Option<i64>,
    pub body_hash: Option<String>,
    pub signature: Option<String>,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Debug, Clone)]
pub struct NewStringLiteral {
    pub module_id: i64,
    pub symbol_id: Option<i64>,
    pub value: String,
    pub context: Option<String>,
}

#[derive(Debug, Clone)]
pub struct NewCall {
    pub caller_id: i64,
    pub callee_id: i64,
    pub call_type: CallType,
}

#[derive(Debug, Clone)]
pub struct NewMapping {
    pub source_bundle_id: i64,
    pub target_bundle_id: i64,
    pub source_symbol_id: i64,
    pub target_symbol_id: i64,
    pub confidence: f64,
    pub match_reason: String,
}

// Library identification cache
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LibraryCache {
    pub id: i64,
    pub body_hash: String,
    pub minified_name: Option<String>,
    pub library_name: Option<String>,
    pub module_path: Option<String>,
    pub cleartext_name: Option<String>,
    pub confidence: Option<f64>,
    pub identification_method: Option<String>,
    pub sample_strings: Option<String>,
    pub created_at: String,
}

#[derive(Debug, Clone)]
pub struct NewLibraryCache {
    pub body_hash: String,
    pub minified_name: Option<String>,
    pub library_name: Option<String>,
    pub module_path: Option<String>,
    pub cleartext_name: Option<String>,
    pub confidence: Option<f64>,
    pub identification_method: Option<String>,
    pub sample_strings: Option<String>,
}
