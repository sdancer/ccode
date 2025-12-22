// Module: uv0
// Type: U
// Lines: 6675-6686
//
var uv0 = U((hv0)=>{
    Object.defineProperty(hv0, "__esModule", {
        value: !0
    });
    hv0.schedulePromise = void 0;
    var aM9 = renderElement(), oM9 = t8A(), rM9 = e8A();
    function sM9(A, Q) {
        return aM9.innerFrom(A).pipe(rM9.subscribeOn(Q), oM9.observeOn(Q));
    }
    hv0.schedulePromise = sM9;
});
