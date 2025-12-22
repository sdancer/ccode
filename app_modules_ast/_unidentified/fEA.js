// Module: fEA
// Type: U
// Lines: 3967-3988
//
var fEA = U((my0)=>{
    Object.defineProperty(my0, "__esModule", {
        value: !0
    });
    my0.pipeFromArray = my0.pipe = void 0;
    var HL9 = dD();
    function DL9() {
        var A = [];
        for(var Q = 0; Q < arguments.length; Q++)A[Q] = arguments[Q];
        return uy0(A);
    }
    my0.pipe = DL9;
    function uy0(A) {
        if (A.length === 0) return HL9.identity;
        if (A.length === 1) return A[0];
        return function(B) {
            return A.reduce(function(G, Z) {
                return Z(G);
            }, B);
        };
    }
    my0.pipeFromArray = uy0;
});
