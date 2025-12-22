// Module: Cf1
// Type: U
// Lines: 110657-110736
//
var Cf1 = U((ra7, vjQ)=>{
    var p7A = 0, Kf1 = 1000, Vf1 = (Kf1 >> 1) - 1, fh, Hf1 = Symbol("kFastTimer"), bh = [], Df1 = -2, Ff1 = -1, yjQ = 0, SjQ = 1;
    function Ef1() {
        p7A += Vf1;
        let A = 0, Q = bh.length;
        while(A < Q){
            let B = bh[A];
            if (B._state === yjQ) ((B._idleStart = p7A - Vf1), (B._state = SjQ));
            else if (B._state === SjQ && p7A >= B._idleStart + B._idleTimeout) ((B._state = Ff1), (B._idleStart = -1), B._onTimeout(B._timerArg));
            if (B._state === Ff1) {
                if (((B._state = Df1), --Q !== 0)) bh[A] = bh[Q];
            } else ++A;
        }
        if (((bh.length = Q), bh.length !== 0)) xjQ();
    }
    function xjQ() {
        if (fh) fh.refresh();
        else if ((clearTimeout(fh), (fh = setTimeout(Ef1, Vf1)), fh.unref)) fh.unref();
    }
    class zf1 {
        [Hf1] = !0;
        _state = Df1;
        _idleTimeout = -1;
        _idleStart = -1;
        _onTimeout;
        _timerArg;
        constructor(A, Q, B){
            ((this._onTimeout = A), (this._idleTimeout = Q), (this._timerArg = B), this.refresh());
        }
        refresh() {
            if (this._state === Df1) bh.push(this);
            if (!fh || bh.length === 1) xjQ();
            this._state = yjQ;
        }
        clear() {
            ((this._state = Ff1), (this._idleStart = -1));
        }
    }
    vjQ.exports = {
        setTimeout (A, Q, B) {
            return Q <= Kf1 ? setTimeout(A, Q, B) : new zf1(A, Q, B);
        },
        clearTimeout (A) {
            if (A[Hf1]) A.clear();
            else clearTimeout(A);
        },
        setFastTimeout (A, Q, B) {
            return new zf1(A, Q, B);
        },
        clearFastTimeout (A) {
            A.clear();
        },
        now () {
            return p7A;
        },
        tick (A = 0) {
            ((p7A += A - Kf1 + 1), Ef1(), Ef1());
        },
        reset () {
            ((p7A = 0), (bh.length = 0), clearTimeout(fh), (fh = null));
        },
        kFastTimer: Hf1
    };
});
