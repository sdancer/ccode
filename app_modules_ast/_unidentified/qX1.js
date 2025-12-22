// Module: qX1
// Type: U
// Lines: 417073-417097
//
var qX1 = U((CnZ, xT2)=>{
    var TE0 = createRenderState();
    xT2.exports = {
        Validation: yT2(iH5),
        MissingRef: yT2(PE0)
    };
    function iH5(A) {
        ((this.message = "validation failed"), (this.errors = A), (this.ajv = this.validation = !0));
    }
    PE0.message = function(A, Q) {
        return "can't resolve reference " + Q + " from id " + A;
    };
    function PE0(A, Q, B) {
        ((this.message = B || PE0.message(A, Q)), (this.missingRef = TE0.url(A, Q)), (this.missingSchema = TE0.normalizeId(TE0.fullPath(this.missingRef))));
    }
    function yT2(A) {
        return ((A.prototype = Object.create(Error.prototype)), (A.prototype.constructor = A), A);
    }
});
