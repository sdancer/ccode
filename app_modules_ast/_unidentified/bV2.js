// Module: bV2
// Type: U
// Lines: 362916-362938
//
var bV2 = U((kV2)=>{
    Object.defineProperty(kV2, "__esModule", {
        value: !0
    });
    kV2.RandomIdGenerator = void 0;
    var YB5 = 8, xV2 = 16;
    class vV2 {
        generateTraceId = yV2(xV2);
        generateSpanId = yV2(YB5);
    }
    kV2.RandomIdGenerator = vV2;
    var hG1 = Buffer.allocUnsafe(xV2);
    function yV2(A) {
        return function() {
            for(let B = 0; B < A / 4; B++)hG1.writeUInt32BE((Math.random() * 4294967296) >>> 0, B * 4);
            for(let B = 0; B < A; B++)if (hG1[B] > 0) break;
            else if (B === A - 1) hG1[A - 1] = 1;
            return hG1.toString("hex", 0, A);
        };
    }
});
