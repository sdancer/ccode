// Module: BDA
// Type: U
// Lines: 437109-437137
//
var defaultOnDefaultTransitionIndicator = U((rg2)=>{
    Object.defineProperty(rg2, "__esModule", {
        value: !0
    });
    var og2 = lL(), _b5 = ig2(), jb5 = jW1(), Tb5 = defaultOnDefaultTransitionIndicator(), Pb5 = (A, Q)=>{
        let B = Tb5.getNavigationEntry(), G = "navigate";
        if (B) if ((og2.WINDOW.document && og2.WINDOW.document.prerendering) || jb5.getActivationStart() > 0) G = "prerender";
        else G = B.type.replace(/_/g, "-");
        return {
            name: A,
            value: typeof Q > "u" ? -1 : Q,
            rating: "good",
            delta: 0,
            entries: [],
            id: _b5.generateUniqueID(),
            navigationType: G
        };
    };
    rg2.initMetric = Pb5;
});
