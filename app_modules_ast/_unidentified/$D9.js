// Module: $D9
// Type: L
// Lines: 530382-530490
//
var pushStartInstance = L(()=>{
    bA();
    getViewTransitionClassName();
    createRenderState();
    pushStartInstance();
    N9();
    zyA();
    Y_0();
    A2();
    bA();
    cfA();
    zD9();
    IL0();
    pushStartInstance();
    I5();
    P3();
    createRenderState();
    J_0();
    z8 = l(React runtime(), 1);
});
import { sep as X_0 } from "path";
function I_0(A) {
    let Q = ta();
    if (A === Q.HOME) return "home";
    if (A === Q.DESKTOP || A.startsWith(Q.DESKTOP + X_0)) return "desktop";
    if (A === Q.DOCUMENTS || A.startsWith(Q.DOCUMENTS + X_0)) return "documents";
    if (A === Q.DOWNLOADS || A.startsWith(Q.DOWNLOADS + X_0)) return "downloads";
    return "other";
}
function UD9(A) {
    if (A === null || A.disableAllHooks) return !1;
    if (A.statusLine) return !0;
    if (A.fileSuggestion) return !0;
    if (!A.hooks) return !1;
    for (let Q of Object.values(A.hooks))if (Q.length > 0) return !0;
    return !1;
}
function OD9() {
    let A = [], Q = uB("projectSettings");
    if (UD9(Q)) A.push(".claude/settings.json");
    let B = uB("localSettings");
    if (UD9(B)) A.push(".claude/settings.local.json");
    return A;
}
function wD9(A) {
    return A.some((Q)=>Q.ruleBehavior === "allow" && (Q.ruleValue.toolName === T4 || Q.ruleValue.toolName.startsWith(T4 + "(")));
}
function MD9() {
    let A = [], Q = itA("projectSettings");
    if (wD9(Q)) A.push(".claude/settings.json");
    let B = itA("localSettings");
    if (wD9(B)) A.push(".claude/settings.local.json");
    return A;
}
function sbA(A, Q) {
    if (A.length === 0) return "";
    let B = Q === 0 ? void 0 : Q;
    if (!B || A.length <= B) {
        if (A.length === 1) return A[0];
        if (A.length === 2) return `${A[0]} and ${A[1]}`;
        let Y = A[A.length - 1];
        return `${A.slice(0, -1).join(", ")}, and ${Y}`;
    }
    let G = A.slice(0, B), Z = A.length - B;
    if (G.length === 1) return `${G[0]} and ${Z} more`;
    return `${G.join(", ")}, and ${Z} more`;
}
function qD9(A) {
    return !!A?.otelHeadersHelper;
}
function RD9() {
    let A = [], Q = uB("projectSettings");
    if (qD9(Q)) A.push(".claude/settings.json");
    let B = uB("localSettings");
    if (qD9(B)) A.push(".claude/settings.local.json");
    return A;
}
function ND9(A) {
    return !!A?.apiKeyHelper;
}
function _D9() {
    let A = [], Q = uB("projectSettings");
    if (ND9(Q)) A.push(".claude/settings.json");
    let B = uB("localSettings");
    if (ND9(B)) A.push(".claude/settings.local.json");
    return A;
}
function LD9(A) {
    return !!(A?.awsAuthRefresh || A?.awsCredentialExport);
}
function jD9() {
    let A = [], Q = uB("projectSettings");
    if (LD9(Q)) A.push(".claude/settings.json");
    let B = uB("localSettings");
    if (LD9(B)) A.push(".claude/settings.local.json");
    return A;
}
