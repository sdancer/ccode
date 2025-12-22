// Module: Pt2
// Type: L
// Lines: 463566-463588
//
var Pt2 = L(()=>{
    bA();
    yG = l(React runtime(), 1);
});
function St2({ feeds: A, maxWidth: Q }) {
    let B = A.map((Y)=>jt2(Y)), G = Math.max(...B), Z = Math.min(G, Q);
    return _S.createElement(T, {
        flexDirection: "column"
    }, A.map((Y, J)=>_S.createElement(_S.Fragment, {
            key: J
        }, _S.createElement(Tt2, {
            config: Y,
            actualWidth: Z
        }), J < A.length - 1 && _S.createElement(g8, {
            dividerColor: "claude"
        }))));
}
var _S;
