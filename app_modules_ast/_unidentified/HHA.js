// Module: HHA
// Type: U
// Lines: 398914-398972
//
var HHA = U((lpZ, qM2)=>{
    qM2.exports = $9A;
    $9A.CAPTURING_PHASE = 1;
    $9A.AT_TARGET = 2;
    $9A.BUBBLING_PHASE = 3;
    function $9A(A, Q) {
        if (((this.type = ""), (this.target = null), (this.currentTarget = null), (this.eventPhase = $9A.AT_TARGET), (this.bubbles = !1), (this.cancelable = !1), (this.isTrusted = !1), (this.defaultPrevented = !1), (this.timeStamp = Date.now()), (this._propagationStopped = !1), (this._immediatePropagationStopped = !1), (this._initialized = !0), (this._dispatching = !1), A)) this.type = A;
        if (Q) for(var B in Q)this[B] = Q[B];
    }
    $9A.prototype = Object.create(Object.prototype, {
        constructor: {
            value: $9A
        },
        stopPropagation: {
            value: function() {
                this._propagationStopped = !0;
            }
        },
        stopImmediatePropagation: {
            value: function() {
                ((this._propagationStopped = !0), (this._immediatePropagationStopped = !0));
            }
        },
        preventDefault: {
            value: function() {
                if (this.cancelable) this.defaultPrevented = !0;
            }
        },
        initEvent: {
            value: function(Q, B, G) {
                if (((this._initialized = !0), this._dispatching)) return;
                ((this._propagationStopped = !1), (this._immediatePropagationStopped = !1), (this.defaultPrevented = !1), (this.isTrusted = !1), (this.target = null), (this.type = Q), (this.bubbles = B), (this.cancelable = G));
            }
        }
    });
});
