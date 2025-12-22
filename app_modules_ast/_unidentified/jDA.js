// Module: jDA
// Type: L
// Lines: 463739-463781
//
var jDA = L(()=>{
    R5();
    BJ();
    rv();
    getViewTransitionClassName();
    A2();
    s1();
    g1();
});
function f07() {
    let A = v1(), { eligible: Q, hasCache: B } = FV1();
    if (!Q || !B) return !1;
    if ((A.passesUpsellSeenCount ?? 0) >= 3) return !1;
    if (A.hasVisitedPasses) return !1;
    return !0;
}
function EV1() {
    let [A] = dt2.useState(()=>f07());
    return A;
}
function zV1() {
    let Q = (v1().passesUpsellSeenCount ?? 0) + 1;
    (n0((B)=>({
            ...B,
            passesUpsellSeenCount: (B.passesUpsellSeenCount ?? 0) + 1
        })), r("tengu_guest_passes_upsell_shown", {
        seen_count: Q
    }));
}
function ct2() {
    return bd.createElement(C, {
        dimColor: !0
    }, bd.createElement(C, {
        color: "claude"
    }, "[✻]"), " ", bd.createElement(C, {
        color: "claude"
    }, "[✻]"), " ", bd.createElement(C, {
        color: "claude"
    }, "[✻]"), " · 3 guest passes at /passes");
}
var bd, dt2;
