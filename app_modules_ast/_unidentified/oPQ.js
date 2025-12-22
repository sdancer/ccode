// Module: oPQ
// Type: U
// Lines: 115369-115404
//
var oPQ = U(($o7, aPQ)=>{
    var { kFree: Ni6, kConnected: Li6, kPending: Oi6, kQueued: Mi6, kRunning: Ri6, kSize: _i6 } = nJ(), OAA = Symbol("pool");
    class nPQ {
        constructor(A){
            this[OAA] = A;
        }
        get connected() {
            return this[OAA][Li6];
        }
        get free() {
            return this[OAA][Ni6];
        }
        get pending() {
            return this[OAA][Oi6];
        }
        get queued() {
            return this[OAA][Mi6];
        }
        get running() {
            return this[OAA][Ri6];
        }
        get size() {
            return this[OAA][_i6];
        }
    }
    aPQ.exports = nPQ;
});
