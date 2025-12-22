// Module: Bb1
// Type: U
// Lines: 115323-115369
//
var Bb1 = U((Co7, iPQ)=>{
    class Qb1 {
        constructor(){
            ((this.bottom = 0), (this.top = 0), (this.list = Array(2048)), (this.next = null));
        }
        isEmpty() {
            return this.top === this.bottom;
        }
        isFull() {
            return ((this.top + 1) & 2047) === this.bottom;
        }
        push(A) {
            ((this.list[this.top] = A), (this.top = (this.top + 1) & 2047));
        }
        shift() {
            let A = this.list[this.bottom];
            if (A === void 0) return null;
            return ((this.list[this.bottom] = void 0), (this.bottom = (this.bottom + 1) & 2047), A);
        }
    }
    iPQ.exports = class {
        constructor(){
            this.head = this.tail = new Qb1();
        }
        isEmpty() {
            return this.head.isEmpty();
        }
        push(Q) {
            if (this.head.isFull()) this.head = this.head.next = new Qb1();
            this.head.push(Q);
        }
        shift() {
            let Q = this.tail, B = Q.shift();
            if (Q.isEmpty() && Q.next !== null) this.tail = Q.next;
            return B;
        }
    };
});
