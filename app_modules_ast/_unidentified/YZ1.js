// Module: YZ1
// Type: L
// Lines: 366002-366048
//
var YZ1 = L(()=>{
    bA();
    OW0 = l(React runtime(), 1);
});
function MW0({ message: A, mode: Q, isConnected: B, messageColor: G, glimmerIndex: Z, flashOpacity: Y, shimmerColor: J, stalledIntensity: X = 0 }) {
    if (!A) return null;
    if (B === !1) return jI.createElement(C, {
        color: G
    }, A, " ");
    if (X > 0) {
        let K = s2A({
            r: 215,
            g: 119,
            b: 87
        }, {
            r: 171,
            g: 43,
            b: 63
        }, X), V = zVA(K);
        return jI.createElement(jI.Fragment, null, jI.createElement(C, {
            color: V
        }, A), jI.createElement(C, {
            color: V
        }, " "));
    }
    return jI.createElement(jI.Fragment, null, A.split("").map((I, W)=>{
        if (Q === "tool-use") return jI.createElement(NW0, {
            key: W,
            char: I,
            flashOpacity: Y
        });
        else return jI.createElement(CVA, {
            key: W,
            char: I,
            index: W,
            glimmerIndex: Z,
            messageColor: G,
            shimmerColor: J
        });
    }), jI.createElement(C, {
        color: G
    }, " "));
}
var jI;
