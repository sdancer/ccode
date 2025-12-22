// Module: bjA
// Type: L
// Lines: 277380-277410
//
var bjA = L(()=>{
    n2();
    R5();
    BJ();
    A2();
    s1();
    aQ();
    z4();
    LBZ = Y0(async ()=>{
        try {
            return {};
        } catch  {
            return (k("[claudeai-mcp] Fetch failed"), {});
        }
    });
});
function hjA(A) {
    let Q = [];
    return {
        expanded: A.replace(/\$\{([^}]+)\}/g, (G, Z)=>{
            let [Y, J] = Z.split(":-", 2), X = process.env[Y];
            if (X !== void 0) return X;
            if (J !== void 0) return J;
            return (Q.push(Y), G);
        }),
        missingVars: Q
    };
}
var P80, _BZ, S80, IU3, WU3, KU3, VU3, HU3, DU3, FU3, Ma, XlB;
