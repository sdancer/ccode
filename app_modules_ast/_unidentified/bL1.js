// Module: bL1
// Type: U
// Lines: 65827-65859
//
var bL1 = U((y6Q)=>{
    Object.defineProperty(y6Q, "__esModule", {
        value: !0
    });
    y6Q.ByteArrayCollector = void 0;
    class S6Q {
        allocByteArray;
        byteLength = 0;
        byteArrays = [];
        constructor(A){
            this.allocByteArray = A;
        }
        push(A) {
            (this.byteArrays.push(A), (this.byteLength += A.byteLength));
        }
        flush() {
            if (this.byteArrays.length === 1) {
                let B = this.byteArrays[0];
                return (this.reset(), B);
            }
            let A = this.allocByteArray(this.byteLength), Q = 0;
            for(let B = 0; B < this.byteArrays.length; ++B){
                let G = this.byteArrays[B];
                (A.set(G, Q), (Q += G.byteLength));
            }
            return (this.reset(), A);
        }
        reset() {
            ((this.byteArrays = []), (this.byteLength = 0));
        }
    }
    y6Q.ByteArrayCollector = S6Q;
});
