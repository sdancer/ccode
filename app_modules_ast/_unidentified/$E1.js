// Module: $E1
// Type: L
// Lines: 1657-1668
//
var $E1 = L(()=>{
    chA = nw9;
});
function aw9(A) {
    var Q = bT0(A);
    if (Q.length == 1 && Q[0][2]) return chA(Q[0][0], Q[0][1]);
    return function(B) {
        return B === A || kT0(B, A, Q);
    };
}
var gT0;
