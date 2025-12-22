// Module: T8Q
// Type: U
// Lines: 67445-67473
//
var T8Q = U((pZ4)=>{
    var j8Q = {}, QO1 = {};
    for(let A = 0; A < 256; A++){
        let Q = A.toString(16).toLowerCase();
        if (Q.length === 1) Q = `0${Q}`;
        ((j8Q[A] = Q), (QO1[Q] = A));
    }
    function dZ4(A) {
        if (A.length % 2 !== 0) throw Error("Hex encoded strings must have an even number length");
        let Q = new Uint8Array(A.length / 2);
        for(let B = 0; B < A.length; B += 2){
            let G = A.slice(B, B + 2).toLowerCase();
            if (G in QO1) Q[B / 2] = QO1[G];
            else throw Error(`Cannot decode unrecognized sequence ${G} as hexadecimal`);
        }
        return Q;
    }
    function cZ4(A) {
        let Q = "";
        for(let B = 0; B < A.byteLength; B++)Q += j8Q[A[B]];
        return Q;
    }
    pZ4.fromHex = dZ4;
    pZ4.toHex = cZ4;
});
