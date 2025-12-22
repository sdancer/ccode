// Module: ly2
// Type: L
// Lines: 427771-427792
//
var ly2 = L(()=>{
    bA();
    getViewTransitionClassName();
    Cf();
    qV();
    z4();
    pushStartInstance();
    g1();
    Fz0();
    zB();
    ((mV = l(React runtime(), 1)), (XI1 = l(React runtime(), 1)));
});
function II1() {
    let A = xQ();
    if (A !== "macos" && A !== "linux" && A !== "wsl") return !1;
    let Q = process.execPath || process.argv[0] || "";
    if (Q.includes("/Caskroom/")) return (k(`Detected Homebrew cask installation: ${Q}`), !0);
    return !1;
}
var xHA;
