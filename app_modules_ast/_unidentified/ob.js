// Module: ob
// Type: U
// Lines: 7157-7174
//
var ob = U((vk0)=>{
    Object.defineProperty(vk0, "__esModule", {
        value: !0
    });
    vk0.map = void 0;
    var J_9 = E2(), X_9 = renderElement();
    function I_9(A, Q) {
        return J_9.operate(function(B, G) {
            var Z = 0;
            B.subscribe(X_9.createOperatorSubscriber(G, function(Y) {
                G.next(A.call(Q, Y, Z++));
            }));
        });
    }
    vk0.map = I_9;
});
