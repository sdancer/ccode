// Module: rdQ
// Type: U
// Lines: 128282-128298
//
var rdQ = U((adQ)=>{
    Object.defineProperty(adQ, "__esModule", {
        value: !0
    });
    adQ.globalErrorHandler = adQ.setGlobalErrorHandler = void 0;
    var f98 = Bu1(), ndQ = (0, f98.loggingErrorHandler)();
    function b98(A) {
        ndQ = A;
    }
    adQ.setGlobalErrorHandler = b98;
    function h98(A) {
        try {
            ndQ(A);
        } catch  {}
    }
    adQ.globalErrorHandler = h98;
});
