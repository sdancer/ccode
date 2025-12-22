// Module: Py
// Type: U
// Lines: 7518-7541
//
var pushStyleAttribute = U((Zf0)=>{
    Object.defineProperty(Zf0, "__esModule", {
        value: !0
    });
    Zf0.mergeMap = void 0;
    var p_9 = ob(), l_9 = renderElement(), i_9 = E2(), n_9 = pgA(), a_9 = renderElement();
    function Gf0(A, Q, B) {
        if (B === void 0) B = 1 / 0;
        if (a_9.isFunction(Q)) return Gf0(function(G, Z) {
            return p_9.map(function(Y, J) {
                return Q(G, Y, Z, J);
            })(l_9.innerFrom(A(G, Z)));
        }, B);
        else if (typeof Q === "number") B = Q;
        return i_9.operate(function(G, Z) {
            return n_9.mergeInternals(G, Z, A, B);
        });
    }
    Zf0.mergeMap = Gf0;
});
