// Module: q_B
// Type: U
// Lines: 236247-236275
//
var createRenderState = U((okG, w_B)=>{
    var PA3 = tMA(), SA3 = zR();
    w_B.exports = (A, Q, B)=>{
        let G = [], Z = null, Y = null, J = A.sort((K, V)=>SA3(K, V, B));
        for (let K of J)if (PA3(K, Q, B)) {
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
