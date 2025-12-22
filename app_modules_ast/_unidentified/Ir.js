// Module: Ir
// Type: L
// Lines: 375674-375717
//
var Ir = L(()=>{
    K6();
    VW();
    getViewTransitionClassName();
    n6();
    uJ();
    s1();
    g1();
    bA();
    X2();
    createRenderState();
    A2();
    BN();
    R5();
    BJ();
    A2();
    HBA();
    TZ();
    Q9();
    pushStartInstance();
    KB();
    i0();
    rv();
    PZ1();
    zB();
    createRenderState();
    b8();
    JK0 = l(React runtime(), 1);
});
async function vz2() {
    let A = [], [Q, B, G, Z] = await Promise.all([
        SZ1(),
        Tz2(),
        Pz2(),
        DP()
    ]);
    if (Q) A.push({
        type: "not_logged_in"
    });
    if (!B) A.push({
        type: "no_remote_environment"
    });
    if (!G) A.push({
        type: "not_in_git_repo"
    });
    if (Z) {
        let [Y, J] = Z.split("/");
        if (Y && J) {
            if (!(await Sz2(Y, J))) A.push({
                type: "github_app_not_installed"
            });
        }
    }
    return A;
}
