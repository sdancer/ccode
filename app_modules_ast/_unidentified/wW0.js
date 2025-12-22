// Module: wW0
// Type: L
// Lines: 365959-365986
//
var wW0 = L(()=>{
    Vv();
    X2();
    GZ1 = l(React runtime(), 1);
});
function eSA() {
    if (process.env.TERM === "xterm-ghostty") return [
        "·",
        "✢",
        "✳",
        "✶",
        "✻",
        "*"
    ];
    return process.platform === "darwin" ? [
        "·",
        "✢",
        "✳",
        "✶",
        "✻",
        "✽"
    ] : [
        "·",
        "✢",
        "*",
        "✶",
        "✻",
        "✽"
    ];
}
function s2A(A, Q, B) {
    return {
        r: Math.round(A.r + (Q.r - A.r) * B),
        g: Math.round(A.g + (Q.g - A.g) * B),
        b: Math.round(A.b + (Q.b - A.b) * B)
    };
}
function zVA(A) {
    return `rgb(${A.r},${A.g},${A.b})`;
}
function NW0({ char: A, flashOpacity: Q }) {
    let Z = s2A({
        r: 215,
        g: 119,
        b: 87
    }, {
        r: 245,
        g: 149,
        b: 117
    }, Q);
    return qW0.createElement(C, {
        color: zVA(Z)
    }, A);
}
var qW0;
