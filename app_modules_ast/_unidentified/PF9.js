// Module: PF9
// Type: L
// Lines: 532621-532637
//
var PF9 = L(()=>{
    getViewTransitionClassName();
    zB();
    DK();
});
function SF9() {
    if (v1().opus45MigrationComplete) return;
    let Q = l4(), B = XqA() || IqA();
    if (Q !== "firstParty" || !B) {
        n0((Z)=>({
                ...Z,
                opus45MigrationComplete: !0
            }));
        return;
    }
    if (HQ()?.model !== void 0) Q2("userSettings", {
        model: void 0
    });
    n0((Z)=>({
            ...Z,
            opus45MigrationComplete: !0
        }));
}
