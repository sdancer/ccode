// Module: cK0
// Type: L
// Lines: 378589-378629
//
var restoreViewTransitionName = L(()=>{
    v2();
    createRenderState();
});
function J$2(A, Q) {
    let B = {
        type: "integer",
        format: "int64"
    };
    if (!A.checks) return B;
    for (let G of A.checks)switch(G.kind){
        case "min":
            if (Q.target === "jsonSchema7") if (G.inclusive) b5(B, "minimum", G.value, G.message, Q);
            else b5(B, "exclusiveMinimum", G.value, G.message, Q);
            else {
                if (!G.inclusive) B.exclusiveMinimum = !0;
                b5(B, "minimum", G.value, G.message, Q);
            }
            break;
        case "max":
            if (Q.target === "jsonSchema7") if (G.inclusive) b5(B, "maximum", G.value, G.message, Q);
            else b5(B, "exclusiveMaximum", G.value, G.message, Q);
            else {
                if (!G.inclusive) B.exclusiveMaximum = !0;
                b5(B, "maximum", G.value, G.message, Q);
            }
            break;
        case "multipleOf":
            b5(B, "multipleOf", G.value, G.message, Q);
            break;
    }
    return B;
}
var pK0 = ()=>{};
function X$2() {
    return {
        type: "boolean"
    };
}
function AY1(A, Q) {
    return r4(A.type._def, Q);
}
