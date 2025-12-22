// Module: u80
// Type: L
// Lines: 279848-279867
//
var u80 = L(()=>{
    K6();
    s1();
});
function oIA(A) {
    if (A.includes("@")) {
        let Q = A.split("@");
        return {
            name: Q[0] || "",
            marketplace: Q[1]
        };
    }
    return {
        name: A
    };
}
function ev(A) {
    if (A === "managed") throw Error("Cannot install plugins to managed scope");
    return Jw3[A];
}
function vlB(A) {
    return xlB[A];
}
var xlB, Jw3;
