// Module: $12
// Type: U
// Lines: 312596-312612
//
var $12 = U((KYZ, C12)=>{
    var hS3 = k31(), gS3 = l70(), uS3 = Ck();
    class z12 extends hS3 {
        constructor(A, Q){
            super(A, Q);
            ((this.posTracker = uS3.install(A, gS3)), (this.lastErrOffset = -1));
        }
        _reportError(A) {
            if (this.lastErrOffset !== this.posTracker.offset) ((this.lastErrOffset = this.posTracker.offset), super._reportError(A));
        }
    }
    C12.exports = z12;
});
