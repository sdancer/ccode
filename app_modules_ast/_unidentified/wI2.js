// Module: wI2
// Type: U
// Lines: 358849-358875
//
var wI2 = U(($I2)=>{
    Object.defineProperty($I2, "__esModule", {
        value: !0
    });
    $I2.StatusBuilder = void 0;
    class CI2 {
        constructor(){
            ((this.code = null), (this.details = null), (this.metadata = null));
        }
        withCode(A) {
            return ((this.code = A), this);
        }
        withDetails(A) {
            return ((this.details = A), this);
        }
        withMetadata(A) {
            return ((this.metadata = A), this);
        }
        build() {
            let A = {};
            if (this.code !== null) A.code = this.code;
            if (this.details !== null) A.details = this.details;
            if (this.metadata !== null) A.metadata = this.metadata;
            return A;
        }
    }
    $I2.StatusBuilder = CI2;
});
