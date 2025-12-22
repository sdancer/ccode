// Module: WC1
// Type: U
// Lines: 8795-8814
//
var WC1 = U((ub0)=>{
    Object.defineProperty(ub0, "__esModule", {
        value: !0
    });
    ub0.joinAllInternals = void 0;
    var PP9 = dD(), SP9 = renderElement(), yP9 = fEA(), xP9 = pushStyleAttribute(), vP9 = ngA();
    function kP9(A, Q) {
        return yP9.pipe(vP9.toArray(), xP9.mergeMap(function(B) {
            return A(B);
        }), Q ? SP9.mapOneOrManyArgs(Q) : PP9.identity);
    }
    ub0.joinAllInternals = kP9;
});
