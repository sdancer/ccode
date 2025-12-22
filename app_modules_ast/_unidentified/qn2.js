// Module: qn2
// Type: L
// Lines: 450783-450825
//
var qn2 = L(()=>{
    bA();
    renderElement();
    i0();
    aB();
    _kA();
    Q9();
    qV();
    renderElement();
    pushStartInstance();
    s1();
    X2();
    ff();
    vM();
    EL();
    ((H4A = l(React runtime(), 1)), (kf = l(React runtime(), 1)));
});
function sU0({ suggestions: A, selectedSuggestion: Q }) {
    let { rows: B } = HB(), G = Math.min(10, Math.max(1, B - 3)), Z = (W)=>{
        return Math.max(...W.map((K)=>K.displayText.length)) + 5;
    };
    if (A.length === 0) return null;
    let Y = Z(A), J = Math.max(0, Math.min(Q - Math.floor(G / 2), A.length - G)), X = Math.min(J + G, A.length), I = A.slice(J, X);
    return x$.createElement(T, {
        flexDirection: "column"
    }, I.map((W)=>x$.createElement(Ae5, {
            key: W.id,
            item: W,
            maxColumnWidth: Y,
            isSelected: W.id === A[Q]?.id
        })));
}
var x$, rU0, Ae5, O8Y;
