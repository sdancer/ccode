// Module: NLQ
// Type: U
// Lines: 103774-103804
//
var NLQ = U((wLQ)=>{
    Object.defineProperty(wLQ, "__esModule", {
        value: !0
    });
    wLQ.AwsCrc32 = void 0;
    var $LQ = step(), Cv1 = zv1(), ULQ = $v1(), CO6 = (function() {
        function A() {
            this.crc32 = new ULQ.Crc32();
        }
        return ((A.prototype.update = function(Q) {
            if ((0, Cv1.isEmptyData)(Q)) return;
            this.crc32.update((0, Cv1.convertToBuffer)(Q));
        }), (A.prototype.digest = function() {
            return $LQ.__awaiter(this, void 0, void 0, function() {
                return $LQ.__generator(this, function(Q) {
                    return [
                        2,
                        (0, Cv1.numToUint8)(this.crc32.digest())
                    ];
                });
            });
        }), (A.prototype.reset = function() {
            this.crc32 = new ULQ.Crc32();
        }), A);
    })();
    wLQ.AwsCrc32 = CO6;
});
