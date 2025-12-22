// Module: frA
// Type: L
// Lines: 150433-150467
//
var frA = L(()=>{
    trackPostpone();
    Y2B();
    ((J2B = {}), (lx = _E8));
});
function brA(A, Q = {}, B) {
    let G = [], Z = A.textStyles ? {
        ...Q,
        ...A.textStyles
    } : Q;
    for (let Y of A.childNodes){
        if (Y === void 0) continue;
        if (Y.nodeName === "#text") {
            if (Y.nodeValue.length > 0) G.push({
                text: Y.nodeValue,
                styles: Z,
                hyperlink: B
            });
        } else if (Y.nodeName === "ink-text" || Y.nodeName === "ink-virtual-text") G.push(...brA(Y, Z, B));
        else if (Y.nodeName === "ink-link") {
            let J = Y.attributes.href;
            G.push(...brA(Y, Z, J || B));
        }
    }
    return G;
}
function Jd1(A) {
    let Q = "";
    for (let B of A.childNodes){
        if (B === void 0) continue;
        if (B.nodeName === "#text") Q += B.nodeValue;
        else if (B.nodeName === "ink-text" || B.nodeName === "ink-virtual-text") Q += Jd1(B);
        else if (B.nodeName === "ink-link") Q += Jd1(B);
    }
    return Q;
}
var X2B;
