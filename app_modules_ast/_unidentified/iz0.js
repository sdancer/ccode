// Module: iz0
// Type: U
// Lines: 429366-429381
//
var iz0 = U((ex2)=>{
    Object.defineProperty(ex2, "__esModule", {
        value: !0
    });
    var x$5 = renderChildrenArray(), NI1 = x$5.getGlobalObject();
    function v$5() {
        let A = NI1.chrome, Q = A && A.app && A.app.runtime, B = "history" in NI1 && !!NI1.history.pushState && !!NI1.history.replaceState;
        return !Q && B;
    }
    ex2.supportsHistory = v$5;
});
