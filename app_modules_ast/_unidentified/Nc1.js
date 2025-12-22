// Module: Nc1
// Type: L
// Lines: 170288-170333
//
var Nc1 = L(()=>{
    RZA();
    $$8 = MZA + String.fromCharCode(JT.OSC);
    WT = {
        SET_TITLE_AND_ICON: 0,
        SET_ICON: 1,
        SET_TITLE: 2,
        SET_COLOR: 4,
        SET_CWD: 7,
        HYPERLINK: 8,
        ITERM2: 9,
        SET_FG_COLOR: 10,
        SET_BG_COLOR: 11,
        SET_CURSOR_COLOR: 12,
        CLIPBOARD: 52,
        RESET_COLOR: 104,
        RESET_FG_COLOR: 110,
        RESET_BG_COLOR: 111,
        RESET_CURSOR_COLOR: 112,
        SEMANTIC_PROMPT: 133
    };
    ((CZG = P1A(WT.HYPERLINK, "", "")), (BNA = {
        NOTIFY: 0,
        BADGE: 2,
        PROGRESS: 4
    }), (GNA = {
        CLEAR: 0,
        SET: 1,
        ERROR: 2,
        INDETERMINATE: 3
    }));
});
function w$8() {
    return process.platform === "win32" && !!process.env.WT_SESSION;
}
function q$8() {
    if (w$8()) return !0;
    if (process.platform === "win32" && process.env.TERM_PROGRAM === "vscode" && process.env.TERM_PROGRAM_VERSION) return !0;
    return !1;
}
function Lc1() {
    if (process.platform === "win32") if (q$8()) return grA + Hd1 + Vd1;
    else return grA + U$8;
    return grA + Hd1 + Vd1;
}
var U$8, wZG;
