// Module: OX9
// Type: L
// Lines: 504915-504942
//
var samplingCallback = L(()=>{
    aB();
    zL();
    ((sG7 = {
        type: "local",
        name: "files",
        description: "List all files currently in context",
        isEnabled: ()=>!1,
        isHidden: !1,
        supportsNonInteractive: !0,
        async call (A, Q) {
            let B = Q.readFileState ? qk(Q.readFileState) : [];
            if (B.length === 0) return {
                type: "text",
                value: "No files in context"
            };
            return {
                type: "text",
                value: `Files in context:
${B.map((Z)=>rG7(i1(), Z)).join(`
`)}`
            };
        },
        userFacingName () {
            return "files";
        }
    }), (LX9 = sG7));
});
var tf;
