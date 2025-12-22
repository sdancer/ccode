// Module: Zb0
// Type: U
// Lines: 8102-8116
//
var Zb0 = U((Bb0)=>{
    Object.defineProperty(Bb0, "__esModule", {
        value: !0
    });
    Bb0.partition = void 0;
    var CT9 = sz1(), Ab0 = rb(), Qb0 = renderElement();
    function $T9(A, Q, B) {
        return [
            Ab0.filter(Q, B)(Qb0.innerFrom(A)),
            Ab0.filter(CT9.not(Q, B))(Qb0.innerFrom(A))
        ];
    }
    Bb0.partition = $T9;
});
