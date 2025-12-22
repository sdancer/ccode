// Module: bt0
// Type: U
// Lines: 45902-46056
//
var createChildReconciler = U((oy7, ft0)=>{
    var ie9 = qA("util"), kt0 = qA("stream").Stream, vt0 = xt0();
    ft0.exports = YI;
    function YI() {
        ((this.writable = !1), (this.readable = !0), (this.dataSize = 0), (this.maxDataSize = 2097152), (this.pauseStreams = !0), (this._released = !1), (this._streams = []), (this._currentStream = null), (this._insideLoop = !1), (this._pendingNext = !1));
    }
    ie9.inherits(YI, kt0);
    YI.create = function(A) {
        var Q = new this();
        A = A || {};
        for(var B in A)Q[B] = A[B];
        return Q;
    };
    YI.isStreamLike = function(A) {
        return (typeof A !== "function" && typeof A !== "string" && typeof A !== "boolean" && typeof A !== "number" && !Buffer.isBuffer(A));
    };
    YI.prototype.append = function(A) {
        var Q = YI.isStreamLike(A);
        if (Q) {
            if (!(A instanceof vt0)) {
                var B = vt0.create(A, {
                    maxDataSize: 1 / 0,
                    pauseStream: this.pauseStreams
                });
                (A.on("data", this._checkDataSize.bind(this)), (A = B));
            }
            if ((this._handleErrors(A), this.pauseStreams)) A.pause();
        }
        return (this._streams.push(A), this);
    };
    YI.prototype.pipe = function(A, Q) {
        return (kt0.prototype.pipe.call(this, A, Q), this.resume(), A);
    };
    YI.prototype._getNext = function() {
        if (((this._currentStream = null), this._insideLoop)) {
            this._pendingNext = !0;
            return;
        }
        this._insideLoop = !0;
        try {
            do ((this._pendingNext = !1), this._realGetNext());
            while (this._pendingNext)
        } finally{
            this._insideLoop = !1;
        }
    };
    YI.prototype._realGetNext = function() {
        var A = this._streams.shift();
        if (typeof A > "u") {
            this.end();
            return;
        }
        if (typeof A !== "function") {
            this._pipeNext(A);
            return;
        }
        var Q = A;
        Q(function(B) {
            var G = YI.isStreamLike(B);
            if (G) (B.on("data", this._checkDataSize.bind(this)), this._handleErrors(B));
            this._pipeNext(B);
        }.bind(this));
    };
    YI.prototype._pipeNext = function(A) {
        this._currentStream = A;
        var Q = YI.isStreamLike(A);
        if (Q) {
            (A.on("end", this._getNext.bind(this)), A.pipe(this, {
                end: !1
            }));
            return;
        }
        var B = A;
        (this.write(B), this._getNext());
    };
    YI.prototype._handleErrors = function(A) {
        var Q = this;
        A.on("error", function(B) {
            Q._emitError(B);
        });
    };
    YI.prototype.write = function(A) {
        this.emit("data", A);
    };
    YI.prototype.pause = function() {
        if (!this.pauseStreams) return;
        if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function") this._currentStream.pause();
        this.emit("pause");
    };
    YI.prototype.resume = function() {
        if (!this._released) ((this._released = !0), (this.writable = !0), this._getNext());
        if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function") this._currentStream.resume();
        this.emit("resume");
    };
    YI.prototype.end = function() {
        (this._reset(), this.emit("end"));
    };
    YI.prototype.destroy = function() {
        (this._reset(), this.emit("close"));
    };
    YI.prototype._reset = function() {
        ((this.writable = !1), (this._streams = []), (this._currentStream = null));
    };
    YI.prototype._checkDataSize = function() {
        if ((this._updateDataSize(), this.dataSize <= this.maxDataSize)) return;
        var A = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
        this._emitError(Error(A));
    };
    YI.prototype._updateDataSize = function() {
        this.dataSize = 0;
        var A = this;
        if ((this._streams.forEach(function(Q) {
            if (!Q.dataSize) return;
            A.dataSize += Q.dataSize;
        }), this._currentStream && this._currentStream.dataSize)) this.dataSize += this._currentStream.dataSize;
    };
    YI.prototype._emitError = function(A) {
        (this._reset(), this.emit("error", A));
    };
});
