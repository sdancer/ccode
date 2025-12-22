// Module: cv0
// Type: U
// Lines: 6686-6701
//
var cv0 = U((mv0)=>{
    Object.defineProperty(mv0, "__esModule", {
        value: !0
    });
    mv0.scheduleArray = void 0;
    var tM9 = zZ();
    function eM9(A, Q) {
        return new tM9.Observable(function(B) {
            var G = 0;
            return Q.schedule(function() {
                if (G === A.length) B.complete();
                else if ((B.next(A[G++]), !B.closed)) this.schedule();
            });
        });
    }
    mv0.scheduleArray = eM9;
});
