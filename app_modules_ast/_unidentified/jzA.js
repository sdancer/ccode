// Module: jzA
// Type: U
// Lines: 54896-54921
//
var jzA = U((O0Q)=>{
    Object.defineProperty(O0Q, "__esModule", {
        value: !0
    });
    O0Q._getStorageKey = O0Q._getUserStorageKey = void 0;
    var N0Q = performWork();
    function L0Q(A, Q, B) {
        var G;
        if (B) return B(A, Q);
        let Z = Q && Q.customIDs ? Q.customIDs : {}, Y = [
            `uid:${(G = Q === null || Q === void 0 ? void 0 : Q.userID) !== null && G !== void 0 ? G : ""}`,
            `cids:${Object.keys(Z).sort((J, X)=>J.localeCompare(X)).map((J)=>`${J}-${Z[J]}`).join(",")}`,
            `k:${A}`
        ];
        return (0, N0Q._DJB2)(Y.join("|"));
    }
    O0Q._getUserStorageKey = L0Q;
    function zQ4(A, Q, B) {
        if (Q) return L0Q(A, Q, B);
        return (0, N0Q._DJB2)(`k:${A}`);
    }
    O0Q._getStorageKey = zQ4;
});
