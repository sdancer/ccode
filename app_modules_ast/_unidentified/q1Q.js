// Module: q1Q
// Type: L
// Lines: 52926-52958
//
var q1Q = L(()=>{
    U1Q = class U1Q extends O04.Transform {
        __transform(A, Q, B) {
            (this.push(A), B());
        }
        _transform(A, Q, B) {
            if (A.length !== 0) {
                if (((this._transform = this.__transform), A[0] !== 120)) {
                    let G = Buffer.alloc(2);
                    ((G[0] = 120), (G[1] = 156), this.push(G, Q));
                }
            }
            this.__transform(A, Q, B);
        }
    };
    w1Q = U1Q;
});
var M04 = (A, Q)=>{
    return n1.isAsyncFn(A) ? function(...B) {
        let G = B.pop();
        A.apply(this, B).then((Z)=>{
            try {
                Q ? G(null, ...Q(Z)) : G(null, Z);
            } catch (Y) {
                G(Y);
            }
        }, G);
    } : A;
}, N1Q;
