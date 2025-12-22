// Module: pY9
// Type: L
// Lines: 500474-500503
//
var samplingCallback = L(()=>{
    _DA();
    ((e77 = {
        description: "View release notes",
        isEnabled: ()=>!0,
        isHidden: !1,
        name: "release-notes",
        userFacingName () {
            return "release-notes";
        },
        type: "local",
        supportsNonInteractive: !0,
        async call () {
            let A = [];
            try {
                let B = new Promise((G, Z)=>{
                    setTimeout(()=>Z(Error("Timeout")), 500);
                });
                (await Promise.race([
                    sw0(),
                    B
                ]), (A = tw0(N4A())));
            } catch  {}
            if (A.length > 0) return {
                type: "text",
                value: dY9(A)
            };
            let Q = tw0();
            if (Q.length > 0) return {
                type: "text",
                value: dY9(Q)
            };
            return {
                type: "text",
                value: `See the full changelog at: ${Ct2}`
            };
        }
    }), (cY9 = e77));
});
var AG7, lY9;
