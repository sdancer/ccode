// Module: w$1
// Type: U
// Lines: 11161-11174
//
var w$1 = U((Ym0)=>{
    Object.defineProperty(Ym0, "__esModule", {
        value: !0
    });
    Ym0.timestamp = void 0;
    var $f9 = vgA(), Uf9 = ob();
    function wf9(A) {
        if (A === void 0) A = $f9.dateTimestampProvider;
        return Uf9.map(function(Q) {
            return {
                value: Q,
                timestamp: A.now()
            };
        });
    }
    Ym0.timestamp = wf9;
});
