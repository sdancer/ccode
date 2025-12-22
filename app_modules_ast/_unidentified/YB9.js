// Module: YB9
// Type: L
// Lines: 474368-474432
//
var YB9 = L(()=>{
    ((iB7 = /^D+$/), (nB7 = /^Y+$/), (aB7 = [
        "D",
        "DD",
        "YY",
        "YYYY"
    ]));
});
function JB9(A, Q, B) {
    let G = Ns(), Z = B?.locale ?? G.locale ?? ZN0, Y = B?.firstWeekContainsDate ?? B?.locale?.options?.firstWeekContainsDate ?? G.firstWeekContainsDate ?? G.locale?.options?.firstWeekContainsDate ?? 1, J = B?.weekStartsOn ?? B?.locale?.options?.weekStartsOn ?? G.weekStartsOn ?? G.locale?.options?.weekStartsOn ?? 0, X = hI(A, B?.in);
    if (!b09(X)) throw RangeError("Invalid time value");
    let I = Q.match(sB7).map((K)=>{
        let V = K[0];
        if (V === "p" || V === "P") {
            let H = AB9[V];
            return H(K, Z.formatLong);
        }
        return K;
    }).join("").match(rB7).map((K)=>{
        if (K === "''") return {
            isToken: !1,
            value: "'"
        };
        let V = K[0];
        if (V === "'") return {
            isToken: !1,
            value: Q27(K)
        };
        if (WN0[V]) return {
            isToken: !0,
            value: K
        };
        if (V.match(A27)) throw RangeError("Format string contains an unescaped latin alphabet character `" + V + "`");
        return {
            isToken: !1,
            value: K
        };
    });
    if (Z.localize.preprocessor) I = Z.localize.preprocessor(X, I);
    let W = {
        firstWeekContainsDate: Y,
        weekStartsOn: J,
        locale: Z
    };
    return I.map((K)=>{
        if (!K.isToken) return K.value;
        let V = K.value;
        if ((!B?.useAdditionalWeekYearTokens && GB9(V)) || (!B?.useAdditionalDayOfYearTokens && BB9(V))) ZB9(V, Q, String(A));
        let H = WN0[V[0]];
        return H(X, V, Z.localize, W);
    }).join("");
}
function Q27(A) {
    let Q = A.match(tB7);
    if (!Q) return A;
    return Q[1].replace(eB7, "'");
}
var rB7, sB7, tB7, eB7, A27;
