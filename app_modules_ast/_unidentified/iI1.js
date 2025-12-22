// Module: iI1
// Type: U
// Lines: 432536-432548
//
var iI1 = U((Nf2)=>{
    Object.defineProperty(Nf2, "__esModule", {
        value: !0
    });
    var qf2 = FQ(), Tj5 = qf();
    function Pj5(A) {
        return (A || Tj5.getCurrentHub()).getScope().getTransaction();
    }
    var Sj5 = qf2.extractTraceparentData;
    Nf2.stripUrlQueryAndFragment = qf2.stripUrlQueryAndFragment;
    Nf2.extractTraceparentData = Sj5;
    Nf2.getActiveTransaction = Pj5;
});
