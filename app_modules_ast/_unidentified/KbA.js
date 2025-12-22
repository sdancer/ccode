// Module: KbA
// Type: L
// Lines: 501542-501574
//
var KbA = L(()=>{
    AzA();
    g1();
    L3();
});
function zD1(A, Q, B) {
    let G = uQ();
    if (!Q || !A.projectPath || A.projectPath === G) return {
        isCrossProject: !1
    };
    {
        let X = dX(A);
        return {
            isCrossProject: !0,
            isSameRepoWorktree: !1,
            command: `cd ${i6([
                A.projectPath
            ])} && claude --resume ${X}`,
            projectPath: A.projectPath
        };
    }
    if (B.some((X)=>A.projectPath === X || A.projectPath.startsWith(X + "/"))) return {
        isCrossProject: !0,
        isSameRepoWorktree: !0,
        projectPath: A.projectPath
    };
    let Y = dX(A);
    return {
        isCrossProject: !0,
        isSameRepoWorktree: !1,
        command: `cd ${i6([
            A.projectPath
        ])} && claude --resume ${Y}`,
        projectPath: A.projectPath
    };
}
