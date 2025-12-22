// Module: lz1
// Type: U
// Lines: 7336-7364
//
var performWork = U((ck0)=>{
    Object.defineProperty(ck0, "__esModule", {
        value: !0
    });
    ck0.argsArgArrayOrObject = void 0;
    var R_9 = Array.isArray, __9 = Object.getPrototypeOf, j_9 = Object.prototype, T_9 = Object.keys;
    function P_9(A) {
        if (A.length === 1) {
            var Q = A[0];
            if (R_9(Q)) return {
                args: Q,
                keys: null
            };
            if (S_9(Q)) {
                var B = T_9(Q);
                return {
                    args: B.map(function(G) {
                        return Q[G];
                    }),
                    keys: B
                };
            }
        }
        return {
            args: A,
            keys: null
        };
    }
    ck0.argsArgArrayOrObject = P_9;
    function S_9(A) {
        return A && typeof A === "object" && __9(A) === j_9;
    }
});
