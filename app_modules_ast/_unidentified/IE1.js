// Module: IE1
// Type: L
// Lines: 1064-1081
//
var IE1 = L(()=>{
    qhA();
    XC();
    NhA = EU9;
});
function zU9(A, Q) {
    var B = -1, G = A == null ? 0 : A.length, Z = 0, Y = [];
    while(++B < G){
        var J = A[B];
        if (Q(J, B, A)) Y[Z++] = J;
    }
    return Y;
}
var LhA;
