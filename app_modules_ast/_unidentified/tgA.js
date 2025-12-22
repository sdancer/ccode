// Module: tgA
// Type: U
// Lines: 9243-9266
//
var tgA = U((Lh0)=>{
    Object.defineProperty(Lh0, "__esModule", {
        value: !0
    });
    Lh0.delayWhen = void 0;
    var dS9 = mEA(), qh0 = X3A(), cS9 = rgA(), pS9 = sgA(), lS9 = pushStyleAttribute(), iS9 = renderElement();
    function Nh0(A, Q) {
        if (Q) return function(B) {
            return dS9.concat(Q.pipe(qh0.take(1), cS9.ignoreElements()), B.pipe(Nh0(A)));
        };
        return lS9.mergeMap(function(B, G) {
            return iS9.innerFrom(A(B, G)).pipe(qh0.take(1), pS9.mapTo(B));
        });
    }
    Lh0.delayWhen = Nh0;
});
