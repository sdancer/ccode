// Module: Rr
// Type: L
// Lines: 388771-388810
//
var Rr = L(()=>{
    f61();
    s1();
    Jf();
});
function rH0(A, Q) {
    return `${A}@${Q}`;
}
function oY1(A, Q) {
    let B = Date.now();
    return `${A}-${B}@${Q}`;
}
function ZL2() {
    return `claude-swarm-${process.pid}`;
}
var sH0 = "Teammate", rY1 = "team-lead", tH0 = "tmux";
async function BHA() {
    if (sY1 !== null) return sY1;
    return ((sY1 = !!OY5), sY1);
}
async function eY1() {
    return (await QQ(tH0, [
        "-V"
    ])).code === 0;
}
function eH0() {
    if (tY1 !== null) return tY1;
    let A = process.env.TERM_PROGRAM, Q = !!process.env.ITERM_SESSION_ID, B = JQ.terminal === "iTerm.app";
    return ((tY1 = A === "iTerm.app" || Q || B), tY1);
}
async function AD0() {
    return (await QQ(MY5, [
        "--version"
    ])).code === 0;
}
var OY5, sY1 = null, tY1 = null, MY5 = "it2";
