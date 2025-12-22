// Module: Fk0
// Type: U
// Lines: 6957-6971
//
var Fk0 = U((Hk0)=>{
    Object.defineProperty(Hk0, "__esModule", {
        value: !0
    });
    Hk0.isObservable = void 0;
    var gR9 = zZ(), Vk0 = renderElement();
    function uR9(A) {
        return (!!A && (A instanceof gR9.Observable || (Vk0.isFunction(A.lift) && Vk0.isFunction(A.subscribe))));
    }
    Hk0.isObservable = uR9;
});
