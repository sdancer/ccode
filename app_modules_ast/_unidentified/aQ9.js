// Module: aQ9
// Type: L
// Lines: 473832-473901
//
var aQ9 = L(()=>{
    md = {
        y (A, Q) {
            let B = A.getFullYear(), G = B > 0 ? B : 1 - B;
            return KG(Q === "yy" ? G % 100 : G, Q.length);
        },
        M (A, Q) {
            let B = A.getMonth();
            return Q === "M" ? String(B + 1) : KG(B + 1, 2);
        },
        d (A, Q) {
            return KG(A.getDate(), Q.length);
        },
        a (A, Q) {
            let B = A.getHours() / 12 >= 1 ? "pm" : "am";
            switch(Q){
                case "a":
                case "aa":
                    return B.toUpperCase();
                case "aaa":
                    return B;
                case "aaaaa":
                    return B[0];
                case "aaaa":
                default:
                    return B === "am" ? "a.m." : "p.m.";
            }
        },
        h (A, Q) {
            return KG(A.getHours() % 12 || 12, Q.length);
        },
        H (A, Q) {
            return KG(A.getHours(), Q.length);
        },
        m (A, Q) {
            return KG(A.getMinutes(), Q.length);
        },
        s (A, Q) {
            return KG(A.getSeconds(), Q.length);
        },
        S (A, Q) {
            let B = Q.length, G = A.getMilliseconds(), Z = Math.trunc(G * Math.pow(10, B - 3));
            return KG(Z, Q.length);
        }
    };
});
function oQ9(A, Q = "") {
    let B = A > 0 ? "-" : "+", G = Math.abs(A), Z = Math.trunc(G / 60), Y = G % 60;
    if (Y === 0) return B + String(Z);
    return B + String(Z) + Q + KG(Y, 2);
}
function rQ9(A, Q) {
    if (A % 60 === 0) return (A > 0 ? "-" : "+") + KG(Math.abs(A) / 60, 2);
    return S4A(A, Q);
}
function S4A(A, Q = "") {
    let B = A > 0 ? "-" : "+", G = Math.abs(A), Z = KG(Math.trunc(G / 60), 2), Y = KG(G % 60, 2);
    return B + Z + Q + Y;
}
var uDA, WN0;
