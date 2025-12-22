// Module: qfA
// Type: L
// Lines: 473131-473147
//
var qfA = L(()=>{
    $B7 = {};
});
function ud(A, Q) {
    let B = Ns(), G = Q?.weekStartsOn ?? Q?.locale?.options?.weekStartsOn ?? B.weekStartsOn ?? B.locale?.options?.weekStartsOn ?? 0, Z = hI(A, Q?.in), Y = Z.getDay(), J = (Y < G ? 7 : 0) + Y - G;
    return (Z.setDate(Z.getDate() - J), Z.setHours(0, 0, 0, 0), Z);
}
