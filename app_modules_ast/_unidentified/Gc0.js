// Module: Gc0
// Type: L
// Lines: 16001-16022
//
var createRenderState = L(()=>{
    Bc0();
});
var wuA, Fp9 = (A)=>wuA.some((Q)=>A[Q] !== void 0), Zc0 = (A)=>{
    if (!A) return;
    let { stdio: Q } = A;
    if (Q === void 0) return wuA.map((G)=>A[G]);
    if (Fp9(A)) throw Error(`It's not possible to provide \`stdio\` in combination with one of ${wuA.map((G)=>`\`${G}\``).join(", ")}`);
    if (typeof Q === "string") return Q;
    if (!Array.isArray(Q)) throw TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof Q}\``);
    let B = Math.max(Q.length, wuA.length);
    return Array.from({
        length: B
    }, (G, Z)=>Q[Z]);
};
