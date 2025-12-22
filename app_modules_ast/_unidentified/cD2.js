// Module: cD2
// Type: L
// Lines: 366048-366082
//
var cD2 = L(()=>{
    bA();
    LW0();
    YZ1();
    jI = l(React runtime(), 1);
});
function AyA({ frame: A, messageColor: Q, stalledIntensity: B = 0, isConnected: G }) {
    let Z = lD2[A % lD2.length];
    if (G === !1) return jL.createElement(T, {
        flexWrap: "wrap",
        height: 1,
        width: 2
    }, jL.createElement(C, {
        color: Q
    }, Z));
    if (B > 0) {
        let X = s2A({
            r: 215,
            g: 119,
            b: 87
        }, {
            r: 171,
            g: 43,
            b: 63
        }, B);
        return jL.createElement(T, {
            flexWrap: "wrap",
            height: 1,
            width: 2
        }, jL.createElement(C, {
            color: zVA(X)
        }, Z));
    }
    return jL.createElement(T, {
        flexWrap: "wrap",
        height: 1,
        width: 2
    }, jL.createElement(C, {
        color: Q
    }, Z));
}
var jL, pD2, lD2;
