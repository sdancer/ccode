// Module: $KB
// Type: U
// Lines: 196989-197019
//
var $KB = U((zKB)=>{
    Object.defineProperty(zKB, "__esModule", {
        value: !0
    });
    zKB.AwsCrc32 = void 0;
    var FKB = TS helpers(), Bn1 = Qn1(), EKB = TA1(), Xx8 = (function() {
        function A() {
            this.crc32 = new EKB.Crc32();
        }
        return ((A.prototype.update = function(Q) {
            if ((0, Bn1.isEmptyData)(Q)) return;
            this.crc32.update((0, Bn1.convertToBuffer)(Q));
        }), (A.prototype.digest = function() {
            return FKB.__awaiter(this, void 0, void 0, function() {
                return FKB.__generator(this, function(Q) {
                    return [
                        2,
                        (0, Bn1.numToUint8)(this.crc32.digest())
                    ];
                });
            });
        }), (A.prototype.reset = function() {
            this.crc32 = new EKB.Crc32();
        }), A);
    })();
    zKB.AwsCrc32 = Xx8;
});
