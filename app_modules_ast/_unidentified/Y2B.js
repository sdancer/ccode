// Module: Y2B
// Type: L
// Lines: 150412-150433
//
var Y2B = L(()=>{
    createRenderState();
    LZA();
});
var J2B, _E8 = (A, Q, B)=>{
    let G = A + String(Q) + String(B), Z = J2B[G];
    if (Z) return Z;
    let Y = A;
    if (B === "wrap") Y = OZA(A, Q, {
        trim: !1,
        hard: !0
    });
    else if (B === "wrap-trim") Y = OZA(A, Q, {
        trim: !0,
        hard: !0
    });
    if (B.startsWith("truncate")) {
        let J = "end";
        if (B === "truncate-middle") J = "middle";
        if (B === "truncate-start") J = "start";
        Y = Yd1(A, Q, {
            position: J
        });
    }
    return ((J2B[G] = Y), Y);
}, lx;
