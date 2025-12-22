// Module: TZ1
// Type: U
// Lines: 373186-373207
//
var TZ1 = U((Bz2, Gz2)=>{
    (function() {
        var A, Q;
        ((Q = oW0()), (Gz2.exports = A = class extends Q {
            constructor(G){
                super(G);
            }
            document(G, Z) {
                var Y, J, X, I, W;
                ((Z = this.filterOptions(Z)), (I = ""), (W = G.children));
                for(J = 0, X = W.length; J < X; J++)((Y = W[J]), (I += this.writeChildNode(Y, Z, 0)));
                if (Z.pretty && I.slice(-Z.newline.length) === Z.newline) I = I.slice(0, -Z.newline.length);
                return I;
            }
        }));
    }).call(Bz2);
});
