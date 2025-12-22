// Module: lEA
// Type: U
// Lines: 14471-14479
//
var lEA = U((vR7, dm0)=>{
    dm0.exports = (A, Q = process.argv)=>{
        let B = A.startsWith("-") ? "" : A.length === 1 ? "-" : "--", G = Q.indexOf(B + A), Z = Q.indexOf("--");
        return G !== -1 && (Z === -1 || G < Z);
    };
});
