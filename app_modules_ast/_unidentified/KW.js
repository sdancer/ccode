// Module: KW
// Type: L
// Lines: 181686-181786
//
var pushStartInstance = L(()=>{
    i0();
    fN = [
        "userSettings",
        "projectSettings",
        "localSettings",
        "flagSettings",
        "policySettings"
    ];
});
import * as dtA from "path";
function IM8() {
    if (bp1 || gp1) return;
    bp1 = !0;
    let A = VM8();
    if (A.length === 0) return;
    (k(`Watching for changes in setting files ${A.join(", ")}...`), (HYA = ZGB.watch(A, {
        persistent: !0,
        ignoreInitial: !0,
        depth: 0,
        awaitWriteFinish: {
            stabilityThreshold: hp1?.stabilityThreshold ?? YM8,
            pollInterval: hp1?.pollInterval ?? JM8
        },
        ignored: (Q)=>Q.split(dtA.sep).some((B)=>B === ".git"),
        ignorePermissionErrors: !0,
        usePolling: !1,
        atomic: !0
    })), HYA.on("change", HM8), HYA.on("unlink", DM8), X3(async ()=>WGB()));
}
function WGB() {
    if (((gp1 = !0), HYA)) (HYA.close(), (HYA = null));
    (mtA.clear(), DYA.clear());
}
function WM8(A) {
    return (DYA.add(A), ()=>{
        DYA.delete(A);
    });
}
function KM8(A) {
    let Q = RC(A);
    if (Q) mtA.set(Q, Date.now());
}
function VM8() {
    let A = vA();
    return fN.map((Q)=>{
        let B = RC(Q);
        if (!B) return;
        try {
            if (!A.statSync(B).isFile()) return;
        } catch  {
            return;
        }
        return dtA.dirname(B);
    }).filter((Q)=>Q !== void 0);
}
function HM8(A) {
    let Q = KGB(A);
    if (!Q) return;
    let B = mtA.get(A);
    if (B && Date.now() - B < XM8) {
        mtA.delete(A);
        return;
    }
    (k(`Detected change to ${A}`), DYA.forEach((G)=>G(Q)));
}
function DM8(A) {
    let Q = KGB(A);
    if (!Q) return;
    (k(`Detected deletion of ${A}`), DYA.forEach((B)=>B(Q)));
}
function KGB(A) {
    return fN.find((Q)=>RC(Q) === A);
}
function FM8(A) {
    (k(`Programmatic settings change notification for ${A}`), DYA.forEach((Q)=>Q(A)));
}
function EM8(A) {
    ((bp1 = !1), (gp1 = !1), (hp1 = A ?? null));
}
var YM8 = 1000, JM8 = 500, XM8 = 5000, HYA = null, bp1 = !1, gp1 = !1, mtA, DYA, hp1 = null, MC;
