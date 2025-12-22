// Module: wW
// Type: L
// Lines: 279794-279848
//
var wW = L(()=>{
    R5();
    n2();
    aQ();
    restoreViewTransitionName();
    s1();
    g1();
    K6();
    uJ();
    zB();
    Y$();
    pushStartInstance();
    ajA = {
        GIT_TERMINAL_PROMPT: "0",
        GIT_ASKPASS: ""
    };
    JL = Y0(async (A)=>{
        let Q = await v5(), B = Q[A];
        if (!B) throw Error(`Marketplace '${A}' not found in configuration. Available marketplaces: ${Object.keys(Q).join(", ")}`);
        try {
            return h80(B.installLocation);
        } catch (Z) {
            k(`Cache corrupted or missing for marketplace ${A}, re-fetching from source: ${Z instanceof Error ? Z.message : String(Z)}`, {
                level: "warn"
            });
        }
        let { marketplace: G } = await b80(B.source);
        return ((Q[A].lastUpdated = new Date().toISOString()), await aIA(Q), G);
    });
});
async function RBA(A, Q, B, G, Z) {
    if (B?.version) return (k(`Using manifest version for ${A}: ${B.version}`), B.version);
    if (Z) return (k(`Using provided version for ${A}: ${Z}`), Z);
    if (G) {
        let Y = await Yw3(G);
        if (Y) {
            let J = Y.substring(0, 12);
            return (k(`Using git SHA for ${A}: ${J}`), J);
        }
    }
    return (k(`No version found for ${A}, using 'unknown'`), "unknown");
}
async function Yw3(A) {
    try {
        let Q = await T6("git", [
            "rev-parse",
            "HEAD"
        ], {
            cwd: A
        });
        if (Q.code === 0 && Q.stdout) return Q.stdout.trim();
        return null;
    } catch  {
        return null;
    }
}
