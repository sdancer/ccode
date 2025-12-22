// Module: NJ9
// Type: L
// Lines: 502160-502196
//
var main = L(()=>{
    lH1();
    ((tO0 = l(React runtime(), 1)), (qJ9 = {
        type: "local-jsx",
        name: "usage",
        description: "Show plan usage limits",
        isEnabled: ()=>!0,
        isHidden: !1,
        async call (A, Q) {
            return tO0.createElement(eDA, {
                onClose: A,
                context: Q,
                defaultTab: "Usage"
            });
        },
        userFacingName () {
            return "usage";
        }
    }));
});
function LG7() {
    b9("vim-mode");
    let Q = v1().editorMode || "normal";
    if (Q === "emacs") Q = "normal";
    let B = Q === "normal" ? "vim" : "normal";
    return (n0((G)=>({
            ...G,
            editorMode: B
        })), r("tengu_editor_mode_changed", {
        mode: B,
        source: "command"
    }), Promise.resolve({
        type: "text",
        value: `Editor mode set to ${B}. ${B === "vim" ? "Use Escape key to toggle between INSERT and NORMAL modes." : "Using standard (readline) keyboard bindings."}`
    }));
}
var OG7, LJ9;
