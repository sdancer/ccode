// Module: fLQ
// Type: U
// Lines: 104282-104310
//
var fLQ = U((eO6)=>{
    var kLQ = {}, Nv1 = {};
    for(let A = 0; A < 256; A++){
        let Q = A.toString(16).toLowerCase();
        if (Q.length === 1) Q = `0${Q}`;
        ((kLQ[A] = Q), (Nv1[Q] = A));
    }
    function sO6(A) {
        if (A.length % 2 !== 0) throw Error("Hex encoded strings must have an even number length");
        let Q = new Uint8Array(A.length / 2);
        for(let B = 0; B < A.length; B += 2){
            let G = A.slice(B, B + 2).toLowerCase();
            if (G in Nv1) Q[B / 2] = Nv1[G];
            else throw Error(`Cannot decode unrecognized sequence ${G} as hexadecimal`);
        }
        return Q;
    }
    function tO6(A) {
        let Q = "";
        for(let B = 0; B < A.byteLength; B++)Q += kLQ[A[B]];
        return Q;
    }
    eO6.fromHex = sO6;
    eO6.toHex = tO6;
});
