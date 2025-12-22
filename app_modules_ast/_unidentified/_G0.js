// Module: _G0
// Type: L
// Lines: 318208-318379
//
var trackUsedThenable = L(()=>{
    A2();
    getViewTransitionClassName();
    _f3 = [
        "You've hit your",
        "You've used",
        "You're now using extra usage",
        "You're close to",
        "You're out of extra usage"
    ];
});
function xf3(A, Q) {
    let B = Date.now() / 1000, G = A - Q, Z = B - G;
    return Math.max(0, Math.min(1, Z / Q));
}
function s31(A) {
    ((sR = A), jG0.forEach((B)=>B(A)));
    let Q = Math.round((A.resetsAt ? A.resetsAt - Date.now() / 1000 : 0) / 3600);
    r("tengu_claudeai_limits_status_changed", {
        status: A.status,
        unifiedRateLimitFallbackAvailable: A.unifiedRateLimitFallbackAvailable,
        hoursTillReset: Q
    });
}
async function vf3() {
    let A = TH(), Q = await eN({
        maxRetries: 0,
        model: A
    }), B = [
        {
            role: "user",
            content: "quota"
        }
    ], G = GN(A);
    return Q.beta.messages.create({
        model: A,
        max_tokens: 1,
        messages: B,
        metadata: rn(),
        ...(G.length > 0 ? {
            betas: G
        } : {})
    }).asResponse();
}
async function _Q2() {
    if (!AKA(VB())) return;
    try {
        let A = await vf3();
        TG0(A.headers);
    } catch (A) {
        if (A instanceof W9) PG0(A);
    }
}
function BKA() {
    let [A, Q] = t31.useState({
        ...sR
    });
    return (t31.useEffect(()=>{
        let B = (G)=>{
            Q({
                ...G
            });
        };
        return (jG0.add(B), ()=>{
            jG0.delete(B);
        });
    }, []), A);
}
function kf3(A, Q) {
    for (let [B, G] of Object.entries(yf3)){
        let Z = A.get(`anthropic-ratelimit-unified-${B}-surpassed-threshold`);
        if (Z !== null) {
            let Y = A.get(`anthropic-ratelimit-unified-${B}-utilization`), J = A.get(`anthropic-ratelimit-unified-${B}-reset`), X = Y ? Number(Y) : void 0;
            return {
                status: "allowed_warning",
                resetsAt: J ? Number(J) : void 0,
                rateLimitType: G,
                utilization: X,
                unifiedRateLimitFallbackAvailable: Q,
                isUsingOverage: !1,
                surpassedThreshold: Number(Z)
            };
        }
    }
    return null;
}
function ff3(A, Q, B) {
    let { rateLimitType: G, claimAbbrev: Z, windowSeconds: Y, thresholds: J } = Q, X = A.get(`anthropic-ratelimit-unified-${Z}-utilization`), I = A.get(`anthropic-ratelimit-unified-${Z}-reset`);
    if (X === null || I === null) return null;
    let W = Number(X), K = Number(I), V = xf3(K, Y);
    if (!J.some((D)=>W >= D.utilization && V <= D.timePct)) return null;
    return {
        status: "allowed_warning",
        resetsAt: K,
        rateLimitType: G,
        utilization: W,
        unifiedRateLimitFallbackAvailable: B,
        isUsingOverage: !1
    };
}
function bf3(A, Q) {
    let B = kf3(A, Q);
    if (B) return B;
    for (let G of Sf3){
        let Z = ff3(A, G, Q);
        if (Z) return Z;
    }
    return null;
}
function jQ2(A) {
    let Q = A.get("anthropic-ratelimit-unified-status") || "allowed", B = A.get("anthropic-ratelimit-unified-reset"), G = B ? Number(B) : void 0, Z = A.get("anthropic-ratelimit-unified-fallback") === "available", Y = A.get("anthropic-ratelimit-unified-representative-claim"), J = A.get("anthropic-ratelimit-unified-overage-status"), X = A.get("anthropic-ratelimit-unified-overage-reset"), I = X ? Number(X) : void 0, W = A.get("anthropic-ratelimit-unified-overage-disabled-reason"), K = Q === "rejected" && (J === "allowed" || J === "allowed_warning"), V = Q;
    if (Q === "allowed" || Q === "allowed_warning") {
        let H = bf3(A, Z);
        if (H) return H;
        V = "allowed";
    }
    return {
        status: V,
        resetsAt: G,
        unifiedRateLimitFallbackAvailable: Z,
        ...(Y && {
            rateLimitType: Y
        }),
        ...(J && {
            overageStatus: J
        }),
        ...(I && {
            overageResetsAt: I
        }),
        ...(W && {
            overageDisabledReason: W
        }),
        isUsingOverage: K
    };
}
function TG0(A) {
    let Q = VB();
    if (!AKA(Q)) {
        if (sR.status !== "allowed" || sR.resetsAt) s31({
            status: "allowed",
            unifiedRateLimitFallbackAvailable: !1,
            isUsingOverage: !1
        });
        return;
    }
    let B = LG0(A), G = jQ2(B);
    if (!I1A(sR, G)) s31(G);
}
function PG0(A) {
    if (!AKA(VB()) || A.status !== 429) return;
    try {
        let Q = {
            ...sR
        };
        if (A.headers) {
            let B = LG0(A.headers);
            Q = jQ2(B);
        }
        if (((Q.status = "rejected"), !I1A(sR, Q))) s31(Q);
    } catch (Q) {
        t(Q);
    }
}
var t31, Sf3, yf3, sR, jG0;
