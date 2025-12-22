// Module: urA
// Type: L
// Lines: 150722-150752
//
var urA = L(()=>{
    RZA();
    L1A();
});
function $2B(A, Q = xE8) {
    if (!A.includes("\t")) return A;
    let B = jZA(), G = B.feed(A);
    G.push(...B.flush());
    let Z = "", Y = 0;
    for (let J of G)if (J.type === "sequence") Z += J.value;
    else {
        let X = J.value.split(/(\t|\n)/);
        for (let I of X)if (I === "\t") {
            let W = Q - (Y % Q);
            ((Z += " ".repeat(W)), (Y += W));
        } else if (I === `
`) ((Z += I), (Y = 0));
        else ((Z += I), (Y += LG(I)));
    }
    return Z;
}
var xE8 = 8;
