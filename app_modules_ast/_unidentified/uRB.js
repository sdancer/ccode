// Module: uRB
// Type: U
// Lines: 235622-235648
//
var uRB = U((fkG, gRB)=>{
    class hRB {
        constructor(){
            ((this.max = 1000), (this.map = new Map()));
        }
        get(A) {
            let Q = this.map.get(A);
            if (Q === void 0) return;
            else return (this.map.delete(A), this.map.set(A, Q), Q);
        }
        delete(A) {
            return this.map.delete(A);
        }
        set(A, Q) {
            if (!this.delete(A) && Q !== void 0) {
                if (this.map.size >= this.max) {
                    let G = this.map.keys().next().value;
                    this.delete(G);
                }
                this.map.set(A, Q);
            }
            return this;
        }
    }
    gRB.exports = hRB;
});
