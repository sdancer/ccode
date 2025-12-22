// Module: M_
// Type: U
// Lines: 431519-431730
//
var createRenderState = U((Yf2)=>{
    Object.defineProperty(Yf2, "__esModule", {
        value: !0
    });
    var zd = FQ(), uR5 = uHA(), mI1 = sK(), SW = qf(), _C0 = createRenderState(), mR5 = renderElement();
    function dR5(A, Q) {
        return SW.getCurrentHub().captureException(A, mR5.parseEventHintOrCaptureContext(Q));
    }
    function cR5(A, Q) {
        let B = typeof Q === "string" ? Q : void 0, G = typeof Q !== "string" ? {
            captureContext: Q
        } : void 0;
        return SW.getCurrentHub().captureMessage(A, B, G);
    }
    function pR5(A, Q) {
        return SW.getCurrentHub().captureEvent(A, Q);
    }
    function lR5(A) {
        SW.getCurrentHub().configureScope(A);
    }
    function iR5(A, Q) {
        SW.getCurrentHub().addBreadcrumb(A, Q);
    }
    function nR5(A, Q) {
        SW.getCurrentHub().setContext(A, Q);
    }
    function aR5(A) {
        SW.getCurrentHub().setExtras(A);
    }
    function oR5(A, Q) {
        SW.getCurrentHub().setExtra(A, Q);
    }
    function rR5(A) {
        SW.getCurrentHub().setTags(A);
    }
    function sR5(A, Q) {
        SW.getCurrentHub().setTag(A, Q);
    }
    function tR5(A) {
        SW.getCurrentHub().setUser(A);
    }
    function Gf2(...A) {
        let Q = SW.getCurrentHub();
        if (A.length === 2) {
            let [B, G] = A;
            if (!B) return Q.withScope(G);
            return Q.withScope(()=>{
                return ((Q.getStackTop().scope = B), G(B));
            });
        }
        return Q.withScope(A[0]);
    }
    function eR5(A) {
        return SW.runWithAsyncContext(()=>{
            return A(SW.getIsolationScope());
        });
    }
    function A_5(A, Q) {
        return Gf2((B)=>{
            return (B.setSpan(A), Q(B));
        });
    }
    function Q_5(A, Q) {
        return SW.getCurrentHub().startTransaction({
            ...A
        }, Q);
    }
    function jC0(A, Q) {
        let B = vvA(), G = h9A();
        if (!G) mI1.DEBUG_BUILD && zd.logger.warn("Cannot capture check-in. No client defined.");
        else if (!G.captureCheckIn) mI1.DEBUG_BUILD && zd.logger.warn("Cannot capture check-in. Client does not support sending check-ins.");
        else return G.captureCheckIn(A, Q, B);
        return zd.uuid4();
    }
    function B_5(A, Q, B) {
        let G = jC0({
            monitorSlug: A,
            status: "in_progress"
        }, B), Z = zd.timestampInSeconds();
        function Y(X) {
            jC0({
                monitorSlug: A,
                status: X,
                checkInId: G,
                duration: zd.timestampInSeconds() - Z
            });
        }
        let J;
        try {
            J = Q();
        } catch (X) {
            throw (Y("error"), X);
        }
        if (zd.isThenable(J)) Promise.resolve(J).then(()=>{
            Y("ok");
        }, ()=>{
            Y("error");
        });
        else Y("ok");
        return J;
    }
    async function G_5(A) {
        let Q = h9A();
        if (Q) return Q.flush(A);
        return (mI1.DEBUG_BUILD && zd.logger.warn("Cannot flush events. No client defined."), Promise.resolve(!1));
    }
    async function Z_5(A) {
        let Q = h9A();
        if (Q) return Q.close(A);
        return (mI1.DEBUG_BUILD && zd.logger.warn("Cannot flush events and disable SDK. No client defined."), Promise.resolve(!1));
    }
    function Y_5() {
        return SW.getCurrentHub().lastEventId();
    }
    function h9A() {
        return SW.getCurrentHub().getClient();
    }
    function J_5() {
        return !!h9A();
    }
    function vvA() {
        return SW.getCurrentHub().getScope();
    }
    function X_5(A) {
        let Q = h9A(), B = SW.getIsolationScope(), G = vvA(), { release: Z, environment: Y = uR5.DEFAULT_ENVIRONMENT } = (Q && Q.getOptions()) || {}, { userAgent: J } = zd.GLOBAL_OBJ.navigator || {}, X = _C0.makeSession({
            release: Z,
            environment: Y,
            user: G.getUser() || B.getUser(),
            ...(J && {
                userAgent: J
            }),
            ...A
        }), I = B.getSession();
        if (I && I.status === "ok") _C0.updateSession(I, {
            status: "exited"
        });
        return (TC0(), B.setSession(X), G.setSession(X), X);
    }
    function TC0() {
        let A = SW.getIsolationScope(), Q = vvA(), B = Q.getSession() || A.getSession();
        if (B) _C0.closeSession(B);
        (Zf2(), A.setSession(), Q.setSession());
    }
    function Zf2() {
        let A = SW.getIsolationScope(), Q = vvA(), B = h9A(), G = Q.getSession() || A.getSession();
        if (G && B && B.captureSession) B.captureSession(G);
    }
    function I_5(A = !1) {
        if (A) {
            TC0();
            return;
        }
        Zf2();
    }
    Yf2.addBreadcrumb = iR5;
    Yf2.captureCheckIn = jC0;
    Yf2.captureEvent = pR5;
    Yf2.captureException = dR5;
    Yf2.captureMessage = cR5;
    Yf2.captureSession = I_5;
    Yf2.close = Z_5;
    Yf2.configureScope = lR5;
    Yf2.endSession = TC0;
    Yf2.flush = G_5;
    Yf2.getClient = h9A;
    Yf2.getCurrentScope = vvA;
    Yf2.isInitialized = J_5;
    Yf2.lastEventId = Y_5;
    Yf2.setContext = nR5;
    Yf2.setExtra = oR5;
    Yf2.setExtras = aR5;
    Yf2.setTag = sR5;
    Yf2.setTags = rR5;
    Yf2.setUser = tR5;
    Yf2.startSession = X_5;
    Yf2.startTransaction = Q_5;
    Yf2.withActiveSpan = A_5;
    Yf2.withIsolationScope = eR5;
    Yf2.withMonitor = B_5;
    Yf2.withScope = Gf2;
});
