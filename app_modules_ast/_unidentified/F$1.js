// Module: F$1
// Type: U
// Lines: 10956-10979
//
var F$1 = U((cu0)=>{
    Object.defineProperty(cu0, "__esModule", {
        value: !0
    });
    cu0.takeUntil = void 0;
    var ck9 = E2(), pk9 = renderElement(), lk9 = renderElement(), ik9 = mD();
    function nk9(A) {
        return ck9.operate(function(Q, B) {
            (lk9.innerFrom(A).subscribe(pk9.createOperatorSubscriber(B, function() {
                return B.complete();
            }, ik9.noop)), !B.closed && Q.subscribe(B));
        });
    }
    cu0.takeUntil = nk9;
});
