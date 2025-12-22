// Module: I_
// Type: L
// Lines: 364819-364841
//
var I_ = L(()=>{
    I5();
    bZ = JQ.platform === "darwin" ? "⏺" : "●";
});
function w25(A) {
    return `ansi:${A}`;
}
function oG1({ name: A, color: Q }) {
    let B = w25(Q);
    return o2A.createElement(T, {
        flexDirection: "row",
        gap: 1
    }, o2A.createElement(C, {
        color: B
    }, bZ, " ", o2A.createElement(C, {
        bold: !0
    }, A)));
}
var o2A;
