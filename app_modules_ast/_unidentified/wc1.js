// Module: wc1
// Type: L
// Lines: 169806-169867
//
var pushViewTransitionAttributes = L(()=>{
    qd1();
    g1();
    createRenderState();
    om1();
});
class Dg {
    type;
    timeStamp;
    bubbles;
    cancelable;
    _target = null;
    _currentTarget = null;
    _eventPhase = "none";
    _propagationStopped = !1;
    _immediatePropagationStopped = !1;
    _defaultPrevented = !1;
    constructor(A, Q = {}){
        ((this.type = A), (this.timeStamp = Date.now()), (this.bubbles = Q.bubbles ?? !0), (this.cancelable = Q.cancelable ?? !0));
    }
    get target() {
        return this._target;
    }
    get currentTarget() {
        return this._currentTarget;
    }
    get eventPhase() {
        return this._eventPhase;
    }
    get defaultPrevented() {
        return this._defaultPrevented;
    }
    stopPropagation() {
        this._propagationStopped = !0;
    }
    stopImmediatePropagation() {
        ((this._propagationStopped = !0), (this._immediatePropagationStopped = !0));
    }
    preventDefault() {
        if (this.cancelable) this._defaultPrevented = !0;
    }
    _setTarget(A) {
        this._target = A;
    }
    _setCurrentTarget(A) {
        this._currentTarget = A;
    }
    _setEventPhase(A) {
        this._eventPhase = A;
    }
    _isPropagationStopped() {
        return this._propagationStopped;
    }
    _isImmediatePropagationStopped() {
        return this._immediatePropagationStopped;
    }
}
var PsA;
