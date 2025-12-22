// Module: xc1
// Type: L
// Lines: 171654-171696
//
var xc1 = L(()=>{
    ((yc1 = l(React runtime(), 1)), (i$8 = l(React runtime(), 1)), (n$8 = yc1.default.createContext(!1)));
});
function qi(A) {
    let { items: Q, children: B } = A, G = mM.useContext(cU), [Z, Y] = mM.useState(0), J = mM.useMemo(()=>{
        return Q.slice(Z);
    }, [
        Q,
        Z
    ]);
    if ((mM.useLayoutEffect(()=>{
        Y(Q.length);
    }, [
        Q.length
    ]), G)) {
        let I = Q.map((W, K)=>B(W, K));
        return mM.default.createElement("ink-box", {
            style: {
                flexDirection: "column"
            }
        }, I);
    }
    let X = J.map((I, W)=>{
        return B(I, Z + W);
    });
    return mM.default.createElement(d6B, null, mM.default.createElement("ink-box", {
        internal_static: !0,
        style: {
            position: "absolute",
            flexDirection: "column"
        }
    }, X));
}
var mM;
