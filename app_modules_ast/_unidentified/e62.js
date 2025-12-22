// Module: e62
// Type: U
// Lines: 327200-327236
//
var e62 = U((_HZ, t62)=>{
    t62.exports = i51;
    function i51() {
        this._listeners = {};
    }
    i51.prototype.on = function(Q, B, G) {
        return ((this._listeners[Q] || (this._listeners[Q] = [])).push({
            fn: B,
            ctx: G || this
        }), this);
    };
    i51.prototype.off = function(Q, B) {
        if (Q === void 0) this._listeners = {};
        else if (B === void 0) this._listeners[Q] = [];
        else {
            var G = this._listeners[Q];
            for(var Z = 0; Z < G.length;)if (G[Z].fn === B) G.splice(Z, 1);
            else ++Z;
        }
        return this;
    };
    i51.prototype.emit = function(Q) {
        var B = this._listeners[Q];
        if (B) {
            var G = [], Z = 1;
            for(; Z < arguments.length;)G.push(arguments[Z++]);
            for(Z = 0; Z < B.length;)B[Z].fn.apply(B[Z++].ctx, G);
        }
        return this;
    };
});
