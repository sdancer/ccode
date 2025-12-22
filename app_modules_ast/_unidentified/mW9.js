// Module: mW9
// Type: L
// Lines: 514792-514823
//
var mW9 = L(()=>{
    bA();
    P3();
    pushStartInstance();
    A2();
    trackUsedThenable();
    trackUsedThenable();
    z4();
    getViewTransitionClassName();
    wk();
    ((ed = l(React runtime(), 1)), (uW9 = {
        type: "local-jsx",
        name: "rate-limit-options",
        userFacingName () {
            return "rate-limit-options";
        },
        description: "Show options when rate limit is reached",
        isEnabled: ()=>{
            if (!VB()) return !1;
            if (bP()) return !0;
            let A = S6();
            return A === "pro" || A === "max";
        },
        isHidden: !0,
        async call (A, Q) {
            return ed.default.createElement(IY7, {
                onDone: A,
                context: Q
            });
        }
    }));
});
var WY7, dW9;
