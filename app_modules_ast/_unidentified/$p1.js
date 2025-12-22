// Module: $p1
// Type: L
// Lines: 179390-179437
//
var pushStartInstance = L(()=>{
    bA();
    J7B();
    ((lU = l(React runtime(), 1)), (X7B = lU.createContext({
        marker: ""
    })), (cL8 = lU.createContext({
        marker: ""
    })));
    I7B.Item = NtA;
    UNA = I7B;
});
import { join as lL8 } from "path";
function K7B() {
    return Up1().filter(({ isCompletable: A, isEnabled: Q })=>A && Q).every(({ isComplete: A })=>A);
}
function XYA() {
    let A = sG();
    if (K7B() && !A.hasCompletedProjectOnboarding) tZ((Q)=>({
            ...Q,
            hasCompletedProjectOnboarding: !0
        }));
}
function Up1() {
    let A = vA().existsSync(lL8(i1(), "CLAUDE.md")), Q = D7B(i1());
    return [
        {
            key: "workspace",
            text: "Ask Claude to create a new app or clone a repository",
            isComplete: !1,
            isCompletable: !0,
            isEnabled: Q
        },
        {
            key: "claudemd",
            text: "Run /init to create a CLAUDE.md file with instructions for Claude",
            isComplete: A,
            isCompletable: !0,
            isEnabled: !Q
        }
    ];
}
function H7B() {
    tZ((A)=>({
            ...A,
            projectOnboardingSeenCount: A.projectOnboardingSeenCount + 1
        }));
}
var pL8, W7B, V7B;
