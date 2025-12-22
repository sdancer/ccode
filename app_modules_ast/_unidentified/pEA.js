// Module: pEA
// Type: U
// Lines: 10054-10073
//
var pEA = U((Sg0)=>{
    Object.defineProperty(Sg0, "__esModule", {
        value: !0
    });
    Sg0.multicast = void 0;
    var ix9 = renderElement(), Pg0 = renderElement(), nx9 = cEA();
    function ax9(A, Q) {
        var B = Pg0.isFunction(A) ? A : function() {
            return A;
        };
        if (Pg0.isFunction(Q)) return nx9.connect(Q, {
            connector: B
        });
        return function(G) {
            return new ix9.ConnectableObservable(G, B);
        };
    }
    Sg0.multicast = ax9;
});
