// Module: mF9
// Type: L
// Lines: 533226-533261
//
var mF9 = L(()=>{
    s1();
    KJ();
});
import { randomUUID as dF9 } from "crypto";
function cF9(A) {
    try {
        let Q = new URL(A);
        return {
            sessionId: dF9(),
            ingressUrl: Q.href,
            isUrl: !0,
            jsonlFile: null,
            isJsonlFile: !1
        };
    } catch  {
        if (Q$(A)) return {
            sessionId: A,
            ingressUrl: null,
            isUrl: !1,
            jsonlFile: null,
            isJsonlFile: !1
        };
        if (A.endsWith(".jsonl")) return {
            sessionId: dF9(),
            ingressUrl: null,
            isUrl: !1,
            jsonlFile: A,
            isJsonlFile: !0
        };
    }
    return null;
}
