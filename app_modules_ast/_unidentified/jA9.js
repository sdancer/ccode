// Module: jA9
// Type: L
// Lines: 468016-468065
//
var createRenderState = L(()=>{
    pushStartInstance();
    KB();
    KB();
    RA9();
    flushCompletedQueues();
    W0A();
    W0A();
    uJ();
    wZ();
    uf = l(React runtime(), 1);
});
function TA9(A, Q, B, G, Z, Y, J, X) {
    G(!0);
    let I = typeof A === "string" ? A : A.find((H)=>H.type === "text")?.text || "";
    BD2(I);
    let W = {};
    if (typeof A === "string") {
        let H = ON2(A), D = MN2(A);
        ((W = {
            is_negative: H,
            is_keep_going: D
        }), JD("user_prompt", {
            prompt_length: String(A.length),
            prompt: lG1(A)
        }));
    }
    if ((r("tengu_input_prompt", W), Q.length > 0)) {
        let H = h0({
            content: [
                ...Q,
                ...(typeof A === "string" ? [
                    {
                        type: "text",
                        text: A
                    }
                ] : A)
            ],
            uuid: Z,
            thinkingMetadata: Y,
            todos: X
        }), D = em([
            H
        ], J ?? void 0);
        return {
            messages: [
                H,
                ...B
            ],
            shouldQuery: !0,
            maxThinkingTokens: D > 0 ? D : void 0
        };
    }
    let K = h0({
        content: A,
        uuid: Z,
        thinkingMetadata: Y,
        todos: X
    }), V = em([
        K
    ], J ?? void 0);
    return {
        messages: [
            K,
            ...B
        ],
        shouldQuery: !0,
        maxThinkingTokens: V > 0 ? V : void 0
    };
}
