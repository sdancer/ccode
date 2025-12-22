// Module: qc0
// Type: L
// Lines: 16445-16476
//
var qc0 = L(()=>{
    tEA();
});
async function XU1(A, Q) {
    return sEA(A, hp9, Q);
}
var Pp9 = ()=>({
        contents: new ArrayBuffer(0)
    }), Sp9 = (A)=>yp9.encode(A), yp9, Nc0 = (A)=>new Uint8Array(A), Lc0 = (A)=>new Uint8Array(A.buffer, A.byteOffset, A.byteLength), xp9 = (A, Q)=>A.slice(0, Q), vp9 = (A, { contents: Q, length: B }, G)=>{
    let Z = Rc0() ? fp9(Q, G) : kp9(Q, G);
    return (new Uint8Array(Z).set(A, B), Z);
}, kp9 = (A, Q)=>{
    if (Q <= A.byteLength) return A;
    let B = new ArrayBuffer(Mc0(Q));
    return (new Uint8Array(B).set(new Uint8Array(A), 0), B);
}, fp9 = (A, Q)=>{
    if (Q <= A.maxByteLength) return (A.resize(Q), A);
    let B = new ArrayBuffer(Q, {
        maxByteLength: Mc0(Q)
    });
    return (new Uint8Array(B).set(new Uint8Array(A), 0), B);
}, Mc0 = (A)=>Oc0 ** Math.ceil(Math.log(A) / Math.log(Oc0)), Oc0 = 2, bp9 = ({ contents: A, length: Q })=>(Rc0() ? A : A.slice(0, Q)), Rc0 = ()=>"resize" in ArrayBuffer.prototype, hp9;
