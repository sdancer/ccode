// Module: RZA
// Type: L
// Lines: 150478-150559
//
var RZA = L(()=>{
    ((ix = {
        NUL: 0,
        SOH: 1,
        STX: 2,
        ETX: 3,
        EOT: 4,
        ENQ: 5,
        ACK: 6,
        BEL: 7,
        BS: 8,
        HT: 9,
        LF: 10,
        VT: 11,
        FF: 12,
        CR: 13,
        SO: 14,
        SI: 15,
        DLE: 16,
        DC1: 17,
        DC2: 18,
        DC3: 19,
        DC4: 20,
        NAK: 21,
        SYN: 22,
        ETB: 23,
        CAN: 24,
        EM: 25,
        SUB: 26,
        ESC: 27,
        FS: 28,
        GS: 29,
        RS: 30,
        US: 31,
        DEL: 127
    }), (JT = {
        CSI: 91,
        OSC: 93,
        DCS: 80,
        APC: 95,
        PM: 94,
        SOS: 88,
        ST: 92
    }));
});
function I2B(A) {
    return A >= _ZA.PARAM_START && A <= _ZA.PARAM_END;
}
function hrA(A) {
    return A >= _ZA.INTERMEDIATE_START && A <= _ZA.INTERMEDIATE_END;
}
function W2B(A) {
    return A >= _ZA.FINAL_START && A <= _ZA.FINAL_END;
}
function SH(...A) {
    if (A.length === 0) return Wd1;
    if (A.length === 1) return `${Wd1}${A[0]}`;
    let Q = A.slice(0, -1), B = A[A.length - 1];
    return `${Wd1}${Q.join(N1A)}${B}`;
}
function H2B(A = 1) {
    return A === 0 ? "" : SH(A, "A");
}
function jE8(A = 1) {
    return A === 0 ? "" : SH(A, "B");
}
function TE8(A = 1) {
    return A === 0 ? "" : SH(A, "C");
}
function PE8(A = 1) {
    return A === 0 ? "" : SH(A, "D");
}
function D2B(A, Q) {
    let B = "";
    if (A < 0) B += PE8(-A);
    else if (A > 0) B += TE8(A);
    if (Q < 0) B += H2B(-Q);
    else if (Q > 0) B += jE8(Q);
    return B;
}
function F2B(A) {
    if (A <= 0) return "";
    let Q = "";
    for(let B = 0; B < A; B++)if (((Q += yE8), B < A - 1)) Q += H2B(1);
    return ((Q += SE8), Q);
}
var Wd1, _ZA, sJ, K2B, V2B, Kd1, SE8, Vd1, P3G, S3G, yE8, grA, Hd1, E2B, z2B;
