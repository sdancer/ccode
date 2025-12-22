// Module: K$1
// Type: U
// Lines: 10845-10861
//
var K$1 = U((Su0)=>{
    Object.defineProperty(Su0, "__esModule", {
        value: !0
    });
    Su0.startWith = void 0;
    var Pu0 = mEA(), Tk9 = trackPostpone(), Pk9 = E2();
    function Sk9() {
        var A = [];
        for(var Q = 0; Q < arguments.length; Q++)A[Q] = arguments[Q];
        var B = Tk9.popScheduler(A);
        return Pk9.operate(function(G, Z) {
            (B ? Pu0.concat(A, G, B) : Pu0.concat(A, G)).subscribe(Z);
        });
    }
    Su0.startWith = Sk9;
});
