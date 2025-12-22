// Module: vJ1
// Type: U
// Lines: 400169-400232
//
var vJ1 = U((ZlZ, tM2)=>{
    tM2.exports = sM2;
    var rM2 = lF(), qW5 = q9A();
    function sM2() {
        (rM2.call(this), (this._firstChild = this._childNodes = null));
    }
    sM2.prototype = Object.create(rM2.prototype, {
        hasChildNodes: {
            value: function() {
                if (this._childNodes) return this._childNodes.length > 0;
                return this._firstChild !== null;
            }
        },
        childNodes: {
            get: function() {
                return (this._ensureChildNodes(), this._childNodes);
            }
        },
        firstChild: {
            get: function() {
                if (this._childNodes) return this._childNodes.length === 0 ? null : this._childNodes[0];
                return this._firstChild;
            }
        },
        lastChild: {
            get: function() {
                var A = this._childNodes, Q;
                if (A) return A.length === 0 ? null : A[A.length - 1];
                if (((Q = this._firstChild), Q === null)) return null;
                return Q._previousSibling;
            }
        },
        _ensureChildNodes: {
            value: function() {
                if (this._childNodes) return;
                var A = this._firstChild, Q = A, B = (this._childNodes = new qW5());
                if (A) do (B.push(Q), (Q = Q._nextSibling));
                while (Q !== A)
                this._firstChild = null;
            }
        },
        removeChildren: {
            value: function() {
                var Q = this.rooted ? this.ownerDocument : null, B = this.firstChild, G;
                while(B !== null){
                    if (((G = B), (B = G.nextSibling), Q)) Q.mutateRemove(G);
                    G.parentNode = null;
                }
                if (this._childNodes) this._childNodes.length = 0;
                else this._firstChild = null;
                this.modify();
            }
        }
    });
});
