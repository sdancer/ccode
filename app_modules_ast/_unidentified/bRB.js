// Module: bRB
// Type: U
// Lines: 235587-235622
//
var createRenderState = U((kkG, fRB)=>{
    var ve8 = createRenderState(), ke8 = UQA(), { safeRe: sQ1, t: tQ1 } = FXA(), fe8 = (A, Q)=>{
        if (A instanceof ve8) return A;
        if (typeof A === "number") A = String(A);
        if (typeof A !== "string") return null;
        Q = Q || {};
        let B = null;
        if (!Q.rtl) B = A.match(Q.includePrerelease ? sQ1[tQ1.COERCEFULL] : sQ1[tQ1.COERCE]);
        else {
            let I = Q.includePrerelease ? sQ1[tQ1.COERCERTLFULL] : sQ1[tQ1.COERCERTL], W;
            while((W = I.exec(A)) && (!B || B.index + B[0].length !== A.length)){
                if (!B || W.index + W[0].length !== B.index + B[0].length) B = W;
                I.lastIndex = W.index + W[1].length + W[2].length;
            }
            I.lastIndex = -1;
        }
        if (B === null) return null;
        let G = B[2], Z = B[3] || "0", Y = B[4] || "0", J = Q.includePrerelease && B[5] ? `-${B[5]}` : "", X = Q.includePrerelease && B[6] ? `+${B[6]}` : "";
        return ke8(`${G}.${Z}.${Y}${J}${X}`, Q);
    };
    fRB.exports = fe8;
});
