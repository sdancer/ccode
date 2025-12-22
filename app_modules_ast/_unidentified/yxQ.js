// Module: yxQ
// Type: U
// Lines: 118064-118080
//
var yxQ = U((io7, SxQ)=>{
    var Lo6 = SnA();
    SxQ.exports = (A)=>{
        return (Q)=>{
            return function(G, Z) {
                return Q(G, new Lo6({
                    ...G,
                    retryOptions: {
                        ...A,
                        ...G.retryOptions
                    }
                }, {
                    handler: Z,
                    dispatch: Q
                }));
            };
        };
    };
});
