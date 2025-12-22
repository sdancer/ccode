// Module: tH9
// Type: L
// Lines: 528888-528955
//
var tH9 = L(()=>{
    PH0();
    iyA();
    KB();
    Q9();
    pushStartInstance();
    KB();
    eW7 = {
        name: "session_quality_classifier",
        async shouldRun (A) {
            if (A.querySource !== "repl_main_thread") return !1;
            return rH9(A.messages).length > 0;
        },
        buildMessages (A) {
            let Q = rH9(A.messages), B = sW7(Q);
            return [
                h0({
                    content: `Analyze the following conversation between a user and an assistant (assistant responses are hidden).

${B}

Think step-by-step about:
1. Does the user seem frustrated at the Asst based on their messages? Look for signs like repeated corrections, negative language, etc.
2. Has the user explicitly asked to SEND/CREATE/PUSH a pull request to GitHub? This means they want to actually submit a PR to a repository, not just work on code together or prepare changes. Look for explicit requests like: "create a pr", "send a pull request", "push a pr", "open a pr", "submit a pr to github", etc. Do NOT count mentions of working on a PR together, preparing for a PR, or discussing PR content.

Based on your analysis, output:
<frustrated>true/false</frustrated>
<pr_request>true/false</pr_request>`
                })
            ];
        },
        systemPrompt: "You are analyzing user messages from a conversation to detect certain features of the interaction.",
        useTools: !1,
        parseResponse (A) {
            return tW7(A);
        },
        logResult (A, Q) {
            if (A.type === "success") {
                let B = A.result;
                if (B.isFrustrated || B.hasPRRequest) r("tengu_session_quality_classification", {
                    uuid: A.uuid,
                    isFrustrated: B.isFrustrated ? 1 : 0,
                    hasPRRequest: B.hasPRRequest ? 1 : 0,
                    messageCount: Q.queryMessageCount
                });
            }
        },
        getModel: TH
    };
});
function eH9({ isFocused: A, isSelected: Q, children: B }) {
    return rbA.default.createElement(T, {
        gap: 1,
        paddingLeft: A ? 0 : 2
    }, A && rbA.default.createElement(C, {
        color: "suggestion"
    }, B1.pointer), rbA.default.createElement(C, {
        color: Q ? "success" : A ? "suggestion" : void 0
    }, B), Q && rbA.default.createElement(C, {
        color: "success"
    }, B1.tick));
}
var rbA;
