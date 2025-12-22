// Module: B7Q
// Type: U
// Lines: 72291-72319
//
var B7Q = U((XV4)=>{
    var Q7Q = {}, GM1 = {};
    for(let A = 0; A < 256; A++){
        let Q = A.toString(16).toLowerCase();
        if (Q.length === 1) Q = `0${Q}`;
        ((Q7Q[A] = Q), (GM1[Q] = A));
    }
    function YV4(A) {
        if (A.length % 2 !== 0) throw Error("Hex encoded strings must have an even number length");
        let Q = new Uint8Array(A.length / 2);
        for(let B = 0; B < A.length; B += 2){
            let G = A.slice(B, B + 2).toLowerCase();
            if (G in GM1) Q[B / 2] = GM1[G];
            else throw Error(`Cannot decode unrecognized sequence ${G} as hexadecimal`);
        }
        return Q;
    }
    function JV4(A) {
        let Q = "";
        for(let B = 0; B < A.byteLength; B++)Q += Q7Q[A[B]];
        return Q;
    }
    XV4.fromHex = YV4;
    XV4.toHex = JV4;
});
