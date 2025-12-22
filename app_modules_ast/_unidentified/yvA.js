// Module: yvA
// Type: U
// Lines: 431179-431214
//
var renderElement = U((lk2)=>{
    Object.defineProperty(lk2, "__esModule", {
        value: !0
    });
    var bI1 = FQ(), BR5 = sK();
    function pk2() {
        return bI1.getGlobalSingleton("globalEventProcessors", ()=>[]);
    }
    function GR5(A) {
        pk2().push(A);
    }
    function NC0(A, Q, B, G = 0) {
        return new bI1.SyncPromise((Z, Y)=>{
            let J = A[G];
            if (Q === null || typeof J !== "function") Z(Q);
            else {
                let X = J({
                    ...Q
                }, B);
                if ((BR5.DEBUG_BUILD && J.id && X === null && bI1.logger.log(`Event processor "${J.id}" dropped event`), bI1.isThenable(X))) X.then((I)=>NC0(A, I, B, G + 1).then(Z)).then(null, Y);
                else NC0(A, X, B, G + 1).then(Z).then(null, Y);
            }
        });
    }
    lk2.addGlobalEventProcessor = GR5;
    lk2.getGlobalEventProcessors = pk2;
    lk2.notifyEventProcessors = NC0;
});
