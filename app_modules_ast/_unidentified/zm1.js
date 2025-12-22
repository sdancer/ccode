// Module: zm1
// Type: L
// Lines: 137527-137557
//
var zm1 = L(()=>{
    KqA = {
        fromJSON (A) {
            return {
                seconds: bQB(A.seconds) ? globalThis.Number(A.seconds) : 0,
                nanos: bQB(A.nanos) ? globalThis.Number(A.nanos) : 0
            };
        },
        toJSON (A) {
            let Q = {};
            if (A.seconds !== void 0) Q.seconds = Math.round(A.seconds);
            if (A.nanos !== void 0) Q.nanos = Math.round(A.nanos);
            return Q;
        },
        create (A) {
            return KqA.fromPartial(A ?? {});
        },
        fromPartial (A) {
            let Q = PF8();
            return ((Q.seconds = A.seconds ?? 0), (Q.nanos = A.nanos ?? 0), Q);
        }
    };
});
function SF8() {
    return {
        account_id: 0,
        organization_uuid: "",
        account_uuid: ""
    };
}
function Cm1(A) {
    return A !== null && A !== void 0;
}
var Gg;
