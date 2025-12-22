// Module: wj
// Type: U
// Lines: 5960-5979
//
var wj = U((Qv0)=>{
    Object.defineProperty(Qv0, "__esModule", {
        value: !0
    });
    Qv0.empty = Qv0.EMPTY = void 0;
    var Av0 = zZ();
    Qv0.EMPTY = new Av0.Observable(function(A) {
        return A.complete();
    });
    function rO9(A) {
        return A ? sO9(A) : Qv0.EMPTY;
    }
    Qv0.empty = rO9;
    function sO9(A) {
        return new Av0.Observable(function(Q) {
            return A.schedule(function() {
                return Q.complete();
            });
        });
    }
});
