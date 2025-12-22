// Module: tD0
// Type: U
// Lines: 399460-399500
//
var tD0 = U((tpZ, PM2)=>{
    var Jd = PI(), $_ = (PM2.exports = {
        valid: function(A) {
            return (Jd.assert(A, "list falsy"), Jd.assert(A._previousSibling, "previous falsy"), Jd.assert(A._nextSibling, "next falsy"), !0);
        },
        insertBefore: function(A, Q) {
            Jd.assert($_.valid(A) && $_.valid(Q));
            var B = A, G = A._previousSibling, Z = Q, Y = Q._previousSibling;
            ((B._previousSibling = Y), (G._nextSibling = Z), (Y._nextSibling = B), (Z._previousSibling = G), Jd.assert($_.valid(A) && $_.valid(Q)));
        },
        replace: function(A, Q) {
            if ((Jd.assert($_.valid(A) && (Q === null || $_.valid(Q))), Q !== null)) $_.insertBefore(Q, A);
            ($_.remove(A), Jd.assert($_.valid(A) && (Q === null || $_.valid(Q))));
        },
        remove: function(A) {
            Jd.assert($_.valid(A));
            var Q = A._previousSibling;
            if (Q === A) return;
            var B = A._nextSibling;
            ((Q._nextSibling = B), (B._previousSibling = Q), (A._previousSibling = A._nextSibling = A), Jd.assert($_.valid(A)));
        }
    });
});
