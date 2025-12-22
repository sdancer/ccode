// Module: gI1
// Type: U
// Lines: 431778-431882
//
var gI1 = U((Vf2)=>{
    Object.defineProperty(Vf2, "__esModule", {
        value: !0
    });
    var kvA = FQ(), c_5 = g9A(), p_5 = dHA(), Kf2 = renderElement();
    function l_5(A, Q) {
        let { fingerprint: B, span: G, breadcrumbs: Z, sdkProcessingMetadata: Y } = Q;
        if ((n_5(A, Q), G)) r_5(A, G);
        (s_5(A, B), a_5(A, Z), o_5(A, Y));
    }
    function i_5(A, Q) {
        let { extra: B, tags: G, user: Z, contexts: Y, level: J, sdkProcessingMetadata: X, breadcrumbs: I, fingerprint: W, eventProcessors: K, attachments: V, propagationContext: H, transactionName: D, span: F } = Q;
        if ((cHA(A, "extra", B), cHA(A, "tags", G), cHA(A, "user", Z), cHA(A, "contexts", Y), cHA(A, "sdkProcessingMetadata", X), J)) A.level = J;
        if (D) A.transactionName = D;
        if (F) A.span = F;
        if (I.length) A.breadcrumbs = [
            ...A.breadcrumbs,
            ...I
        ];
        if (W.length) A.fingerprint = [
            ...A.fingerprint,
            ...W
        ];
        if (K.length) A.eventProcessors = [
            ...A.eventProcessors,
            ...K
        ];
        if (V.length) A.attachments = [
            ...A.attachments,
            ...V
        ];
        A.propagationContext = {
            ...A.propagationContext,
            ...H
        };
    }
    function cHA(A, Q, B) {
        if (B && Object.keys(B).length) {
            A[Q] = {
                ...A[Q]
            };
            for(let G in B)if (Object.prototype.hasOwnProperty.call(B, G)) A[Q][G] = B[G];
        }
    }
    function n_5(A, Q) {
        let { extra: B, tags: G, user: Z, contexts: Y, level: J, transactionName: X } = Q, I = kvA.dropUndefinedKeys(B);
        if (I && Object.keys(I).length) A.extra = {
            ...I,
            ...A.extra
        };
        let W = kvA.dropUndefinedKeys(G);
        if (W && Object.keys(W).length) A.tags = {
            ...W,
            ...A.tags
        };
        let K = kvA.dropUndefinedKeys(Z);
        if (K && Object.keys(K).length) A.user = {
            ...K,
            ...A.user
        };
        let V = kvA.dropUndefinedKeys(Y);
        if (V && Object.keys(V).length) A.contexts = {
            ...V,
            ...A.contexts
        };
        if (J) A.level = J;
        if (X) A.transaction = X;
    }
    function a_5(A, Q) {
        let B = [
            ...(A.breadcrumbs || []),
            ...Q
        ];
        A.breadcrumbs = B.length ? B : void 0;
    }
    function o_5(A, Q) {
        A.sdkProcessingMetadata = {
            ...A.sdkProcessingMetadata,
            ...Q
        };
    }
    function r_5(A, Q) {
        A.contexts = {
            trace: Kf2.spanToTraceContext(Q),
            ...A.contexts
        };
        let B = p_5.getRootSpan(Q);
        if (B) {
            A.sdkProcessingMetadata = {
                dynamicSamplingContext: c_5.getDynamicSamplingContextFromSpan(Q),
                ...A.sdkProcessingMetadata
            };
            let G = Kf2.spanToJSON(B).description;
            if (G) A.tags = {
                transaction: G,
                ...A.tags
            };
        }
    }
    function s_5(A, Q) {
        if (((A.fingerprint = A.fingerprint ? kvA.arrayify(A.fingerprint) : []), Q)) A.fingerprint = A.fingerprint.concat(Q);
        if (A.fingerprint && !A.fingerprint.length) delete A.fingerprint;
    }
    Vf2.applyScopeDataToEvent = l_5;
    Vf2.mergeAndOverwriteScopeData = cHA;
    Vf2.mergeScopeData = i_5;
});
