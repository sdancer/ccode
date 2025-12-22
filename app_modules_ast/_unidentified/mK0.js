// Module: mK0
// Type: L
// Lines: 378562-378589
//
var mK0 = L(()=>{
    eZ1();
});
function dK0(A, Q, B, G) {
    if (!G?.errorMessages) return;
    if (B) A.errorMessage = {
        ...A.errorMessage,
        [Q]: B
    };
}
function b5(A, Q, B, G, Z) {
    ((A[Q] = B), dK0(A, Q, G, Z));
}
function Z$2() {
    return {};
}
function Y$2(A, Q) {
    let B = {
        type: "array"
    };
    if (A.type?._def && A.type?._def?.typeName !== GB.ZodAny) B.items = r4(A.type._def, {
        ...Q,
        currentPath: [
            ...Q.currentPath,
            "items"
        ]
    });
    if (A.minLength) b5(B, "minItems", A.minLength.value, A.minLength.message, Q);
    if (A.maxLength) b5(B, "maxItems", A.maxLength.value, A.maxLength.message, Q);
    if (A.exactLength) (b5(B, "minItems", A.exactLength.value, A.exactLength.message, Q), b5(B, "maxItems", A.exactLength.value, A.exactLength.message, Q));
    return B;
}
