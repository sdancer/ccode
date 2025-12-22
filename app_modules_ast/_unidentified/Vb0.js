// Module: Vb0
// Type: U
// Lines: 8154-8181
//
var Vb0 = U((Wb0)=>{
    Object.defineProperty(Wb0, "__esModule", {
        value: !0
    });
    Wb0.range = void 0;
    var OT9 = zZ(), MT9 = wj();
    function RT9(A, Q, B) {
        if (Q == null) ((Q = A), (A = 0));
        if (Q <= 0) return MT9.EMPTY;
        var G = Q + A;
        return new OT9.Observable(B ? function(Z) {
            var Y = A;
            return B.schedule(function() {
                if (Y < G) (Z.next(Y++), this.schedule());
                else Z.complete();
            });
        } : function(Z) {
            var Y = A;
            while(Y < G && !Z.closed)Z.next(Y++);
            Z.complete();
        });
    }
    Wb0.range = RT9;
});
