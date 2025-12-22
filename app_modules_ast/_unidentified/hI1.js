// Module: hI1
// Type: U
// Lines: 431354-431519
//
var renderElement = U((Bf2)=>{
    Object.defineProperty(Bf2, "__esModule", {
        value: !0
    });
    var pL = FQ(), MR5 = uHA(), tk2 = renderElement(), RC0 = uI1(), MC0 = gI1(), RR5 = renderElement();
    function _R5(A, Q, B, G, Z, Y) {
        let { normalizeDepth: J = 3, normalizeMaxBreadth: X = 1000 } = A, I = {
            ...Q,
            event_id: Q.event_id || B.event_id || pL.uuid4(),
            timestamp: Q.timestamp || pL.dateTimestampInSeconds()
        }, W = B.integrations || A.integrations.map((z)=>z.name);
        if ((jR5(I, A), TR5(I, W), Q.type === void 0)) Af2(I, A.stackParser);
        let K = SR5(G, B.captureContext);
        if (B.mechanism) pL.addExceptionMechanism(I, B.mechanism);
        let V = Z && Z.getEventProcessors ? Z.getEventProcessors() : [], H = RC0.getGlobalScope().getScopeData();
        if (Y) {
            let z = Y.getScopeData();
            MC0.mergeScopeData(H, z);
        }
        if (K) {
            let z = K.getScopeData();
            MC0.mergeScopeData(H, z);
        }
        let D = [
            ...(B.attachments || []),
            ...H.attachments
        ];
        if (D.length) B.attachments = D;
        MC0.applyScopeDataToEvent(I, H);
        let F = [
            ...V,
            ...tk2.getGlobalEventProcessors(),
            ...H.eventProcessors
        ];
        return tk2.notifyEventProcessors(F, I, B).then((z)=>{
            if (z) Qf2(z);
            if (typeof J === "number" && J > 0) return PR5(z, J, X);
            return z;
        });
    }
    function jR5(A, Q) {
        let { environment: B, release: G, dist: Z, maxValueLength: Y = 250 } = Q;
        if (!("environment" in A)) A.environment = "environment" in Q ? B : MR5.DEFAULT_ENVIRONMENT;
        if (A.release === void 0 && G !== void 0) A.release = G;
        if (A.dist === void 0 && Z !== void 0) A.dist = Z;
        if (A.message) A.message = pL.truncate(A.message, Y);
        let J = A.exception && A.exception.values && A.exception.values[0];
        if (J && J.value) J.value = pL.truncate(J.value, Y);
        let X = A.request;
        if (X && X.url) X.url = pL.truncate(X.url, Y);
    }
    var ek2 = new WeakMap();
    function Af2(A, Q) {
        let B = pL.GLOBAL_OBJ._sentryDebugIds;
        if (!B) return;
        let G, Z = ek2.get(Q);
        if (Z) G = Z;
        else ((G = new Map()), ek2.set(Q, G));
        let Y = Object.keys(B).reduce((J, X)=>{
            let I, W = G.get(X);
            if (W) I = W;
            else ((I = Q(X)), G.set(X, I));
            for(let K = I.length - 1; K >= 0; K--){
                let V = I[K];
                if (V.filename) {
                    J[V.filename] = B[X];
                    break;
                }
            }
            return J;
        }, {});
        try {
            A.exception.values.forEach((J)=>{
                J.stacktrace.frames.forEach((X)=>{
                    if (X.filename) X.debug_id = Y[X.filename];
                });
            });
        } catch (J) {}
    }
    function Qf2(A) {
        let Q = {};
        try {
            A.exception.values.forEach((G)=>{
                G.stacktrace.frames.forEach((Z)=>{
                    if (Z.debug_id) {
                        if (Z.abs_path) Q[Z.abs_path] = Z.debug_id;
                        else if (Z.filename) Q[Z.filename] = Z.debug_id;
                        delete Z.debug_id;
                    }
                });
            });
        } catch (G) {}
        if (Object.keys(Q).length === 0) return;
        ((A.debug_meta = A.debug_meta || {}), (A.debug_meta.images = A.debug_meta.images || []));
        let B = A.debug_meta.images;
        Object.keys(Q).forEach((G)=>{
            B.push({
                type: "sourcemap",
                code_file: G,
                debug_id: Q[G]
            });
        });
    }
    function TR5(A, Q) {
        if (Q.length > 0) ((A.sdk = A.sdk || {}), (A.sdk.integrations = [
            ...(A.sdk.integrations || []),
            ...Q
        ]));
    }
    function PR5(A, Q, B) {
        if (!A) return null;
        let G = {
            ...A,
            ...(A.breadcrumbs && {
                breadcrumbs: A.breadcrumbs.map((Z)=>({
                        ...Z,
                        ...(Z.data && {
                            data: pL.normalize(Z.data, Q, B)
                        })
                    }))
            }),
            ...(A.user && {
                user: pL.normalize(A.user, Q, B)
            }),
            ...(A.contexts && {
                contexts: pL.normalize(A.contexts, Q, B)
            }),
            ...(A.extra && {
                extra: pL.normalize(A.extra, Q, B)
            })
        };
        if (A.contexts && A.contexts.trace && G.contexts) {
            if (((G.contexts.trace = A.contexts.trace), A.contexts.trace.data)) G.contexts.trace.data = pL.normalize(A.contexts.trace.data, Q, B);
        }
        if (A.spans) G.spans = A.spans.map((Z)=>{
            let Y = RR5.spanToJSON(Z).data;
            if (Y) Z.data = pL.normalize(Y, Q, B);
            return Z;
        });
        return G;
    }
    function SR5(A, Q) {
        if (!Q) return A;
        let B = A ? A.clone() : new RC0.Scope();
        return (B.update(Q), B);
    }
    function yR5(A) {
        if (!A) return;
        if (xR5(A)) return {
            captureContext: A
        };
        if (kR5(A)) return {
            captureContext: A
        };
        return A;
    }
    function xR5(A) {
        return A instanceof RC0.Scope || typeof A === "function";
    }
    var vR5 = [
        "user",
        "level",
        "extra",
        "contexts",
        "tags",
        "fingerprint",
        "requestSession",
        "propagationContext"
    ];
    function kR5(A) {
        return Object.keys(A).some((Q)=>vR5.includes(Q));
    }
    Bf2.applyDebugIds = Af2;
    Bf2.applyDebugMeta = Qf2;
    Bf2.parseEventHintOrCaptureContext = yR5;
    Bf2.prepareEvent = _R5;
});
