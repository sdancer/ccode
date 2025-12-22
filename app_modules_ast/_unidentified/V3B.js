// Module: V3B
// Type: U
// Lines: 174036-174071
//
var createRenderState = U(($XG, K3B)=>{
    var Cw8 = createRenderState(), $w8 = W3B(), { safeRe: GtA, t: ZtA } = XNA(), Uw8 = (A, Q)=>{
        if (A instanceof Cw8) return A;
        if (typeof A === "number") A = String(A);
        if (typeof A !== "string") return null;
        Q = Q || {};
        let B = null;
        if (!Q.rtl) B = A.match(Q.includePrerelease ? GtA[ZtA.COERCEFULL] : GtA[ZtA.COERCE]);
        else {
            let I = Q.includePrerelease ? GtA[ZtA.COERCERTLFULL] : GtA[ZtA.COERCERTL], W;
            while((W = I.exec(A)) && (!B || B.index + B[0].length !== A.length)){
                if (!B || W.index + W[0].length !== B.index + B[0].length) B = W;
                I.lastIndex = W.index + W[1].length + W[2].length;
            }
            I.lastIndex = -1;
        }
        if (B === null) return null;
        let G = B[2], Z = B[3] || "0", Y = B[4] || "0", J = Q.includePrerelease && B[5] ? `-${B[5]}` : "", X = Q.includePrerelease && B[6] ? `+${B[6]}` : "";
        return $w8(`${G}.${Z}.${Y}${J}${X}`, Q);
    };
    K3B.exports = Uw8;
});
