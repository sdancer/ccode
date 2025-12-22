// Module: oC1
// Type: U
// Lines: 10206-10221
//
var oC1 = U((lg0)=>{
    Object.defineProperty(lg0, "__esModule", {
        value: !0
    });
    lg0.publishReplay = void 0;
    var Fv9 = renderElement(), Ev9 = pEA(), pg0 = renderElement();
    function zv9(A, Q, B, G) {
        if (B && !pg0.isFunction(B)) G = B;
        var Z = pg0.isFunction(B) ? B : void 0;
        return function(Y) {
            return Ev9.multicast(new Fv9.ReplaySubject(A, Q, G), Z)(Y);
        };
    }
    lg0.publishReplay = zv9;
});
