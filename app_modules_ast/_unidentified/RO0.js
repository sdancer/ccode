// Module: RO0
// Type: U
// Lines: 498587-498788
//
var RO0 = U((D0J, bZ9)=>{
    var nV = IFA(), p37 = MO0(), ND = (bZ9.exports = function(A, Q) {
        ((this._options = A), (A.checkCRC = A.checkCRC !== !1), (this._hasIHDR = !1), (this._hasIEND = !1), (this._emittedHeadersFinished = !1), (this._palette = []), (this._colorType = 0), (this._chunks = {}), (this._chunks[nV.TYPE_IHDR] = this._handleIHDR.bind(this)), (this._chunks[nV.TYPE_IEND] = this._handleIEND.bind(this)), (this._chunks[nV.TYPE_IDAT] = this._handleIDAT.bind(this)), (this._chunks[nV.TYPE_PLTE] = this._handlePLTE.bind(this)), (this._chunks[nV.TYPE_tRNS] = this._handleTRNS.bind(this)), (this._chunks[nV.TYPE_gAMA] = this._handleGAMA.bind(this)), (this.read = Q.read), (this.error = Q.error), (this.metadata = Q.metadata), (this.gamma = Q.gamma), (this.transColor = Q.transColor), (this.palette = Q.palette), (this.parsed = Q.parsed), (this.inflateData = Q.inflateData), (this.finished = Q.finished), (this.simpleTransparency = Q.simpleTransparency), (this.headersFinished = Q.headersFinished || function() {}));
    });
    ND.prototype.start = function() {
        this.read(nV.PNG_SIGNATURE.length, this._parseSignature.bind(this));
    };
    ND.prototype._parseSignature = function(A) {
        let Q = nV.PNG_SIGNATURE;
        for(let B = 0; B < Q.length; B++)if (A[B] !== Q[B]) {
            this.error(Error("Invalid file signature"));
            return;
        }
        this.read(8, this._parseChunkBegin.bind(this));
    };
    ND.prototype._parseChunkBegin = function(A) {
        let Q = A.readUInt32BE(0), B = A.readUInt32BE(4), G = "";
        for(let Y = 4; Y < 8; Y++)G += String.fromCharCode(A[Y]);
        let Z = Boolean(A[4] & 32);
        if (!this._hasIHDR && B !== nV.TYPE_IHDR) {
            this.error(Error("Expected IHDR on beggining"));
            return;
        }
        if (((this._crc = new p37()), this._crc.write(Buffer.from(G)), this._chunks[B])) return this._chunks[B](Q);
        if (!Z) {
            this.error(Error("Unsupported critical chunk type " + G));
            return;
        }
        this.read(Q + 4, this._skipChunk.bind(this));
    };
    ND.prototype._skipChunk = function() {
        this.read(8, this._parseChunkBegin.bind(this));
    };
    ND.prototype._handleChunkEnd = function() {
        this.read(4, this._parseChunkEnd.bind(this));
    };
    ND.prototype._parseChunkEnd = function(A) {
        let Q = A.readInt32BE(0), B = this._crc.crc32();
        if (this._options.checkCRC && B !== Q) {
            this.error(Error("Crc error - " + Q + " - " + B));
            return;
        }
        if (!this._hasIEND) this.read(8, this._parseChunkBegin.bind(this));
    };
    ND.prototype._handleIHDR = function(A) {
        this.read(A, this._parseIHDR.bind(this));
    };
    ND.prototype._parseIHDR = function(A) {
        this._crc.write(A);
        let Q = A.readUInt32BE(0), B = A.readUInt32BE(4), G = A[8], Z = A[9], Y = A[10], J = A[11], X = A[12];
        if (G !== 8 && G !== 4 && G !== 2 && G !== 1 && G !== 16) {
            this.error(Error("Unsupported bit depth " + G));
            return;
        }
        if (!(Z in nV.COLORTYPE_TO_BPP_MAP)) {
            this.error(Error("Unsupported color type"));
            return;
        }
        if (Y !== 0) {
            this.error(Error("Unsupported compression method"));
            return;
        }
        if (J !== 0) {
            this.error(Error("Unsupported filter method"));
            return;
        }
        if (X !== 0 && X !== 1) {
            this.error(Error("Unsupported interlace method"));
            return;
        }
        this._colorType = Z;
        let I = nV.COLORTYPE_TO_BPP_MAP[this._colorType];
        ((this._hasIHDR = !0), this.metadata({
            width: Q,
            height: B,
            depth: G,
            interlace: Boolean(X),
            palette: Boolean(Z & nV.COLORTYPE_PALETTE),
            color: Boolean(Z & nV.COLORTYPE_COLOR),
            alpha: Boolean(Z & nV.COLORTYPE_ALPHA),
            bpp: I,
            colorType: Z
        }), this._handleChunkEnd());
    };
    ND.prototype._handlePLTE = function(A) {
        this.read(A, this._parsePLTE.bind(this));
    };
    ND.prototype._parsePLTE = function(A) {
        this._crc.write(A);
        let Q = Math.floor(A.length / 3);
        for(let B = 0; B < Q; B++)this._palette.push([
            A[B * 3],
            A[B * 3 + 1],
            A[B * 3 + 2],
            255
        ]);
        (this.palette(this._palette), this._handleChunkEnd());
    };
    ND.prototype._handleTRNS = function(A) {
        (this.simpleTransparency(), this.read(A, this._parseTRNS.bind(this)));
    };
    ND.prototype._parseTRNS = function(A) {
        if ((this._crc.write(A), this._colorType === nV.COLORTYPE_PALETTE_COLOR)) {
            if (this._palette.length === 0) {
                this.error(Error("Transparency chunk must be after palette"));
                return;
            }
            if (A.length > this._palette.length) {
                this.error(Error("More transparent colors than palette size"));
                return;
            }
            for(let Q = 0; Q < A.length; Q++)this._palette[Q][3] = A[Q];
            this.palette(this._palette);
        }
        if (this._colorType === nV.COLORTYPE_GRAYSCALE) this.transColor([
            A.readUInt16BE(0)
        ]);
        if (this._colorType === nV.COLORTYPE_COLOR) this.transColor([
            A.readUInt16BE(0),
            A.readUInt16BE(2),
            A.readUInt16BE(4)
        ]);
        this._handleChunkEnd();
    };
    ND.prototype._handleGAMA = function(A) {
        this.read(A, this._parseGAMA.bind(this));
    };
    ND.prototype._parseGAMA = function(A) {
        (this._crc.write(A), this.gamma(A.readUInt32BE(0) / nV.GAMMA_DIVISION), this._handleChunkEnd());
    };
    ND.prototype._handleIDAT = function(A) {
        if (!this._emittedHeadersFinished) ((this._emittedHeadersFinished = !0), this.headersFinished());
        this.read(-A, this._parseIDAT.bind(this, A));
    };
    ND.prototype._parseIDAT = function(A, Q) {
        if ((this._crc.write(Q), this._colorType === nV.COLORTYPE_PALETTE_COLOR && this._palette.length === 0)) throw Error("Expected palette not found");
        this.inflateData(Q);
        let B = A - Q.length;
        if (B > 0) this._handleIDAT(B);
        else this._handleChunkEnd();
    };
    ND.prototype._handleIEND = function(A) {
        this.read(A, this._parseIEND.bind(this));
    };
    ND.prototype._parseIEND = function(A) {
        if ((this._crc.write(A), (this._hasIEND = !0), this._handleChunkEnd(), this.finished)) this.finished();
    };
});
