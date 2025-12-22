// Module: WF9
// Type: L
// Lines: 532104-532200
//
var WF9 = L(()=>{
    R5();
    n2();
    g1();
    DZA();
    cAA();
    ((PK7 = new Set([
        "tengu_api_error",
        "tengu_api_success",
        "tengu_compact_failed",
        "tengu_model_fallback_triggered",
        "tengu_oauth_error",
        "tengu_oauth_success",
        "tengu_oauth_token_refresh_failure",
        "tengu_oauth_token_refresh_success",
        "tengu_oauth_token_refresh_lock_acquiring",
        "tengu_oauth_token_refresh_lock_acquired",
        "tengu_oauth_token_refresh_starting",
        "tengu_oauth_token_refresh_completed",
        "tengu_oauth_token_refresh_lock_releasing",
        "tengu_oauth_token_refresh_lock_released",
        "tengu_query_error",
        "tengu_tool_use_error",
        "tengu_tool_use_success"
    ])), (SK7 = [
        "arch",
        "clientType",
        "errorType",
        "http_status_range",
        "http_status",
        "model",
        "platform",
        "provider",
        "toolName",
        "userType",
        "version",
        "versionBase"
    ]));
    QhA = [];
    xK7 = Y0(async ()=>{
        if (wV()) return ((SF1 = !1), !1);
        try {
            let A = async ()=>{
                if (Ic) (clearTimeout(Ic), (Ic = null));
                await V_0();
            };
            return (process.on("beforeExit", A), (SF1 = !0), !0);
        } catch (A) {
            return (t(A instanceof Error ? A : Error(String(A))), (SF1 = !1), !1);
        }
    });
});
function HF9() {
    if (D_0 !== void 0) return D_0;
    try {
        return v1().cachedStatsigGates[KF9] ?? !1;
    } catch  {
        return !1;
    }
}
function DF9() {
    if (F_0 !== void 0) return F_0;
    try {
        return v1().cachedStatsigGates[VF9] ?? !1;
    } catch  {
        return !1;
    }
}
function vK7(A, Q) {
    let B = qm1(A);
    if (B === 0) return;
    let G = B !== null ? {
        ...Q,
        sample_rate: B
    } : Q;
    if ((UV9(A, G), HF9())) Pw0(A, G);
    if (DF9()) H_0(A, G);
    Lm1(A, G);
}
async function kK7(A, Q) {
    let B = qm1(A);
    if (B === 0) return;
    let G = B !== null ? {
        ...Q,
        sample_rate: B
    } : Q, Z = [
        OR0(A, G)
    ];
    if (HF9()) Z.push(Pw0(A, G));
    if (DF9()) H_0(A, G);
    (Lm1(A, G), await Promise.all(Z));
}
async function FF9() {
    ((D_0 = await pX(KF9)), (F_0 = await pX(VF9)));
}
function EF9() {
    XS0({
        logEvent: vK7,
        logEventAsync: kK7
    });
}
var KF9 = "tengu_log_segment_events", VF9 = "tengu_log_datadog_events", D_0 = void 0, F_0 = void 0;
