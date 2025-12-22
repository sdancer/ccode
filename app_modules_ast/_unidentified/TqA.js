// Module: TqA
// Type: U
// Lines: 151085-151141
//
var TqA = U((o3G, prA)=>{
    var { EMPTY_BUFFER: nE8 } = Ig(), Nd1 = Buffer[Symbol.species];
    function aE8(A, Q) {
        if (A.length === 0) return nE8;
        if (A.length === 1) return A[0];
        let B = Buffer.allocUnsafe(Q), G = 0;
        for(let Z = 0; Z < A.length; Z++){
            let Y = A[Z];
            (B.set(Y, G), (G += Y.length));
        }
        if (G < Q) return new Nd1(B.buffer, B.byteOffset, G);
        return B;
    }
    function j2B(A, Q, B, G, Z) {
        for(let Y = 0; Y < Z; Y++)B[G + Y] = A[Y] ^ Q[Y & 3];
    }
    function T2B(A, Q) {
        for(let B = 0; B < A.length; B++)A[B] ^= Q[B & 3];
    }
    function oE8(A) {
        if (A.length === A.buffer.byteLength) return A.buffer;
        return A.buffer.slice(A.byteOffset, A.byteOffset + A.length);
    }
    function Ld1(A) {
        if (((Ld1.readOnly = !0), Buffer.isBuffer(A))) return A;
        let Q;
        if (A instanceof ArrayBuffer) Q = new Nd1(A);
        else if (ArrayBuffer.isView(A)) Q = new Nd1(A.buffer, A.byteOffset, A.byteLength);
        else ((Q = Buffer.from(A)), (Ld1.readOnly = !1));
        return Q;
    }
    prA.exports = {
        concat: aE8,
        mask: j2B,
        toArrayBuffer: oE8,
        toBuffer: Ld1,
        unmask: T2B
    };
    if (!process.env.WS_NO_BUFFER_UTIL) try {
        let A = (()=>{
            throw new Error("Cannot require module " + "bufferutil");
        })();
        ((prA.exports.mask = function(Q, B, G, Z, Y) {
            if (Y < 48) j2B(Q, B, G, Z, Y);
            else A.mask(Q, B, G, Z, Y);
        }), (prA.exports.unmask = function(Q, B) {
            if (Q.length < 32) T2B(Q, B);
            else A.unmask(Q, B);
        }));
    } catch (A) {}
});
