// Module: Mf0
// Type: U
// Lines: 7777-7801
//
var Mf0 = U((Lf0)=>{
    Object.defineProperty(Lf0, "__esModule", {
        value: !0
    });
    Lf0.fromEventPattern = void 0;
    var yj9 = zZ(), xj9 = renderElement(), vj9 = renderElement();
    function Nf0(A, Q, B) {
        if (B) return Nf0(A, Q).pipe(vj9.mapOneOrManyArgs(B));
        return new yj9.Observable(function(G) {
            var Z = function() {
                var J = [];
                for(var X = 0; X < arguments.length; X++)J[X] = arguments[X];
                return G.next(J.length === 1 ? J[0] : J);
            }, Y = A(Z);
            return xj9.isFunction(Q) ? function() {
                return Q(Z, Y);
            } : void 0;
        });
    }
    Lf0.fromEventPattern = Nf0;
});
