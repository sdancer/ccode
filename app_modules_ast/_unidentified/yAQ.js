// Module: yAQ
// Type: U
// Lines: 51210-51220
//
var yAQ = U((lx7, SAQ)=>{
    SAQ.exports = function(A, Q) {
        return (Object.keys(Q).forEach(function(B) {
            A[B] = A[B] || Q[B];
        }), A);
    };
});
