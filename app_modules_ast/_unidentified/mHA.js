// Module: mHA
// Type: U
// Lines: 431214-431294
//
var createRenderState = U((ik2)=>{
    Object.defineProperty(ik2, "__esModule", {
        value: !0
    });
    var xvA = FQ();
    function XR5(A) {
        let Q = xvA.timestampInSeconds(), B = {
            sid: xvA.uuid4(),
            init: !0,
            timestamp: Q,
            started: Q,
            duration: 0,
            status: "ok",
            errors: 0,
            ignoreDuration: !1,
            toJSON: ()=>WR5(B)
        };
        if (A) LC0(B, A);
        return B;
    }
    function LC0(A, Q = {}) {
        if (Q.user) {
            if (!A.ipAddress && Q.user.ip_address) A.ipAddress = Q.user.ip_address;
            if (!A.did && !Q.did) A.did = Q.user.id || Q.user.email || Q.user.username;
        }
        if (((A.timestamp = Q.timestamp || xvA.timestampInSeconds()), Q.abnormal_mechanism)) A.abnormal_mechanism = Q.abnormal_mechanism;
        if (Q.ignoreDuration) A.ignoreDuration = Q.ignoreDuration;
        if (Q.sid) A.sid = Q.sid.length === 32 ? Q.sid : xvA.uuid4();
        if (Q.init !== void 0) A.init = Q.init;
        if (!A.did && Q.did) A.did = `${Q.did}`;
        if (typeof Q.started === "number") A.started = Q.started;
        if (A.ignoreDuration) A.duration = void 0;
        else if (typeof Q.duration === "number") A.duration = Q.duration;
        else {
            let B = A.timestamp - A.started;
            A.duration = B >= 0 ? B : 0;
        }
        if (Q.release) A.release = Q.release;
        if (Q.environment) A.environment = Q.environment;
        if (!A.ipAddress && Q.ipAddress) A.ipAddress = Q.ipAddress;
        if (!A.userAgent && Q.userAgent) A.userAgent = Q.userAgent;
        if (typeof Q.errors === "number") A.errors = Q.errors;
        if (Q.status) A.status = Q.status;
    }
    function IR5(A, Q) {
        let B = {};
        if (Q) B = {
            status: Q
        };
        else if (A.status === "ok") B = {
            status: "exited"
        };
        LC0(A, B);
    }
    function WR5(A) {
        return xvA.dropUndefinedKeys({
            sid: `${A.sid}`,
            init: A.init,
            started: new Date(A.started * 1000).toISOString(),
            timestamp: new Date(A.timestamp * 1000).toISOString(),
            status: A.status,
            errors: A.errors,
            did: typeof A.did === "number" || typeof A.did === "string" ? `${A.did}` : void 0,
            duration: A.duration,
            abnormal_mechanism: A.abnormal_mechanism,
            attrs: {
                release: A.release,
                environment: A.environment,
                ip_address: A.ipAddress,
                user_agent: A.userAgent
            }
        });
    }
    ik2.closeSession = IR5;
    ik2.makeSession = XR5;
    ik2.updateSession = LC0;
});
