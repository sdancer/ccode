// Module: Dw1
// Type: U
// Lines: 50549-50580
//
var Dw1 = U((Jx7, AmA)=>{
    var Ge0 = Kw1(), UA4 = Vw1(), wA4 = Hw1();
    AmA.exports = qA4;
    AmA.exports.ascending = Ze0;
    AmA.exports.descending = NA4;
    function qA4(A, Q, B, G) {
        var Z = UA4(A, B);
        return (Ge0(A, Q, Z, function Y(J, X) {
            if (J) {
                G(J, X);
                return;
            }
            if ((Z.index++, Z.index < (Z.keyedList || A).length)) {
                Ge0(A, Q, Z, Y);
                return;
            }
            G(null, Z.results);
        }), wA4.bind(Z, G));
    }
    function Ze0(A, Q) {
        return A < Q ? -1 : A > Q ? 1 : 0;
    }
    function NA4(A, Q) {
        return -1 * Ze0(A, Q);
    }
});
