// Module: ogA
// Type: U
// Lines: 8922-8932
//
var ogA = U((rb0)=>{
    Object.defineProperty(rb0, "__esModule", {
        value: !0
    });
    rb0.concatMap = void 0;
    var ob0 = pushStyleAttribute(), rP9 = renderElement();
    function sP9(A, Q) {
        return rP9.isFunction(Q) ? ob0.mergeMap(A, Q, 1) : ob0.mergeMap(A, 1);
    }
    rb0.concatMap = sP9;
});
