// Module: PH9
// Type: L
// Lines: 528284-528355
//
var PH9 = L(()=>{
    bA();
    K8();
    bA();
    restoreViewTransitionName();
    N9();
    X2();
    dz = l(React runtime(), 1);
});
import { realpathSync as xW7, existsSync as vW7 } from "fs";
async function SH9() {
    try {
        let A = await DP();
        if (!A) {
            k("Not in a GitHub repository, skipping path mapping update");
            return;
        }
        let Q;
        try {
            Q = xW7(uQ());
        } catch  {
            Q = uQ();
        }
        let B = A.toLowerCase(), Z = v1().githubRepoPaths?.[B] ?? [];
        if (Z.includes(Q)) {
            k(`Path ${Q} already tracked for repo ${B}`);
            return;
        }
        let Y = [
            Q,
            ...Z
        ];
        (n0((J)=>({
                ...J,
                githubRepoPaths: {
                    ...J.githubRepoPaths,
                    [B]: Y
                }
            })), k(`Added ${Q} to tracked paths for repo ${B}`));
    } catch (A) {
        k(`Error updating repo path mapping: ${A}`);
    }
}
function yH9(A) {
    let Q = v1(), B = A.toLowerCase();
    return Q.githubRepoPaths?.[B] ?? [];
}
function xH9(A) {
    return A.filter((Q)=>vW7(Q));
}
async function vH9(A, Q) {
    try {
        let { stdout: B, code: G } = await T6("git", [
            "remote",
            "get-url",
            "origin"
        ], {
            cwd: A,
            preserveOutputOnError: !1
        });
        if (G !== 0 || !B) return !1;
        let Z = VBA(B.trim());
        if (!Z) return !1;
        return Z.toLowerCase() === Q.toLowerCase();
    } catch  {
        return !1;
    }
}
function kH9(A, Q) {
    let B = v1(), G = A.toLowerCase(), Z = B.githubRepoPaths?.[G] ?? [], Y = Z.filter((X)=>X !== Q);
    if (Y.length === Z.length) return;
    let J = {
        ...B.githubRepoPaths
    };
    if (Y.length === 0) delete J[G];
    else J[G] = Y;
    (n0((X)=>({
            ...X,
            githubRepoPaths: J
        })), k(`Removed ${Q} from tracked paths for repo ${G}`));
}
