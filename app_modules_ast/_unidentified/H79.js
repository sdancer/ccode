// Module: H79
// Type: L
// Lines: 492259-492310
//
var read_string_buffer = L(()=>{
    bA();
    ZZ();
    LL0();
    s1();
    restoreViewTransitionName();
    GJ();
    V79();
    ML0 = l(React runtime(), 1);
});
import { join as R67, dirname as _67 } from "path";
import { homedir as j67 } from "os";
async function T67(A, Q) {
    let { code: B } = await T6("git", [
        "check-ignore",
        A
    ], {
        preserveOutputOnError: !1,
        cwd: Q
    });
    return B === 0;
}
function P67() {
    return R67(j67(), ".config", "git", "ignore");
}
async function RL0(A, Q = i1()) {
    try {
        if (!(await vl1(Q))) return;
        let B = `**/${A}`, G = A.endsWith("/") ? `${A}sample-file.txt` : A;
        if (await T67(G, Q)) return;
        let Z = P67(), Y = vA(), J = _67(Z);
        if (!Y.existsSync(J)) Y.mkdirSync(J);
        if (Y.existsSync(Z)) {
            if (Y.readFileSync(Z, {
                encoding: "utf-8"
            }).includes(B)) return;
            Y.appendFileSync(Z, `
${B}
`);
        } else Y.writeFileSync(Z, `${B}
`, {
            encoding: "utf-8",
            flush: !1
        });
    } catch (B) {
        t(B instanceof Error ? B : Error(String(B)));
    }
}
