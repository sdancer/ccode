// Module: XhQ
// Type: U
// Lines: 125485-125520
//
var createRenderState = U((vt7, JhQ)=>{
    var u18 = createRenderState(), m18 = dAA(), { safeRe: maA, t: daA } = bGA(), d18 = (A, Q)=>{
        if (A instanceof u18) return A;
        if (typeof A === "number") A = String(A);
        if (typeof A !== "string") return null;
        Q = Q || {};
        let B = null;
        if (!Q.rtl) B = A.match(Q.includePrerelease ? maA[daA.COERCEFULL] : maA[daA.COERCE]);
        else {
            let I = Q.includePrerelease ? maA[daA.COERCERTLFULL] : maA[daA.COERCERTL], W;
            while((W = I.exec(A)) && (!B || B.index + B[0].length !== A.length)){
                if (!B || W.index + W[0].length !== B.index + B[0].length) B = W;
                I.lastIndex = W.index + W[1].length + W[2].length;
            }
            I.lastIndex = -1;
        }
        if (B === null) return null;
        let G = B[2], Z = B[3] || "0", Y = B[4] || "0", J = Q.includePrerelease && B[5] ? `-${B[5]}` : "", X = Q.includePrerelease && B[6] ? `+${B[6]}` : "";
        return m18(`${G}.${Z}.${Y}${J}${X}`, Q);
    };
    JhQ.exports = d18;
});
