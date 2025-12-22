// Module: PF0
// Type: U
// Lines: 402485-402523
//
var PF0 = U((zlZ, hR2)=>{
    hR2.exports = TF0;
    var KK5 = lF(), bR2 = mxA();
    function TF0(A, Q) {
        (bR2.call(this), (this.nodeType = KK5.COMMENT_NODE), (this.ownerDocument = A), (this._data = Q));
    }
    var cxA = {
        get: function() {
            return this._data;
        },
        set: function(A) {
            if (A === null || A === void 0) A = "";
            else A = String(A);
            if (((this._data = A), this.rooted)) this.ownerDocument.mutateValue(this);
        }
    };
    TF0.prototype = Object.create(bR2.prototype, {
        nodeName: {
            value: "#comment"
        },
        nodeValue: cxA,
        textContent: cxA,
        innerText: cxA,
        data: {
            get: cxA.get,
            set: function(A) {
                cxA.set.call(this, A === null ? "" : String(A));
            }
        },
        clone: {
            value: function() {
                return new TF0(this.ownerDocument, this._data);
            }
        }
    });
});
