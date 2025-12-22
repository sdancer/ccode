// Module: s70
// Type: U
// Lines: 312801-312816
//
var s70 = U((zYZ, j12)=>{
    j12.exports = function(Q, B) {
        return ((B = B || Object.create(null)), [
            Q,
            B
        ].reduce((G, Z)=>{
            return (Object.keys(Z).forEach((Y)=>{
                G[Y] = Z[Y];
            }), G);
        }, Object.create(null)));
    };
});
