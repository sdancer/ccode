// Module: IO1
// Type: U
// Lines: 68957-68991
//
var IO1 = U((nY4)=>{
    var h3Q = b3Q(), RE = Array.from({
        length: 256
    }, (A, Q)=>Q.toString(16).padStart(2, "0")), iY4 = ()=>{
        if (h3Q.randomUUID) return h3Q.randomUUID();
        let A = new Uint8Array(16);
        return (crypto.getRandomValues(A), (A[6] = (A[6] & 15) | 64), (A[8] = (A[8] & 63) | 128), RE[A[0]] + RE[A[1]] + RE[A[2]] + RE[A[3]] + "-" + RE[A[4]] + RE[A[5]] + "-" + RE[A[6]] + RE[A[7]] + "-" + RE[A[8]] + RE[A[9]] + "-" + RE[A[10]] + RE[A[11]] + RE[A[12]] + RE[A[13]] + RE[A[14]] + RE[A[15]]);
    };
    nY4.v4 = iY4;
});
