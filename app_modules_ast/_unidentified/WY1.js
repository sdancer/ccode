// Module: WY1
// Type: U
// Lines: 380670-380702
//
var renderElement = U((WU2)=>{
    Object.defineProperty(WU2, "__esModule", {
        value: !0
    });
    WU2.getDeepKeys = WU2.toJSON = void 0;
    var H85 = [
        "function",
        "symbol",
        "undefined"
    ], D85 = [
        "constructor",
        "prototype",
        "__proto__"
    ], F85 = Object.getPrototypeOf({});
    function E85() {
        let A = {}, Q = this;
        for (let B of IU2(Q))if (typeof B === "string") {
            let G = Q[B], Z = typeof G;
            if (!H85.includes(Z)) A[B] = G;
        }
        return A;
    }
    WU2.toJSON = E85;
    function IU2(A, Q = []) {
        let B = [];
        while(A && A !== F85)((B = B.concat(Object.getOwnPropertyNames(A), Object.getOwnPropertySymbols(A))), (A = Object.getPrototypeOf(A)));
        let G = new Set(B);
        for (let Z of Q.concat(D85))G.delete(Z);
        return G;
    }
    WU2.getDeepKeys = IU2;
});
