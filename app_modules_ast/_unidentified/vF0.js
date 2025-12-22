// Module: vF0
// Type: U
// Lines: 402589-402637
//
var vF0 = U(($lZ, cR2)=>{
    cR2.exports = xF0;
    var FK5 = lF(), dR2 = mxA();
    function xF0(A, Q, B) {
        (dR2.call(this), (this.nodeType = FK5.PROCESSING_INSTRUCTION_NODE), (this.ownerDocument = A), (this.target = Q), (this._data = B));
    }
    var pxA = {
        get: function() {
            return this._data;
        },
        set: function(A) {
            if (A === null || A === void 0) A = "";
            else A = String(A);
            if (((this._data = A), this.rooted)) this.ownerDocument.mutateValue(this);
        }
    };
    xF0.prototype = Object.create(dR2.prototype, {
        nodeName: {
            get: function() {
                return this.target;
            }
        },
        nodeValue: pxA,
        textContent: pxA,
        innerText: pxA,
        data: {
            get: pxA.get,
            set: function(A) {
                pxA.set.call(this, A === null ? "" : String(A));
            }
        },
        clone: {
            value: function() {
                return new xF0(this.ownerDocument, this.target, this._data);
            }
        },
        isEqual: {
            value: function(Q) {
                return this.target === Q.target && this._data === Q._data;
            }
        }
    });
});
