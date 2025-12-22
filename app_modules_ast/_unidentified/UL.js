// Module: UL
// Type: L
// Lines: 523022-523088
//
var renderElement = L(()=>{
    Rm1();
    aB();
    _m1();
    performWork();
    i0();
    getViewTransitionClassName();
    KKA();
    b8();
    zB();
    pushStartInstance();
    createRenderState();
    so();
    ER0();
    n6();
    Jf();
    s1();
    g1();
    createRenderState();
    KK0();
    A_();
    Nr();
    createRenderState();
    renderElement();
    Rr();
});
function BX7() {
    try {
        if (process.stdin.isTTY && typeof process.stdin.setRawMode === "function") (process.stdin.setRawMode(!1), process.stdin.unref());
    } catch  {}
}
function r6(A = 0, Q = "other", B) {
    ((process.exitCode = A), x8(A, Q, B).catch((G)=>{
        (k(`Graceful shutdown failed: ${G}`, {
            level: "error"
        }), process.exit(A));
    }));
}
async function x8(A = 0, Q = "other", B) {
    ((process.exitCode = A), BX7());
    try {
        let { executeSessionEndHooks: G } = await Promise.resolve().then(()=>(renderElement(), YV9));
        await G(Q, B);
    } catch  {}
    try {
        let G = (async ()=>{
            try {
                await GS0();
            } catch  {}
        })();
        (await Promise.race([
            G,
            new Promise((Z, Y)=>setTimeout(()=>Y(Error("Cleanup timeout")), 2000))
        ]), await Nm1(), process.exit(A));
    } catch  {
        (await Nm1(), process.exit(A));
    }
}
var JV9;
