// Module: weA
// Type: L
// Lines: 188980-189016
//
var samplingCallback = L(()=>{
    Nl1();
});
function Ll1(A, Q) {
    if (!Q || !("parse" in (Q.output_format ?? {}))) return {
        ...A,
        content: A.content.map((B)=>{
            if (B.type === "text") return {
                ...B,
                parsed: null
            };
            return B;
        }),
        parsed_output: null
    };
    return Ol1(A, Q);
}
function Ol1(A, Q) {
    let B = null, G = A.content.map((Z)=>{
        if (Z.type === "text") {
            let Y = a_8(Q, Z.text);
            if (B === null) B = Y;
            return {
                ...Z,
                parsed: Y
            };
        }
        return Z;
    });
    return {
        ...A,
        content: G,
        parsed_output: B
    };
}
function a_8(A, Q) {
    if (A.output_format?.type !== "json_schema") return null;
    try {
        if ("parse" in A.output_format) return A.output_format.parse(Q);
        return JSON.parse(Q);
    } catch (B) {
        throw new F2(`Failed to parse structured output: ${B}`);
    }
}
