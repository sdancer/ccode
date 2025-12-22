// Module: qO0
// Type: U
// Lines: 498397-498408
//
var qO0 = U((I0J, TZ9)=>{
    TZ9.exports = function(Q, B, G) {
        let Z = Q + B - G, Y = Math.abs(Z - Q), J = Math.abs(Z - B), X = Math.abs(Z - G);
        if (Y <= J && Y <= X) return Q;
        if (J <= X) return B;
        return G;
    };
});
