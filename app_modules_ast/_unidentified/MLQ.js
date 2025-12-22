// Module: MLQ
// Type: U
// Lines: 103898-103926
//
var MLQ = U((TO6)=>{
    var OLQ = {}, wv1 = {};
    for(let A = 0; A < 256; A++){
        let Q = A.toString(16).toLowerCase();
        if (Q.length === 1) Q = `0${Q}`;
        ((OLQ[A] = Q), (wv1[Q] = A));
    }
    function _O6(A) {
        if (A.length % 2 !== 0) throw Error("Hex encoded strings must have an even number length");
        let Q = new Uint8Array(A.length / 2);
        for(let B = 0; B < A.length; B += 2){
            let G = A.slice(B, B + 2).toLowerCase();
            if (G in wv1) Q[B / 2] = wv1[G];
            else throw Error(`Cannot decode unrecognized sequence ${G} as hexadecimal`);
        }
        return Q;
    }
    function jO6(A) {
        let Q = "";
        for(let B = 0; B < A.byteLength; B++)Q += OLQ[A[B]];
        return Q;
    }
    TO6.fromHex = _O6;
    TO6.toHex = jO6;
});
