// Module: Ia1
// Type: U
// Lines: 211706-211761
//
var Ia1 = U((TUG, zFB)=>{
    var { utf8Encode: lg8, utf8DecodeWithoutBOM: KFB } = read_string_buffer(), { percentDecodeBytes: VFB, utf8PercentEncodeString: HFB, isURLEncodedPercentEncode: DFB } = K11();
    function FFB(A) {
        return A.codePointAt(0);
    }
    function ig8(A) {
        let Q = og8(A, FFB("&")), B = [];
        for (let G of Q){
            if (G.length === 0) continue;
            let Z, Y, J = G.indexOf(FFB("="));
            if (J >= 0) ((Z = G.slice(0, J)), (Y = G.slice(J + 1)));
            else ((Z = G), (Y = new Uint8Array(0)));
            ((Z = EFB(Z, 43, 32)), (Y = EFB(Y, 43, 32)));
            let X = KFB(VFB(Z)), I = KFB(VFB(Y));
            B.push([
                X,
                I
            ]);
        }
        return B;
    }
    function ng8(A) {
        return ig8(lg8(A));
    }
    function ag8(A) {
        let Q = "";
        for (let [B, G] of A.entries()){
            let Z = HFB(G[0], DFB, !0), Y = HFB(G[1], DFB, !0);
            if (B !== 0) Q += "&";
            Q += `${Z}=${Y}`;
        }
        return Q;
    }
    function og8(A, Q) {
        let B = [], G = 0, Z = A.indexOf(Q);
        while(Z >= 0)(B.push(A.slice(G, Z)), (G = Z + 1), (Z = A.indexOf(Q, G)));
        if (G !== A.length) B.push(A.slice(G));
        return B;
    }
    function EFB(A, Q, B) {
        let G = A.indexOf(Q);
        while(G >= 0)((A[G] = B), (G = A.indexOf(Q, G + 1)));
        return A;
    }
    zFB.exports = {
        parseUrlencodedString: ng8,
        serializeUrlencoded: ag8
    };
});
