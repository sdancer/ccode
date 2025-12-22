// Module: wV0
// Type: U
// Lines: 380870-380896
//
var wV0 = U((TU2)=>{
    Object.defineProperty(TU2, "__esModule", {
        value: !0
    });
    TU2.Ono = void 0;
    var VY1 = OU2(), jU2 = createRenderState(), h85 = renderElement(), g85 = UV0;
    TU2.Ono = g85;
    function UV0(A, Q) {
        Q = jU2.normalizeOptions(Q);
        function B(...G) {
            let { originalError: Z, props: Y, message: J } = jU2.normalizeArgs(G, Q), X = new A(J);
            return VY1.extendError(X, Z, Y);
        }
        return ((B[Symbol.species] = A), B);
    }
    UV0.toJSON = function(Q) {
        return h85.toJSON.call(Q);
    };
    UV0.extend = function(Q, B, G) {
        if (G || B instanceof Error) return VY1.extendError(Q, B, G);
        else if (B) return VY1.extendError(Q, void 0, B);
        else return VY1.extendError(Q);
    };
});
