// Module: nV0
// Type: U
// Lines: 382411-382433
//
var nV0 = U((ZyZ, Sw2)=>{
    var G75 = Ez(), Z75 = Object.prototype.hasOwnProperty;
    function Y75(A) {
        if (A === null) return !0;
        var Q, B = A;
        for(Q in B)if (Z75.call(B, Q)) {
            if (B[Q] !== null) return !1;
        }
        return !0;
    }
    function J75(A) {
        return A !== null ? A : {};
    }
    Sw2.exports = new G75("tag:yaml.org,2002:set", {
        kind: "mapping",
        resolve: Y75,
        construct: J75
    });
});
