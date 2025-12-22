// Module: cS0
// Type: L
// Lines: 3105-3137
//
var cS0 = L(()=>{
    mS0();
    dE1();
    ohA();
    ((wN9 = !M8A ? E8A : function(A, Q) {
        return M8A(A, "toString", {
            configurable: !0,
            enumerable: !1,
            value: uS0(Q),
            writable: !0
        });
    }), (dS0 = wN9));
});
function ON9(A) {
    var Q = 0, B = 0;
    return function() {
        var G = LN9(), Z = NN9 - (G - B);
        if (((B = G), Z > 0)) {
            if (++Q >= qN9) return arguments[0];
        } else Q = 0;
        return A.apply(void 0, arguments);
    };
}
var qN9 = 800, NN9 = 16, LN9, pS0;
