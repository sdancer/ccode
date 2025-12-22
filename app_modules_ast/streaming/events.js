// Module: YQB
// Type: L
// Lines: 135491-136014
//
var createRenderState = L(()=>{
    ewA();
    Zm1 = {};
});
function QF8(A) {
    let Q = new Map();
    if (A.global.forcedFeatureValues) A.global.forcedFeatureValues.forEach((B, G)=>Q.set(G, B));
    if (A.user.forcedFeatureValues) A.user.forcedFeatureValues.forEach((B, G)=>Q.set(G, B));
    return Q;
}
function BF8(A) {
    if (A.global.forcedVariations && A.user.forcedVariations) return {
        ...A.global.forcedVariations,
        ...A.user.forcedVariations
    };
    else if (A.global.forcedVariations) return A.global.forcedVariations;
    else if (A.user.forcedVariations) return A.user.forcedVariations;
    else return {};
}
async function QZA(A) {
    try {
        await A();
    } catch (Q) {}
}
function JQB(A, Q, B) {
    if (A.user.trackedExperiments) {
        let Z = soA(Q, B);
        if (A.user.trackedExperiments.has(Z)) return [];
        A.user.trackedExperiments.add(Z);
    }
    if (A.user.enableDevMode && A.user.devLogs) A.user.devLogs.push({
        experiment: Q,
        result: B,
        timestamp: Date.now().toString(),
        logType: "experiment"
    });
    let G = [];
    if (A.global.trackingCallback) {
        let Z = A.global.trackingCallback;
        G.push(QZA(()=>Z(Q, B, A.user)));
    }
    if (A.user.trackingCallback) {
        let Z = A.user.trackingCallback;
        G.push(QZA(()=>Z(Q, B)));
    }
    if (A.global.eventLogger) {
        let Z = A.global.eventLogger;
        G.push(QZA(()=>Z(AF8, {
                experimentId: Q.key,
                variationId: B.key,
                hashAttribute: B.hashAttribute,
                hashValue: B.hashValue
            }, A.user)));
    }
    return G;
}
function GF8(A, Q, B) {
    if (A.user.trackedFeatureUsage) {
        let G = JSON.stringify(B.value);
        if (A.user.trackedFeatureUsage[Q] === G) return;
        if (((A.user.trackedFeatureUsage[Q] = G), A.user.enableDevMode && A.user.devLogs)) A.user.devLogs.push({
            featureKey: Q,
            result: B,
            timestamp: Date.now().toString(),
            logType: "feature"
        });
    }
    if (A.global.onFeatureUsage) {
        let G = A.global.onFeatureUsage;
        QZA(()=>G(Q, B, A.user));
    }
    if (A.user.onFeatureUsage) {
        let G = A.user.onFeatureUsage;
        QZA(()=>G(Q, B));
    }
    if (A.global.eventLogger) {
        let G = A.global.eventLogger;
        QZA(()=>G(eD8, {
                feature: Q,
                source: B.source,
                value: B.value,
                ruleId: B.source === "defaultValue" ? "$default" : B.ruleId || "",
                variationId: B.experimentResult ? B.experimentResult.key : ""
            }, A.user));
    }
}
function ooA(A, Q) {
    if (Q.stack.evaluatedFeatures.has(A)) return Ji(Q, A, null, "cyclicPrerequisite");
    (Q.stack.evaluatedFeatures.add(A), (Q.stack.id = A));
    let B = QF8(Q);
    if (B.has(A)) return Ji(Q, A, B.get(A), "override");
    if (!Q.global.features || !Q.global.features[A]) return Ji(Q, A, null, "unknownFeature");
    let G = Q.global.features[A];
    if (G.rules) {
        let Z = new Set(Q.stack.evaluatedFeatures);
        A: for (let Y of G.rules){
            if (Y.parentConditions) for (let I of Y.parentConditions){
                Q.stack.evaluatedFeatures = new Set(Z);
                let W = ooA(I.id, Q);
                if (W.source === "cyclicPrerequisite") return Ji(Q, A, null, "cyclicPrerequisite");
                let K = {
                    value: W.value
                };
                if (!Yi(K, I.condition || {})) {
                    if (I.gate) return Ji(Q, A, null, "prerequisite");
                    continue A;
                }
            }
            if (Y.filters && WQB(Y.filters, Q)) continue;
            if ("force" in Y) {
                if (Y.condition && !IQB(Y.condition, Q)) continue;
                if (!ZF8(Q, Y.seed || A, Y.hashAttribute, Q.user.saveStickyBucketAssignmentDoc && !Y.disableStickyBucketing ? Y.fallbackAttribute : void 0, Y.range, Y.coverage, Y.hashVersion)) continue;
                if (Y.tracks) Y.tracks.forEach((I)=>{
                    if (!JQB(Q, I.experiment, I.result).length && Q.global.saveDeferredTrack) Q.global.saveDeferredTrack({
                        experiment: I.experiment,
                        result: I.result
                    });
                });
                return Ji(Q, A, Y.force, "force", Y.id);
            }
            if (!Y.variations) continue;
            let J = {
                variations: Y.variations,
                key: Y.key || A
            };
            if ("coverage" in Y) J.coverage = Y.coverage;
            if (Y.weights) J.weights = Y.weights;
            if (Y.hashAttribute) J.hashAttribute = Y.hashAttribute;
            if (Y.fallbackAttribute) J.fallbackAttribute = Y.fallbackAttribute;
            if (Y.disableStickyBucketing) J.disableStickyBucketing = Y.disableStickyBucketing;
            if (Y.bucketVersion !== void 0) J.bucketVersion = Y.bucketVersion;
            if (Y.minBucketVersion !== void 0) J.minBucketVersion = Y.minBucketVersion;
            if (Y.namespace) J.namespace = Y.namespace;
            if (Y.meta) J.meta = Y.meta;
            if (Y.ranges) J.ranges = Y.ranges;
            if (Y.name) J.name = Y.name;
            if (Y.phase) J.phase = Y.phase;
            if (Y.seed) J.seed = Y.seed;
            if (Y.hashVersion) J.hashVersion = Y.hashVersion;
            if (Y.filters) J.filters = Y.filters;
            if (Y.condition) J.condition = Y.condition;
            let { result: X } = roA(J, A, Q);
            if ((Q.global.onExperimentEval && Q.global.onExperimentEval(J, X), X.inExperiment && !X.passthrough)) return Ji(Q, A, X.value, "experiment", Y.id, J, X);
        }
    }
    return Ji(Q, A, G.defaultValue === void 0 ? null : G.defaultValue, "defaultValue");
}
function roA(A, Q, B) {
    let G = A.key, Z = A.variations.length;
    if (Z < 2) return {
        result: oJ(B, A, -1, !1, Q)
    };
    if (B.global.enabled === !1 || B.user.enabled === !1) return {
        result: oJ(B, A, -1, !1, Q)
    };
    if (((A = YF8(A, B)), A.urlPatterns && !koA(B.user.url || "", A.urlPatterns))) return {
        result: oJ(B, A, -1, !1, Q)
    };
    let Y = y0B(G, B.user.url || "", Z);
    if (Y !== null) return {
        result: oJ(B, A, Y, !1, Q)
    };
    let J = BF8(B);
    if (G in J) {
        let z = J[G];
        return {
            result: oJ(B, A, z, !1, Q)
        };
    }
    if (A.status === "draft" || A.active === !1) return {
        result: oJ(B, A, -1, !1, Q)
    };
    let { hashAttribute: X, hashValue: I } = H1A(B, A.hashAttribute, B.user.saveStickyBucketAssignmentDoc && !A.disableStickyBucketing ? A.fallbackAttribute : void 0);
    if (!I) return {
        result: oJ(B, A, -1, !1, Q)
    };
    let W = -1, K = !1, V = !1;
    if (B.user.saveStickyBucketAssignmentDoc && !A.disableStickyBucketing) {
        let { variation: z, versionIsBlocked: $ } = IF8({
            ctx: B,
            expKey: A.key,
            expBucketVersion: A.bucketVersion,
            expHashAttribute: A.hashAttribute,
            expFallbackAttribute: A.fallbackAttribute,
            expMinBucketVersion: A.minBucketVersion,
            expMeta: A.meta
        });
        ((K = z >= 0), (W = z), (V = !!$));
    }
    if (!K) {
        if (A.filters) {
            if (WQB(A.filters, B)) return {
                result: oJ(B, A, -1, !1, Q)
            };
        } else if (A.namespace && !T0B(I, A.namespace)) return {
            result: oJ(B, A, -1, !1, Q)
        };
        if (A.include && !x0B(A.include)) return {
            result: oJ(B, A, -1, !1, Q)
        };
        if (A.condition && !IQB(A.condition, B)) return {
            result: oJ(B, A, -1, !1, Q)
        };
        if (A.parentConditions) {
            let z = new Set(B.stack.evaluatedFeatures);
            for (let $ of A.parentConditions){
                B.stack.evaluatedFeatures = new Set(z);
                let O = ooA($.id, B);
                if (O.source === "cyclicPrerequisite") return {
                    result: oJ(B, A, -1, !1, Q)
                };
                let N = {
                    value: O.value
                };
                if (!Yi(N, $.condition || {})) return {
                    result: oJ(B, A, -1, !1, Q)
                };
            }
        }
        if (A.groups && !XF8(A.groups, B)) return {
            result: oJ(B, A, -1, !1, Q)
        };
    }
    if (A.url && !JF8(A.url, B)) return {
        result: oJ(B, A, -1, !1, Q)
    };
    let H = swA(A.seed || G, I, A.hashVersion || 1);
    if (H === null) return {
        result: oJ(B, A, -1, !1, Q)
    };
    if (!K) {
        let z = A.ranges || S0B(Z, A.coverage === void 0 ? 1 : A.coverage, A.weights);
        W = P0B(H, z);
    }
    if (V) return {
        result: oJ(B, A, -1, !1, Q, void 0, !0)
    };
    if (W < 0) return {
        result: oJ(B, A, -1, !1, Q)
    };
    if ("force" in A) return {
        result: oJ(B, A, A.force === void 0 ? -1 : A.force, !1, Q)
    };
    if (B.global.qaMode || B.user.qaMode) return {
        result: oJ(B, A, -1, !1, Q)
    };
    if (A.status === "stopped") return {
        result: oJ(B, A, -1, !1, Q)
    };
    let D = oJ(B, A, W, !0, Q, H, K);
    if (B.user.saveStickyBucketAssignmentDoc && !A.disableStickyBucketing) {
        let { changed: z, key: $, doc: O } = KF8(B, X, twA(I), {
            [Ym1(A.key, A.bucketVersion)]: D.key
        });
        if (z) ((B.user.stickyBucketAssignmentDocs = B.user.stickyBucketAssignmentDocs || {}), (B.user.stickyBucketAssignmentDocs[$] = O), B.user.saveStickyBucketAssignmentDoc(O));
    }
    let F = JQB(B, A, D);
    if (F.length === 0 && B.global.saveDeferredTrack) B.global.saveDeferredTrack({
        experiment: A,
        result: D
    });
    let E = !F.length ? void 0 : F.length === 1 ? F[0] : Promise.all(F).then(()=>{});
    return ("changeId" in A && A.changeId && B.global.recordChangeId && B.global.recordChangeId(A.changeId), {
        result: D,
        trackingCall: E
    });
}
function Ji(A, Q, B, G, Z, Y, J) {
    let X = {
        value: B,
        on: !!B,
        off: !B,
        source: G,
        ruleId: Z || ""
    };
    if (Y) X.experiment = Y;
    if (J) X.experimentResult = J;
    if (G !== "override") GF8(A, Q, X);
    return X;
}
function XQB(A) {
    return {
        ...A.user.attributes,
        ...A.user.attributeOverrides
    };
}
function IQB(A, Q) {
    return Yi(XQB(Q), A, Q.global.savedGroups || {});
}
function WQB(A, Q) {
    return A.some((B)=>{
        let { hashValue: G } = H1A(Q, B.attribute);
        if (!G) return !0;
        let Z = swA(B.seed, G, B.hashVersion || 2);
        if (Z === null) return !0;
        return !B.ranges.some((Y)=>voA(Z, Y));
    });
}
function ZF8(A, Q, B, G, Z, Y, J) {
    if (!Z && Y === void 0) return !0;
    if (!Z && Y === 0) return !1;
    let { hashValue: X } = H1A(A, B, G);
    if (!X) return !1;
    let I = swA(Q, X, J || 1);
    if (I === null) return !1;
    return Z ? voA(I, Z) : Y !== void 0 ? I <= Y : !0;
}
function oJ(A, Q, B, G, Z, Y, J) {
    let X = !0;
    if (B < 0 || B >= Q.variations.length) ((B = 0), (X = !1));
    let { hashAttribute: I, hashValue: W } = H1A(A, Q.hashAttribute, A.user.saveStickyBucketAssignmentDoc && !Q.disableStickyBucketing ? Q.fallbackAttribute : void 0), K = Q.meta ? Q.meta[B] : {}, V = {
        key: K.key || "" + B,
        featureId: Z,
        inExperiment: X,
        hashUsed: G,
        variationId: B,
        value: Q.variations[B],
        hashAttribute: I,
        hashValue: W,
        stickyBucketUsed: !!J
    };
    if (K.name) V.name = K.name;
    if (Y !== void 0) V.bucket = Y;
    if (K.passthrough) V.passthrough = K.passthrough;
    return V;
}
function YF8(A, Q) {
    let B = A.key, G = Q.global.overrides;
    if (G && G[B]) {
        if (((A = Object.assign({}, A, G[B])), typeof A.url === "string")) A.url = ou1(A.url);
    }
    return A;
}
function H1A(A, Q, B) {
    let G = Q || "id", Z = "", Y = XQB(A);
    if (Y[G]) Z = Y[G];
    if (!Z && B) {
        if (Y[B]) Z = Y[B];
        if (Z) G = B;
    }
    return {
        hashAttribute: G,
        hashValue: Z
    };
}
function JF8(A, Q) {
    let B = Q.user.url;
    if (!B) return !1;
    let G = B.replace(/^https?:\/\//, "").replace(/^[^/]*\//, "/");
    if (A.test(B)) return !0;
    if (A.test(G)) return !0;
    return !1;
}
function XF8(A, Q) {
    let B = Q.global.groups || {};
    for(let G = 0; G < A.length; G++)if (B[A[G]]) return !0;
    return !1;
}
function IF8(A) {
    let { ctx: Q, expKey: B, expBucketVersion: G, expHashAttribute: Z, expFallbackAttribute: Y, expMinBucketVersion: J, expMeta: X } = A;
    ((G = G || 0), (J = J || 0), (Z = Z || "id"), (X = X || []));
    let I = Ym1(B, G), W = WF8(Q, Z, Y);
    if (J > 0) for(let H = 0; H <= J; H++){
        let D = Ym1(B, H);
        if (W[D] !== void 0) return {
            variation: -1,
            versionIsBlocked: !0
        };
    }
    let K = W[I];
    if (K === void 0) return {
        variation: -1
    };
    let V = X.findIndex((H)=>H.key === K);
    if (V < 0) return {
        variation: -1
    };
    return {
        variation: V
    };
}
function Ym1(A, Q) {
    return ((Q = Q || 0), `${A}__${Q}`);
}
function Jm1(A, Q) {
    return `${A}||${Q}`;
}
function WF8(A, Q, B) {
    if (!A.user.stickyBucketAssignmentDocs) return {};
    let { hashAttribute: G, hashValue: Z } = H1A(A, Q), Y = Jm1(G, twA(Z)), { hashAttribute: J, hashValue: X } = H1A(A, B), I = X ? Jm1(J, twA(X)) : null, W = {};
    if (I && A.user.stickyBucketAssignmentDocs[I]) Object.assign(W, A.user.stickyBucketAssignmentDocs[I].assignments || {});
    if (A.user.stickyBucketAssignmentDocs[Y]) Object.assign(W, A.user.stickyBucketAssignmentDocs[Y].assignments || {});
    return W;
}
function KF8(A, Q, B, G) {
    let Z = Jm1(Q, B), Y = A.user.stickyBucketAssignmentDocs && A.user.stickyBucketAssignmentDocs[Z] ? A.user.stickyBucketAssignmentDocs[Z].assignments || {} : {}, J = {
        ...Y,
        ...G
    }, X = JSON.stringify(Y) !== JSON.stringify(J);
    return {
        key: Z,
        doc: {
            attributeName: Q,
            attributeValue: B,
            assignments: J
        },
        changed: X
    };
}
function VF8(A, Q) {
    let B = new Set(), G = Q && Q.features ? Q.features : A.global.features || {}, Z = Q && Q.experiments ? Q.experiments : A.global.experiments || [];
    return (Object.keys(G).forEach((Y)=>{
        let J = G[Y];
        if (J.rules) {
            for (let X of J.rules)if (X.variations) {
                if ((B.add(X.hashAttribute || "id"), X.fallbackAttribute)) B.add(X.fallbackAttribute);
            }
        }
    }), Z.map((Y)=>{
        if ((B.add(Y.hashAttribute || "id"), Y.fallbackAttribute)) B.add(Y.fallbackAttribute);
    }), Array.from(B));
}
async function KQB(A, Q, B) {
    let G = Xm1(A, B);
    return Q.getAllAssignments(G);
}
function Xm1(A, Q) {
    let B = {};
    return (VF8(A, Q).forEach((Z)=>{
        let { hashValue: Y } = H1A(A, Z);
        B[Z] = twA(Y);
    }), B);
}
async function VQB(A, Q, B) {
    if (((A = {
        ...A
    }), A.encryptedFeatures)) {
        try {
            A.features = JSON.parse(await V1A(A.encryptedFeatures, Q, B));
        } catch (G) {
            console.error(G);
        }
        delete A.encryptedFeatures;
    }
    if (A.encryptedExperiments) {
        try {
            A.experiments = JSON.parse(await V1A(A.encryptedExperiments, Q, B));
        } catch (G) {
            console.error(G);
        }
        delete A.encryptedExperiments;
    }
    if (A.encryptedSavedGroups) {
        try {
            A.savedGroups = JSON.parse(await V1A(A.encryptedSavedGroups, Q, B));
        } catch (G) {
            console.error(G);
        }
        delete A.encryptedSavedGroups;
    }
    return A;
}
function HQB(A) {
    let Q = A.apiHost || "https://cdn.growthbook.io";
    return {
        apiHost: Q.replace(/\/*$/, ""),
        streamingHost: (A.streamingHost || Q).replace(/\/*$/, ""),
        apiRequestHeaders: A.apiHostRequestHeaders,
        streamingHostRequestHeaders: A.streamingHostRequestHeaders
    };
}
function soA(A, Q) {
    return Q.hashAttribute + Q.hashValue + A.key + Q.variationId;
}
var eD8 = "Feature Evaluated", AF8 = "Experiment Viewed";
