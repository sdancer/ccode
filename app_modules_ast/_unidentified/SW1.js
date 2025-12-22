// Module: SW1
// Type: U
// Lines: 437217-437245
//
var canHydrateInstance = U((Bu2)=>{
    Object.defineProperty(Bu2, "__esModule", {
        value: !0
    });
    var TW1 = lL(), db5 = writeStyleResourceAttributeInJS(), PW1 = -1, cb5 = ()=>{
        if (TW1.WINDOW.document && TW1.WINDOW.document.visibilityState) PW1 = TW1.WINDOW.document.visibilityState === "hidden" && !TW1.WINDOW.document.prerendering ? 0 : 1 / 0;
    }, pb5 = ()=>{
        db5.onHidden(({ timeStamp: A })=>{
            PW1 = A;
        }, !0);
    }, lb5 = ()=>{
        if (PW1 < 0) (cb5(), pb5());
        return {
            get firstHiddenTime () {
                return PW1;
            }
        };
    };
    Bu2.getVisibilityWatcher = lb5;
});
