// Module: Sd0
// Type: U
// Lines: 15296-15307
//
var Sd0 = U((nR7, Pd0)=>{
    var xc9 = Td0();
    Pd0.exports = (A = "")=>{
        let Q = A.match(xc9);
        if (!Q) return null;
        let [B, G] = Q[0].replace(/#! ?/, "").split(" "), Z = B.split("/").pop();
        if (Z === "env") return G;
        return G ? `${Z} ${G}` : Z;
    };
});
