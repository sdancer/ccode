// Module: q1A
// Type: L
// Lines: 149385-149403
//
var createRenderState = L(()=>{
    tree-sitter WASM();
    fBB();
    jrA();
});
function tm1({ onlyFirst: A = !1 } = {}) {
    let B = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
    ].join("|");
    return new RegExp(B, A ? void 0 : "g");
}
function yX(A) {
    if (typeof A !== "string") throw TypeError(`Expected a \`string\`, got \`${typeof A}\``);
    return A.replace(WE8, "");
}
var WE8;
