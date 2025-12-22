// Module: QZ9
// Type: U
// Lines: 497484-497507
//
var QZ9 = U((n1J, AZ9)=>{
    var eG9 = tG9();
    function eL0(A) {
        if (((this.genPoly = void 0), (this.degree = A), this.degree)) this.initialize(this.degree);
    }
    eL0.prototype.initialize = function(Q) {
        ((this.degree = Q), (this.genPoly = eG9.generateECPolynomial(this.degree)));
    };
    eL0.prototype.encode = function(Q) {
        if (!this.genPoly) throw Error("Encoder not initialized");
        let B = new Uint8Array(Q.length + this.degree);
        B.set(Q);
        let G = eG9.mod(B, this.genPoly), Z = this.degree - G.length;
        if (Z > 0) {
            let Y = new Uint8Array(this.degree);
            return (Y.set(G, Z), Y);
        }
        return G;
    };
    AZ9.exports = eL0;
});
