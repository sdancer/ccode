// Module: rb
// Type: U
// Lines: 8085-8102
//
var rb = U((tf0)=>{
    Object.defineProperty(tf0, "__esModule", {
        value: !0
    });
    tf0.filter = void 0;
    var FT9 = E2(), ET9 = renderElement();
    function zT9(A, Q) {
        return FT9.operate(function(B, G) {
            var Z = 0;
            B.subscribe(ET9.createOperatorSubscriber(G, function(Y) {
                return A.call(Q, Y, Z++) && G.next(Y);
            }));
        });
    }
    tf0.filter = zT9;
});
