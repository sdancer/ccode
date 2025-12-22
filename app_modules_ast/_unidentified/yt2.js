// Module: yt2
// Type: L
// Lines: 463588-463658
//
var yt2 = L(()=>{
    bA();
    Pt2();
    _I();
    _S = l(React runtime(), 1);
});
import { homedir as v07 } from "os";
function DV1(A) {
    let Q = A.map((B)=>{
        let G = J1A(B.modified);
        return {
            text: (B.summary && B.summary !== "No prompt" ? B.summary : B.firstPrompt) || "",
            timestamp: G
        };
    });
    return {
        title: "Recent activity",
        lines: Q,
        footer: Q.length > 0 ? "/resume for more" : void 0,
        emptyMessage: "No recent activity"
    };
}
function xt2(A) {
    let Q = A.map((G)=>{
        return {
            text: G
        };
    }), B = "Check the Claude Code changelog for updates";
    return {
        title: "What's new",
        lines: Q,
        footer: Q.length > 0 ? "/release-notes for more" : void 0,
        emptyMessage: "Check the Claude Code changelog for updates"
    };
}
function vt2(A) {
    let B = A.filter(({ isEnabled: Z })=>Z).sort((Z, Y)=>Number(Z.isComplete) - Number(Y.isComplete)).map(({ text: Z, isComplete: Y })=>{
        return {
            text: `${Y ? `${B1.tick} ` : ""}${Z}`
        };
    }), G = i1() === v07() ? "Note: You have launched claude in your home directory. For the best experience, launch it in a project directory instead." : void 0;
    if (G) B.push({
        text: G
    });
    return {
        title: "Tips for getting started",
        lines: B
    };
}
function kt2() {
    return {
        title: "3 guest passes",
        lines: [],
        customContent: {
            content: S_.createElement(S_.Fragment, null, S_.createElement(T, {
                marginY: 1
            }, S_.createElement(C, {
                color: "claude"
            }, "[✻] [✻] [✻]")), S_.createElement(C, {
                dimColor: !0
            }, "Share Claude Code with friends")),
            width: 30
        },
        footer: "/passes"
    };
}
var S_;
