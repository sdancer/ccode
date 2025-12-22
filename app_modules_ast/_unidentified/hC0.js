// Module: hC0
// Type: U
// Lines: 432653-432679
//
var hC0 = U((Rf2)=>{
    Object.defineProperty(Rf2, "__esModule", {
        value: !0
    });
    var pj5 = FQ();
    function lj5(A, Q, B = ()=>{}) {
        let G;
        try {
            G = A();
        } catch (Z) {
            throw (Q(Z), B(), Z);
        }
        return ij5(G, Q, B);
    }
    function ij5(A, Q, B) {
        if (pj5.isThenable(A)) return A.then((G)=>{
            return (B(), G);
        }, (G)=>{
            throw (Q(G), B(), G);
        });
        return (B(), A);
    }
    Rf2.handleCallbackErrors = lj5;
});
