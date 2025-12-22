// Module: Iw1
// Type: U
// Lines: 50448-50467
//
var Iw1 = U((Ax7, ot0)=>{
    var at0 = renderElement();
    ot0.exports = YA4;
    function YA4(A) {
        var Q = !1;
        return (at0(function() {
            Q = !0;
        }), function(G, Z) {
            if (Q) A(G, Z);
            else at0(function() {
                A(G, Z);
            });
        });
    }
});
