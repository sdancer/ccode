// Module: cEA
// Type: U
// Lines: 9047-9070
//
var cEA = U((Zh0)=>{
    Object.defineProperty(Zh0, "__esModule", {
        value: !0
    });
    Zh0.connect = void 0;
    var DS9 = renderElement(), FS9 = renderElement(), ES9 = E2(), zS9 = Gh0(), CS9 = {
        connector: function() {
            return new DS9.Subject();
        }
    };
    function $S9(A, Q) {
        if (Q === void 0) Q = CS9;
        var B = Q.connector;
        return ES9.operate(function(G, Z) {
            var Y = B();
            (FS9.innerFrom(A(zS9.fromSubscribable(Y))).subscribe(Z), Z.add(G.subscribe(Y)));
        });
    }
    Zh0.connect = $S9;
});
