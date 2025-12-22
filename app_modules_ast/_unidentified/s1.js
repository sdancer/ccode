// Module: s1
// Type: L
// Lines: 2560-2635
//
var s1 = L(()=>{
    n2();
    Sj0();
    restoreViewTransitionName();
    aQ();
    i0();
    pushStartInstance();
    ((O8A = Y0(()=>{
        return (V0(process.env.DEBUG) || V0(process.env.DEBUG_SDK) || process.argv.includes("--debug") || process.argv.includes("-d") || Ly() || process.argv.some((A)=>A.startsWith("--debug=")));
    })), (Tq9 = Y0(()=>{
        let A = process.argv.find((B)=>B.startsWith("--debug="));
        if (!A) return null;
        let Q = A.substring(8);
        return Tj0(Q);
    })), (Ly = Y0(()=>{
        return (process.argv.includes("--debug-to-stderr") || process.argv.includes("-d2e"));
    })));
    yq9 = Y0(()=>{
        if (process.argv[2] === "--ripgrep") return;
        try {
            let A = nt(), Q = hE1(A), B = ZS0(Q, "latest");
            if (!vA().existsSync(Q)) vA().mkdirSync(Q);
            if (vA().existsSync(B)) try {
                vA().unlinkSync(B);
            } catch  {}
            vA().symlinkSync(A, B);
        } catch  {}
    });
});
function XS0(A) {
    if (ec !== null) throw Error("Analytics sink already attached - cannot attach more than once");
    if (((ec = A), _EA.length > 0)) {
        let Q = [
            ..._EA
        ];
        ((_EA.length = 0), queueMicrotask(()=>{
            for (let B of Q)if (B.async) ec.logEventAsync(B.eventName, B.metadata);
            else ec.logEvent(B.eventName, B.metadata);
        }));
    }
}
function r(A, Q) {
    if (ec === null) {
        _EA.push({
            eventName: A,
            metadata: Q,
            async: !1
        });
        return;
    }
    ec.logEvent(A, Q);
}
async function Ap(A, Q) {
    if (ec === null) {
        _EA.push({
            eventName: A,
            metadata: Q,
            async: !0
        });
        return;
    }
    await ec.logEventAsync(A, Q);
}
var _EA, ec = null;
