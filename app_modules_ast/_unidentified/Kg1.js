// Module: Kg1
// Type: U
// Lines: 126917-126937
//
var Kg1 = U((tgQ)=>{
    Object.defineProperty(tgQ, "__esModule", {
        value: !0
    });
    tgQ.defaultTextMapSetter = tgQ.defaultTextMapGetter = void 0;
    tgQ.defaultTextMapGetter = {
        get (A, Q) {
            if (A == null) return;
            return A[Q];
        },
        keys (A) {
            if (A == null) return [];
            return Object.keys(A);
        }
    };
    tgQ.defaultTextMapSetter = {
        set (A, Q, B) {
            if (A == null) return;
            A[Q] = B;
        }
    };
});
