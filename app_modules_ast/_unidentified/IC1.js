// Module: IC1
// Type: U
// Lines: 8744-8770
//
var IC1 = U((vb0)=>{
    Object.defineProperty(vb0, "__esModule", {
        value: !0
    });
    vb0.scanInternals = void 0;
    var qP9 = renderElement();
    function NP9(A, Q, B, G, Z) {
        return function(Y, J) {
            var X = B, I = Q, W = 0;
            Y.subscribe(qP9.createOperatorSubscriber(J, function(K) {
                var V = W++;
                ((I = X ? A(I, K, V) : ((X = !0), K)), G && J.next(I));
            }, Z && function() {
                (X && J.next(I), J.complete());
            }));
        };
    }
    vb0.scanInternals = NP9;
});
