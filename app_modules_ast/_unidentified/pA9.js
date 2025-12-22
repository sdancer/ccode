// Module: pA9
// Type: L
// Lines: 468604-468619
//
var pA9 = L(()=>{
    rwA();
    dA9 = l(React runtime(), 1);
});
function lA9(A, Q) {
    if (Q) return A ? `agent:builtin:${A}` : "agent:default";
    else return "agent:custom";
}
function xDA() {
    let Q = HQ()?.outputStyle ?? UD;
    if (Q === UD) return "repl_main_thread";
    return Q in M4A ? `repl_main_thread:outputStyle:${Q}` : "repl_main_thread:outputStyle:custom";
}
