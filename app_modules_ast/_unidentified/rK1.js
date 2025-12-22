// Module: rK1
// Type: L
// Lines: 460136-460153
//
var rK1 = L(()=>{
    bA();
    createRenderState();
    i4();
    GD0();
    U4();
    ((kW = l(React runtime(), 1)), (Ks2 = /(?:^|\n)(Shell cwd was reset to .+)$/));
});
function Vs2({ content: A, verbose: Q }) {
    let B = Z9(A, "bash-stdout") ?? "", G = Z9(A, "bash-stderr") ?? "";
    return kw0.createElement(z4A, {
        content: {
            stdout: B,
            stderr: G
        },
        verbose: !!Q
    });
}
var kw0;
