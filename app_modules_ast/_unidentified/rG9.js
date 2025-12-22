// Module: rG9
// Type: U
// Lines: 497438-497459
//
var rG9 = U((w87)=>{
    var AbA = new Uint8Array(512), ID1 = new Uint8Array(256);
    (function() {
        let Q = 1;
        for(let B = 0; B < 255; B++)if (((AbA[B] = Q), (ID1[Q] = B), (Q <<= 1), Q & 256)) Q ^= 285;
        for(let B = 255; B < 512; B++)AbA[B] = AbA[B - 255];
    })();
    w87.log = function(Q) {
        if (Q < 1) throw Error("log(" + Q + ")");
        return ID1[Q];
    };
    w87.exp = function(Q) {
        return AbA[Q];
    };
    w87.mul = function(Q, B) {
        if (Q === 0 || B === 0) return 0;
        return AbA[ID1[Q] + ID1[B]];
    };
});
