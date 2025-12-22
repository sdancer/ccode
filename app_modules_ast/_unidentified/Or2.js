// Module: Or2
// Type: U
// Lines: 453691-453713
//
var Or2 = U((Nr2)=>{
    Object.defineProperty(Nr2, "__esModule", {
        value: !0
    });
    Nr2.NodeEventQueue = void 0;
    var Ur2 = Fs();
    class wr2 extends Ur2.PriorityQueue {
        constructor(){
            super(1, []);
        }
        getAttempts(A) {
            return A.attempts ?? 0;
        }
        updateAttempts(A) {
            return ((A.attempts = this.getAttempts(A) + 1), this.getAttempts(A));
        }
    }
    class qr2 extends Ur2.CoreEventQueue {
        constructor(){
            super(new wr2());
        }
    }
    Nr2.NodeEventQueue = qr2;
});
