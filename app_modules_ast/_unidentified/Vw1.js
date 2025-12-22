// Module: Vw1
// Type: U
// Lines: 50496-50518
//
var Vw1 = U((Gx7, et0)=>{
    et0.exports = VA4;
    function VA4(A, Q) {
        var B = !Array.isArray(A), G = {
            index: 0,
            keyedList: B || Q ? Object.keys(A) : null,
            jobs: {},
            results: B ? {} : [],
            size: B ? Object.keys(A).length : A.length
        };
        if (Q) G.keyedList.sort(B ? Q : function(Z, Y) {
            return Q(A[Z], A[Y]);
        });
        return G;
    }
});
