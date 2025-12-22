// Module: $oA
// Type: L
// Lines: 133173-133192
//
var $oA = L(()=>{
    K6();
});
function dV8() {
    if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") {
        if (JQ.platform !== "darwin") return mV8() || "pycharm";
    }
    return JQ.terminal;
}
var bV8, hV8 = ()=>{
    return (process.platform === "linux" && process.env.CLAUDE_CODE_BUBBLEWRAP === "1");
}, gV8, uV8, mV8, uU;
