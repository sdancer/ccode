// Module: tAQ
// Type: L
// Lines: 51774-51820
//
var tAQ = L(()=>{
    createRenderState();
    DzA();
    Lj();
});
function d14(A) {
    return n1.matchAll(/\w+|\[(\w*)]/g, A).map((Q)=>{
        return Q[0] === "[]" ? "" : Q[1] || Q[0];
    });
}
function c14(A) {
    let Q = {}, B = Object.keys(A), G, Z = B.length, Y;
    for(G = 0; G < Z; G++)((Y = B[G]), (Q[Y] = A[Y]));
    return Q;
}
function p14(A) {
    function Q(B, G, Z, Y) {
        let J = B[Y++];
        if (J === "__proto__") return !0;
        let X = Number.isFinite(+J), I = Y >= B.length;
        if (((J = !J && n1.isArray(Z) ? Z.length : J), I)) {
            if (n1.hasOwnProp(Z, J)) Z[J] = [
                Z[J],
                G
            ];
            else Z[J] = G;
            return !X;
        }
        if (!Z[J] || !n1.isObject(Z[J])) Z[J] = [];
        if (Q(B, G, Z[J], Y) && n1.isArray(Z[J])) Z[J] = c14(Z[J]);
        return !X;
    }
    if (n1.isFormData(A) && n1.isFunction(A.entries)) {
        let B = {};
        return (n1.forEachEntry(A, (G, Z)=>{
            Q(d14(G), Z, B, 0);
        }), B);
    }
    return null;
}
var VmA;
