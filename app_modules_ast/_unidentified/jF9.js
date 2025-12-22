// Module: jF9
// Type: L
// Lines: 532598-532621
//
var jF9 = L(()=>{
    getViewTransitionClassName();
    pushStartInstance();
    g1();
    read_string_buffer();
    pushStartInstance();
});
function TF9() {
    if (v1().sonnet45MigrationComplete) return;
    if (l4() !== "firstParty") {
        n0((G)=>({
                ...G,
                sonnet45MigrationComplete: !0
            }));
        return;
    }
    if (HQ()?.model !== void 0) {
        Q2("userSettings", {
            model: void 0
        });
        let G = Date.now();
        n0((Z)=>({
                ...Z,
                sonnet45MigrationComplete: !0,
                sonnet45MigrationTimestamp: G
            }));
    } else n0((G)=>({
            ...G,
            sonnet45MigrationComplete: !0
        }));
}
