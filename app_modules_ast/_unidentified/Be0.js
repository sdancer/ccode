// Module: Be0
// Type: U
// Lines: 50527-50549
//
var Be0 = U((Yx7, Qe0)=>{
    var EA4 = Kw1(), zA4 = Vw1(), CA4 = Hw1();
    Qe0.exports = $A4;
    function $A4(A, Q, B) {
        var G = zA4(A);
        while(G.index < (G.keyedList || A).length)(EA4(A, Q, G, function(Z, Y) {
            if (Z) {
                B(Z, Y);
                return;
            }
            if (Object.keys(G.jobs).length === 0) {
                B(null, G.results);
                return;
            }
        }), G.index++);
        return CA4.bind(G, B);
    }
});
