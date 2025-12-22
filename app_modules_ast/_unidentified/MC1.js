// Module: MC1
// Type: U
// Lines: 9465-9488
//
var MC1 = U((mh0)=>{
    Object.defineProperty(mh0, "__esModule", {
        value: !0
    });
    mh0.every = void 0;
    var _y9 = E2(), jy9 = renderElement();
    function Ty9(A, Q) {
        return _y9.operate(function(B, G) {
            var Z = 0;
            B.subscribe(jy9.createOperatorSubscriber(G, function(Y) {
                if (!A.call(Q, Y, Z++, B)) (G.next(!1), G.complete());
            }, function() {
                (G.next(!0), G.complete());
            }));
        });
    }
    mh0.every = Ty9;
});
