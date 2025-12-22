// Module: bv0
// Type: U
// Lines: 6664-6675
//
var bv0 = U((kv0)=>{
    Object.defineProperty(kv0, "__esModule", {
        value: !0
    });
    kv0.scheduleObservable = void 0;
    var pM9 = renderElement(), lM9 = t8A(), iM9 = e8A();
    function nM9(A, Q) {
        return pM9.innerFrom(A).pipe(iM9.subscribeOn(Q), lM9.observeOn(Q));
    }
    kv0.scheduleObservable = nM9;
});
