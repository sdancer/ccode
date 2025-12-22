// Module: cmA
// Type: U
// Lines: 55624-55661
//
var cmA = U((QQQ)=>{
    Object.defineProperty(QQQ, "__esModule", {
        value: !0
    });
    QQQ.StableID = void 0;
    var XB4 = jzA(), IB4 = OE(), e0Q = eb(), WB4 = renderElement(), dmA = {};
    QQQ.StableID = {
        get: (A)=>{
            if (dmA[A] == null) {
                let Q = KB4(A);
                if (Q == null) ((Q = (0, WB4.getUUID)()), t0Q(Q, A));
                dmA[A] = Q;
            }
            return dmA[A];
        },
        setOverride: (A, Q)=>{
            ((dmA[Q] = A), t0Q(A, Q));
        }
    };
    function AQQ(A) {
        return `statsig.stable_id.${(0, XB4._getStorageKey)(A)}`;
    }
    function t0Q(A, Q) {
        let B = AQQ(Q);
        try {
            (0, e0Q._setObjectInStorage)(B, A);
        } catch (G) {
            IB4.Log.warn("Failed to save StableID");
        }
    }
    function KB4(A) {
        let Q = AQQ(A);
        return (0, e0Q._getObjectFromStorage)(Q);
    }
});
