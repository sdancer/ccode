// Module: WmA
// Type: L
// Lines: 51646-51678
//
var WmA = L(()=>{
    createRenderState();
    dAQ();
});
class cAQ {
    constructor(){
        this.handlers = [];
    }
    use(A, Q, B) {
        return (this.handlers.push({
            fulfilled: A,
            rejected: Q,
            synchronous: B ? B.synchronous : !1,
            runWhen: B ? B.runWhen : null
        }), this.handlers.length - 1);
    }
    eject(A) {
        if (this.handlers[A]) this.handlers[A] = null;
    }
    clear() {
        if (this.handlers) this.handlers = [];
    }
    forEach(A) {
        n1.forEach(this.handlers, function(B) {
            if (B !== null) A(B);
        });
    }
}
var Sw1;
