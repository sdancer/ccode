// Module: lhQ
// Type: U
// Lines: 126145-126173
//
var createRenderState = U((at7, phQ)=>{
    var f08 = TwA(), b08 = jM();
    phQ.exports = (A, Q, B)=>{
        let G = [], Z = null, Y = null, J = A.sort((K, V)=>b08(K, V, B));
        for (let K of J)if (f08(K, Q, B)) {
            if (((Y = K), !Z)) Z = K;
        } else {
            if (Y) G.push([
                Z,
                Y
            ]);
            ((Y = null), (Z = null));
        }
        if (Z) G.push([
            Z,
            null
        ]);
        let X = [];
        for (let [K, V] of G)if (K === V) X.push(K);
        else if (!V && K === J[0]) X.push("*");
        else if (!V) X.push(`>=${K}`);
        else if (K === J[0]) X.push(`<=${V}`);
        else X.push(`${K} - ${V}`);
        let I = X.join(" || "), W = typeof Q.raw === "string" ? Q.raw : String(Q);
        return I.length < W.length ? I : Q;
    };
});
