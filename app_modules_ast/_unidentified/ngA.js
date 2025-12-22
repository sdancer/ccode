// Module: ngA
// Type: U
// Lines: 8780-8795
//
var ngA = U((hb0)=>{
    Object.defineProperty(hb0, "__esModule", {
        value: !0
    });
    hb0.toArray = void 0;
    var RP9 = et(), _P9 = E2(), jP9 = function(A, Q) {
        return (A.push(Q), A);
    };
    function TP9() {
        return _P9.operate(function(A, Q) {
            RP9.reduce(jP9, [])(A).subscribe(Q);
        });
    }
    hb0.toArray = TP9;
});
