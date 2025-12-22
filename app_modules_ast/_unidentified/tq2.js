// Module: tq2
// Type: U
// Lines: 384535-384555
//
var tq2 = U((CyZ, sq2)=>{
    var rq2 = performWork();
    sq2.exports = function(Q, B) {
        if (Q) {
            B.then(function(G) {
                rq2(function() {
                    Q(null, G);
                });
            }, function(G) {
                rq2(function() {
                    Q(G);
                });
            });
            return;
        } else return B;
    };
});
