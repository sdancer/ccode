// Module: omA
// Type: U
// Lines: 56466-56549
//
var omA = U((iQQ)=>{
    Object.defineProperty(iQQ, "__esModule", {
        value: !0
    });
    iQQ.StatsigSession = iQQ.SessionID = void 0;
    var mB4 = jzA(), dB4 = OE(), mQQ = eb(), dQQ = renderElement(), cQQ = 1800000, pQQ = 14400000, amA = {};
    iQQ.SessionID = {
        get: (A)=>{
            return iQQ.StatsigSession.get(A).data.sessionID;
        }
    };
    iQQ.StatsigSession = {
        get: (A)=>{
            if (amA[A] == null) amA[A] = cB4(A);
            let Q = amA[A];
            return lB4(Q);
        },
        overrideInitialSessionID: (A, Q)=>{
            amA[Q] = pB4(A, Q);
        }
    };
    function cB4(A) {
        let Q = oB4(A), B = Date.now();
        if (!Q) Q = {
            sessionID: (0, dQQ.getUUID)(),
            startTime: B,
            lastUpdate: B
        };
        return {
            data: Q,
            sdkKey: A
        };
    }
    function pB4(A, Q) {
        let B = Date.now();
        return {
            data: {
                sessionID: A,
                startTime: B,
                lastUpdate: B
            },
            sdkKey: Q
        };
    }
    function lB4(A) {
        let Q = Date.now(), B = A.data;
        if (iB4(B) || nB4(B)) ((B.sessionID = (0, dQQ.getUUID)()), (B.startTime = Q));
        ((B.lastUpdate = Q), aB4(B, A.sdkKey), clearTimeout(A.idleTimeoutID), clearTimeout(A.ageTimeoutID));
        let G = Q - B.startTime, Z = A.sdkKey;
        return ((A.idleTimeoutID = uQQ(Z, cQQ)), (A.ageTimeoutID = uQQ(Z, pQQ - G)), A);
    }
    function uQQ(A, Q) {
        return setTimeout(()=>{
            let B = __STATSIG__ === null || __STATSIG__ === void 0 ? void 0 : __STATSIG__.instance(A);
            if (B) B.$emt({
                name: "session_expired"
            });
        }, Q);
    }
    function iB4({ lastUpdate: A }) {
        return Date.now() - A > cQQ;
    }
    function nB4({ startTime: A }) {
        return Date.now() - A > pQQ;
    }
    function lQQ(A) {
        return `statsig.session_id.${(0, mB4._getStorageKey)(A)}`;
    }
    function aB4(A, Q) {
        let B = lQQ(Q);
        try {
            (0, mQQ._setObjectInStorage)(B, A);
        } catch (G) {
            dB4.Log.warn("Failed to save SessionID");
        }
    }
    function oB4(A) {
        let Q = lQQ(A);
        return (0, mQQ._getObjectFromStorage)(Q);
    }
});
