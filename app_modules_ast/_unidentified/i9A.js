// Module: i9A
// Type: U
// Lines: 437137-437155
//
var i9A = U((sg2)=>{
    Object.defineProperty(sg2, "__esModule", {
        value: !0
    });
    var yb5 = (A, Q, B)=>{
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(A)) {
                let G = new PerformanceObserver((Z)=>{
                    Q(Z.getEntries());
                });
                return (G.observe(Object.assign({
                    type: A,
                    buffered: !0
                }, B || {})), G);
            }
        } catch (G) {}
        return;
    };
    sg2.observe = yb5;
});
