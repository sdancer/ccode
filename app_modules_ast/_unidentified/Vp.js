// Module: Vp
// Type: U
// Lines: 7952-7979
//
var Vp = U((Sf0)=>{
    Object.defineProperty(Sf0, "__esModule", {
        value: !0
    });
    Sf0.timer = void 0;
    var dj9 = zZ(), cj9 = HU(), pj9 = hEA(), lj9 = dgA();
    function ij9(A, Q, B) {
        if (A === void 0) A = 0;
        if (B === void 0) B = cj9.async;
        var G = -1;
        if (Q != null) if (pj9.isScheduler(Q)) B = Q;
        else G = Q;
        return new dj9.Observable(function(Z) {
            var Y = lj9.isValidDate(A) ? +A - B.now() : A;
            if (Y < 0) Y = 0;
            var J = 0;
            return B.schedule(function() {
                if (!Z.closed) if ((Z.next(J++), 0 <= G)) this.schedule(void 0, G);
                else Z.complete();
            }, Y);
        });
    }
    Sf0.timer = ij9;
});
