// Module: _I
// Type: L
// Lines: 322990-323012
//
var _I = L(()=>{
    bA();
    Rm = l(React runtime(), 1);
    g8 = Zh3;
});
function YB({ children: A }) {
    let Q = Mk.Children.toArray(A);
    if (Q.length === 0) return null;
    return Mk.default.createElement(Mk.default.Fragment, null, Q.map((B, G)=>Mk.default.createElement(Mk.default.Fragment, {
            key: Mk.isValidElement(B) ? (B.key ?? G) : G
        }, G > 0 && Mk.default.createElement(C, {
            dimColor: !0
        }, " · "), B)));
}
var Mk;
