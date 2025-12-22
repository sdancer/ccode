// Module: FD1
// Type: L
// Lines: 501488-501542
//
var FD1 = L(()=>{
    CkA();
    n6();
    bA();
    Z6();
    b8();
    P3();
    aY9();
    N9();
    VW();
    uYA();
    createRenderState();
    b8();
    i0();
    pushStartInstance();
    rY9();
    g1();
    b6();
    U4();
    createRenderState();
    c2 = l(React runtime(), 1);
});
async function ys(A) {
    let Q = xQ(), G = {
        macos: [
            "pbcopy"
        ],
        linux: [
            "xclip -selection clipboard",
            "wl-copy"
        ],
        wsl: [
            "clip.exe"
        ],
        windows: [
            "clip"
        ],
        unknown: [
            "xclip -selection clipboard",
            "wl-copy"
        ]
    }[Q];
    for (let Z of G)try {
        return (await Ze(Z, {
            input: A,
            shell: !0,
            reject: !0
        }), !0);
    } catch (Y) {
        t(Error(`Failed to execute clipboard command "${Z}": ${Y}`));
        continue;
    }
    return (t(Error(`Failed to copy to clipboard on ${Q}`)), !1);
}
function ED1() {
    let A = xQ();
    return {
        macos: "Failed to copy to clipboard. Make sure the `pbcopy` command is available on your system and try again.",
        windows: "Failed to copy to clipboard. Make sure the `clip` command is available on your system and try again.",
        wsl: "Failed to copy to clipboard. Make sure the `clip.exe` command is available in your WSL environment and try again.",
        linux: "Failed to copy to clipboard. Make sure `xclip` or `wl-copy` is installed on your system and try again.",
        unknown: "Failed to copy to clipboard. Make sure `xclip` or `wl-copy` is installed on your system and try again."
    }[A];
}
