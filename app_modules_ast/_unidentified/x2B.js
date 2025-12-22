// Module: x2B
// Type: U
// Lines: 151141-151166
//
var x2B = U((r3G, y2B)=>{
    var P2B = Symbol("kDone"), Od1 = Symbol("kRun");
    class S2B {
        constructor(A){
            ((this[P2B] = ()=>{
                (this.pending--, this[Od1]());
            }), (this.concurrency = A || 1 / 0), (this.jobs = []), (this.pending = 0));
        }
        add(A) {
            (this.jobs.push(A), this[Od1]());
        }
        [Od1]() {
            if (this.pending === this.concurrency) return;
            if (this.jobs.length) {
                let A = this.jobs.shift();
                (this.pending++, A(this[P2B]));
            }
        }
    }
    y2B.exports = S2B;
});
