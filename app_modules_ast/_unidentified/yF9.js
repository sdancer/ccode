// Module: yF9
// Type: L
// Lines: 532637-532652
//
var yF9 = L(()=>{
    getViewTransitionClassName();
    zB();
    DK();
    Q9();
});
function xF9() {
    if (v1().thinkingMigrationComplete) return;
    if (HQ().alwaysThinkingEnabled !== !1) {
        n0((B)=>({
                ...B,
                thinkingMigrationComplete: !0
            }));
        return;
    }
    (Q2("userSettings", {
        alwaysThinkingEnabled: void 0
    }), n0((B)=>({
            ...B,
            thinkingMigrationComplete: !0
        })));
}
