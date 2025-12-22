// Module: $c1
// Type: L
// Lines: 169597-169705
//
var createRenderState = L(()=>{
    urA();
    L1A();
    ((Z$8 = /^(?:\x1b)([a-zA-Z0-9])$/), (Y$8 = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/));
    s4B = {
        mode: "NORMAL",
        incomplete: "",
        pasteBuffer: ""
    };
    ((e4B = {
        OP: "f1",
        OQ: "f2",
        OR: "f3",
        OS: "f4",
        "[11~": "f1",
        "[12~": "f2",
        "[13~": "f3",
        "[14~": "f4",
        "[[A": "f1",
        "[[B": "f2",
        "[[C": "f3",
        "[[D": "f4",
        "[[E": "f5",
        "[15~": "f5",
        "[17~": "f6",
        "[18~": "f7",
        "[19~": "f8",
        "[20~": "f9",
        "[21~": "f10",
        "[23~": "f11",
        "[24~": "f12",
        "[A": "up",
        "[B": "down",
        "[C": "right",
        "[D": "left",
        "[E": "clear",
        "[F": "end",
        "[H": "home",
        OA: "up",
        OB: "down",
        OC: "right",
        OD: "left",
        OE: "clear",
        OF: "end",
        OH: "home",
        "[1~": "home",
        "[2~": "insert",
        "[3~": "delete",
        "[4~": "end",
        "[5~": "pageup",
        "[6~": "pagedown",
        "[[5~": "pageup",
        "[[6~": "pagedown",
        "[7~": "home",
        "[8~": "end",
        "[a": "up",
        "[b": "down",
        "[c": "right",
        "[d": "left",
        "[e": "clear",
        "[2$": "insert",
        "[3$": "delete",
        "[5$": "pageup",
        "[6$": "pagedown",
        "[7$": "home",
        "[8$": "end",
        Oa: "up",
        Ob: "down",
        Oc: "right",
        Od: "left",
        Oe: "clear",
        "[2^": "insert",
        "[3^": "delete",
        "[5^": "pageup",
        "[6^": "pagedown",
        "[7^": "home",
        "[8^": "end",
        "[Z": "tab"
    }), (A6B = [
        ...Object.values(e4B),
        "backspace"
    ]));
});
function W$8(A) {
    let Q = {
        upArrow: A.name === "up",
        downArrow: A.name === "down",
        leftArrow: A.name === "left",
        rightArrow: A.name === "right",
        pageDown: A.name === "pagedown",
        pageUp: A.name === "pageup",
        home: A.name === "home",
        end: A.name === "end",
        return: A.name === "return",
        escape: A.name === "escape",
        fn: A.fn,
        ctrl: A.ctrl,
        shift: A.shift,
        tab: A.name === "tab",
        backspace: A.name === "backspace",
        delete: A.name === "delete",
        meta: A.meta || A.name === "escape" || A.option
    }, B = A.ctrl ? A.name : A.sequence;
    if (B === void 0) B = "";
    if (A.name && A6B.includes(A.name)) B = "";
    if (B.startsWith("\x1B")) B = B.slice(1);
    if (B.length === 1 && typeof B[0] === "string" && B[0].toUpperCase() === B[0]) Q.shift = !0;
    return [
        Q,
        B
    ];
}
var RsA;
