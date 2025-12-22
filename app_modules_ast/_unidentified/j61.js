// Module: j61
// Type: U
// Lines: 276228-276252
//
var j61 = U((ABZ, vpB)=>{
    vpB.exports = {
        indexOf: function(A, Q) {
            var B, G;
            if (Array.prototype.indexOf) return A.indexOf(Q);
            for(B = 0, G = A.length; B < G; B++)if (A[B] === Q) return B;
            return -1;
        },
        forEach: function(A, Q, B) {
            var G, Z;
            if (Array.prototype.forEach) return A.forEach(Q, B);
            for(G = 0, Z = A.length; G < Z; G++)Q.call(B, A[G], G, A);
        },
        trim: function(A) {
            if (String.prototype.trim) return A.trim();
            return A.replace(/(^\s*)|(\s*$)/g, "");
        },
        spaceIndex: function(A) {
            var Q = /\s|\n|\t/, B = Q.exec(A);
            return B ? B.index : -1;
        }
    };
});
