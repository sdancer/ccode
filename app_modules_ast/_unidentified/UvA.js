// Module: UvA
// Type: U
// Lines: 428222-428272
//
var createRenderState = U((Jx2)=>{
    Object.defineProperty(Jx2, "__esModule", {
        value: !0
    });
    var DI1 = N_();
    function dE5(A, Q = 0) {
        if (typeof A !== "string" || Q === 0) return A;
        return A.length <= Q ? A : `${A.slice(0, Q)}...`;
    }
    function cE5(A, Q) {
        let B = A, G = B.length;
        if (G <= 150) return B;
        if (Q > G) Q = G;
        let Z = Math.max(Q - 60, 0);
        if (Z < 5) Z = 0;
        let Y = Math.min(Z + 140, G);
        if (Y > G - 5) Y = G;
        if (Y === G) Z = Math.max(Y - 140, 0);
        if (((B = B.slice(Z, Y)), Z > 0)) B = `'{snip} ${B}`;
        if (Y < G) B += " {snip}";
        return B;
    }
    function pE5(A, Q) {
        if (!Array.isArray(A)) return "";
        let B = [];
        for(let G = 0; G < A.length; G++){
            let Z = A[G];
            try {
                if (DI1.isVueViewModel(Z)) B.push("[VueViewModel]");
                else B.push(String(Z));
            } catch (Y) {
                B.push("[value cannot be serialized]");
            }
        }
        return B.join(Q);
    }
    function Yx2(A, Q, B = !1) {
        if (!DI1.isString(A)) return !1;
        if (DI1.isRegExp(Q)) return Q.test(A);
        if (DI1.isString(Q)) return B ? A === Q : A.includes(Q);
        return !1;
    }
    function lE5(A, Q = [], B = !1) {
        return Q.some((G)=>Yx2(A, G, B));
    }
    Jx2.isMatchingPattern = Yx2;
    Jx2.safeJoin = pE5;
    Jx2.snipLine = cE5;
    Jx2.stringMatchesSomePattern = lE5;
    Jx2.truncate = dE5;
});
