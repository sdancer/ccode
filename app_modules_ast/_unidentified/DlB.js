// Module: DlB
// Type: L
// Lines: 277702-277789
//
var createRenderState = L(()=>{
    v2();
    NZ();
    LI();
    VlB();
    b61 = u.string().superRefine((A, Q)=>{
        let B = EU3(A);
        if (!B.valid) {
            let G = B.error;
            if (B.suggestion) G += `. ${B.suggestion}`;
            if (B.examples && B.examples.length > 0) G += `. Examples: ${B.examples.join(", ")}`;
            Q.addIssue({
                code: u.ZodIssueCode.custom,
                message: G,
                params: {
                    received: A
                }
            });
        }
    });
});
function mjA(A, Q) {
    return Q.autoUpdate ?? ujA.has(A.toLowerCase());
}
function $U3(A) {
    if (ujA.has(A.toLowerCase())) return !1;
    if (CU3.test(A)) return !0;
    return zU3.test(A);
}
function zlB(A, Q) {
    let B = A.toLowerCase();
    if (!ujA.has(B)) return null;
    if (Q.source === "github") {
        if (!(Q.repo || "").toLowerCase().startsWith(`${h61}/`)) return `The name '${A}' is reserved for official Anthropic marketplaces. Only repositories from 'github.com/${h61}/' can use this name.`;
        return null;
    }
    if (Q.source === "git" && Q.url) {
        let G = Q.url.toLowerCase(), Z = G.includes("github.com/anthropics/"), Y = G.includes("git@github.com:anthropics/");
        if (Z || Y) return null;
        return `The name '${A}' is reserved for official Anthropic marketplaces. Only repositories from 'github.com/${h61}/' can use this name.`;
    }
    return `The name '${A}' is reserved for official Anthropic marketplaces and can only be used with GitHub sources from the '${h61}' organization.`;
}
function EP(A) {
    return typeof A === "string" && A.startsWith("./");
}
var ujA, zU3, CU3, h61 = "anthropics", Am, uIA, FlB, x80, v80, ClB, UU3, $lB, wU3, qU3, NU3, LU3, OU3, MU3, RU3, ElB, _U3, mIA, jU3, qBA, UlB, djA, TU3, PU3, dIA, wBA, gBZ, SU3, cjA, yU3, xU3, pjA, uBZ, vU3, k80;
