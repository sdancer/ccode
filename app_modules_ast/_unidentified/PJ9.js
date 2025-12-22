// Module: PJ9
// Type: L
// Lines: 502561-502605
//
var samplingCallback = L(()=>{
    z4();
    pushStartInstance();
    XL();
    iV1();
    ((mG7 = {
        type: "local",
        name: "thinkback-play",
        description: "Play the thinkback animation",
        isEnabled: ()=>U7("tengu_thinkback"),
        isHidden: !0,
        supportsNonInteractive: !1,
        async call () {
            let A = yR(), Q = uG7(), B = A.plugins[Q];
            if (!B || B.length === 0) return {
                type: "text",
                value: "Thinkback plugin not installed. Run /think-back first to install it."
            };
            let G = B[0];
            if (!G?.installPath) return {
                type: "text",
                value: "Thinkback plugin installation path not found."
            };
            let Z = jJ9(G.installPath, "skills", gG7), Y = jJ9(Z, "year_in_review.js");
            if (!hG7(Y)) return {
                type: "text",
                value: "No animation found. Run /think-back first to generate one."
            };
            return {
                type: "text",
                value: eO0(Z).message
            };
        },
        userFacingName () {
            return "thinkback-play";
        }
    }), (TJ9 = mG7));
});
var QM0, dG7, SJ9;
