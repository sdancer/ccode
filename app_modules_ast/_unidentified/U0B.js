// Module: U0B
// Type: L
// Lines: 134294-134335
//
var U0B = L(()=>{
    zE1();
    fu1();
    whA();
    ((CD8 = !(sc && 1 / A8A(new sc([
        ,
        -0
    ]))[1] == zD8) ? th : function(A) {
        return new sc(A);
    }), ($0B = CD8));
});
function UD8(A, Q, B) {
    var G = -1, Z = Y1B, Y = A.length, J = !0, X = [], I = X;
    if (B) ((J = !1), (Z = c1B));
    else if (Y >= $D8) {
        var W = Q ? null : $0B(A);
        if (W) return A8A(W);
        ((J = !1), (Z = $hA), (I = new ChA()));
    } else I = Q ? [] : X;
    A: while(++G < Y){
        var K = A[G], V = Q ? Q(K) : K;
        if (((K = B || K !== 0 ? K : 0), J && V === V)) {
            var H = I.length;
            while(H--)if (I[H] === V) continue A;
            if (Q) I.push(V);
            X.push(K);
        } else if (!Z(I, V, B)) {
            if (I !== X) I.push(V);
            X.push(K);
        }
    }
    return X;
}
var $D8 = 200, w0B;
