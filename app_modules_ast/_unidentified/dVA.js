// Module: dVA
// Type: U
// Lines: 381581-381617
//
var performWork = U((s35, Y9A)=>{
    function Yw2(A) {
        return typeof A > "u" || A === null;
    }
    function i35(A) {
        return typeof A === "object" && A !== null;
    }
    function n35(A) {
        if (Array.isArray(A)) return A;
        else if (Yw2(A)) return [];
        return [
            A
        ];
    }
    function a35(A, Q) {
        var B, G, Z, Y;
        if (Q) {
            Y = Object.keys(Q);
            for(B = 0, G = Y.length; B < G; B += 1)((Z = Y[B]), (A[Z] = Q[Z]));
        }
        return A;
    }
    function o35(A, Q) {
        var B = "", G;
        for(G = 0; G < Q; G += 1)B += A;
        return B;
    }
    function r35(A) {
        return A === 0 && Number.NEGATIVE_INFINITY === 1 / A;
    }
    s35.isNothing = Yw2;
    s35.isObject = i35;
    s35.toArray = n35;
    s35.repeat = o35;
    s35.isNegativeZero = r35;
    s35.extend = a35;
});
