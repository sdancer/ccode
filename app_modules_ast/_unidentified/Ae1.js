// Module: Ae1
// Type: U
// Lines: 233588-233602
//
var Ae1 = U((IOB)=>{
    Object.defineProperty(IOB, "__esModule", {
        value: !0
    });
    IOB.default = fr8;
    var vr8 = kr8(qA("crypto"));
    function kr8(A) {
        return A && A.__esModule ? A : {
            default: A
        };
    }
    var SQ1 = new Uint8Array(256), PQ1 = SQ1.length;
    function fr8() {
        if (PQ1 > SQ1.length - 16) (vr8.default.randomFillSync(SQ1), (PQ1 = 0));
        return SQ1.slice(PQ1, (PQ1 += 16));
    }
});
