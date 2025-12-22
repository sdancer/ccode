// Module: JdA
// Type: L
// Lines: 58773-58809
//
var JdA = L(()=>{
    AN1();
    Qh = P44;
});
function v2Q() {
    return "prod";
}
function k2Q() {
    switch(v2Q()){
        case "local":
            return "-local-oauth";
        case "staging":
            return "-staging-oauth";
        case "prod":
            return "";
    }
}
function w9() {
    switch(v2Q()){
        case "local":
            return v44;
        case "staging":
            return x44 ?? x2Q;
        case "prod":
            return x2Q;
    }
}
var B5A = "user:inference", S44 = "org:create_api_key", fp = "oauth-2025-04-20", y44, QN1, f2Q, x2Q, x44 = void 0, v44;
