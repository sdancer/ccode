// Module: GvA
// Type: L
// Lines: 422423-422436
//
var GvA = L(()=>{
    v2();
    dr();
    Rr();
    KB();
    jHA = u.object({
        ok: u.boolean().describe("Whether the condition was met"),
        reason: u.string().describe("Reason, if the condition was not met").optional()
    });
});
