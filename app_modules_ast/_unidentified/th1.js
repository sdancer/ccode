// Module: th1
// Type: U
// Lines: 126742-126768
//
var createRenderState = U((ygQ)=>{
    Object.defineProperty(ygQ, "__esModule", {
        value: !0
    });
    ygQ.baggageEntryMetadataFromString = ygQ.createBaggage = void 0;
    var lQ8 = createChildReconciler(), iQ8 = jgQ(), nQ8 = SgQ(), aQ8 = lQ8.DiagAPI.instance();
    function oQ8(A = {}) {
        return new iQ8.BaggageImpl(new Map(Object.entries(A)));
    }
    ygQ.createBaggage = oQ8;
    function rQ8(A) {
        if (typeof A !== "string") (aQ8.error(`Cannot create baggage metadata from unknown type: ${typeof A}`), (A = ""));
        return {
            __TYPE__: nQ8.baggageEntryMetadataSymbol,
            toString () {
                return A;
            }
        };
    }
    ygQ.baggageEntryMetadataFromString = rQ8;
});
