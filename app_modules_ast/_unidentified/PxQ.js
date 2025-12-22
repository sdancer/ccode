// Module: PxQ
// Type: U
// Lines: 118050-118064
//
var PxQ = U((lo7, TxQ)=>{
    var No6 = qnA();
    TxQ.exports = (A)=>{
        let Q = A?.maxRedirections;
        return (B)=>{
            return function(Z, Y) {
                let { maxRedirections: J = Q, ...X } = Z;
                if (!J) return B(Z, Y);
                let I = new No6(B, J, Z, Y);
                return B(X, I);
            };
        };
    };
});
