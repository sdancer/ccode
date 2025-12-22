// Module: mD2
// Type: L
// Lines: 365683-365748
//
var mD2 = L(()=>{
    R5();
    aQ();
    AZ1 = l(React runtime(), 1);
});
class EVA {
    activeOperations = new Set();
    lastUserActivityTime = 0;
    lastCLIRecordedTime = Date.now();
    isCLIActive = !1;
    USER_ACTIVITY_TIMEOUT_MS = 5000;
    static instance = null;
    static getInstance() {
        if (!EVA.instance) EVA.instance = new EVA();
        return EVA.instance;
    }
    recordUserActivity() {
        if (!this.isCLIActive && this.lastUserActivityTime !== 0) {
            let Q = (Date.now() - this.lastUserActivityTime) / 1000;
            if (Q > 0) {
                let B = _E1();
                if (B) {
                    let G = this.USER_ACTIVITY_TIMEOUT_MS / 1000;
                    if (Q < G) B.add(Q, {
                        type: "user"
                    });
                }
            }
        }
        this.lastUserActivityTime = Date.now();
    }
    startCLIActivity(A) {
        if (this.activeOperations.has(A)) this.endCLIActivity(A);
        let Q = this.activeOperations.size === 0;
        if ((this.activeOperations.add(A), Q)) ((this.isCLIActive = !0), (this.lastCLIRecordedTime = Date.now()));
    }
    endCLIActivity(A) {
        if ((this.activeOperations.delete(A), this.activeOperations.size === 0)) {
            let Q = Date.now(), B = (Q - this.lastCLIRecordedTime) / 1000;
            if (B > 0) {
                let G = _E1();
                if (G) G.add(B, {
                    type: "cli"
                });
            }
            ((this.lastCLIRecordedTime = Q), (this.isCLIActive = !1));
        }
    }
    async trackOperation(A, Q) {
        this.startCLIActivity(A);
        try {
            return await Q();
        } finally{
            this.endCLIActivity(A);
        }
    }
    getActivityStates() {
        return {
            isUserActive: (Date.now() - this.lastUserActivityTime) / 1000 < this.USER_ACTIVITY_TIMEOUT_MS / 1000,
            isCLIActive: this.isCLIActive,
            activeOperationCount: this.activeOperations.size
        };
    }
}
var rSA;
