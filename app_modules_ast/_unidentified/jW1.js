// Module: jW1
// Type: U
// Lines: 437100-437109
//
var jW1 = U((ag2)=>{
    Object.defineProperty(ag2, "__esModule", {
        value: !0
    });
    var Ob5 = defaultOnDefaultTransitionIndicator(), Mb5 = ()=>{
        let A = Ob5.getNavigationEntry();
        return (A && A.activationStart) || 0;
    };
    ag2.getActivationStart = Mb5;
});
