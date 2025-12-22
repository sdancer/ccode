// Module: m42
// Type: U
// Lines: 326282-326314
//
var m42 = U((g42)=>{
    Object.defineProperty(g42, "__esModule", {
        value: !0
    });
    g42.MeterProviderSharedState = void 0;
    var hu3 = hP(), gu3 = $92(), uu3 = b42(), mu3 = fPA();
    class h42 {
        resource;
        viewRegistry = new gu3.ViewRegistry();
        metricCollectors = [];
        meterSharedStates = new Map();
        constructor(A){
            this.resource = A;
        }
        getMeterSharedState(A) {
            let Q = (0, hu3.instrumentationScopeId)(A), B = this.meterSharedStates.get(Q);
            if (B == null) ((B = new uu3.MeterSharedState(this, A)), this.meterSharedStates.set(Q, B));
            return B;
        }
        selectAggregations(A) {
            let Q = [];
            for (let B of this.metricCollectors)Q.push([
                B,
                (0, mu3.toAggregation)(B.selectAggregation(A))
            ]);
            return Q;
        }
    }
    g42.MeterProviderSharedState = h42;
});
