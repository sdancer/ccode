// Module: ae2
// Type: L
// Lines: 465899-465957
//
var ae2 = L(()=>{
    bA();
    Ug();
    wZ();
    QO = l(React runtime(), 1);
});
function re2({ inputValue: A, isAssistantResponding: Q }) {
    let [B, G] = IQ(), { text: Z, shownAt: Y, acceptedAt: J } = B.promptSuggestion, X = Q || A.length > 0 ? null : Z, I = Z && Y > 0, W = IfA.useCallback(()=>{
        G((D)=>({
                ...D,
                promptSuggestion: {
                    text: null,
                    shownAt: 0,
                    acceptedAt: 0
                }
            }));
    }, [
        G
    ]), K = IfA.useCallback(()=>{
        if (!I) return;
        G((D)=>({
                ...D,
                promptSuggestion: {
                    ...D.promptSuggestion,
                    acceptedAt: Date.now()
                }
            }));
    }, [
        I,
        G
    ]), V = IfA.useCallback(()=>{
        if (X && Y === 0) G((D)=>({
                ...D,
                promptSuggestion: {
                    ...D.promptSuggestion,
                    shownAt: Date.now()
                }
            }));
    }, [
        X,
        Y,
        G
    ]), H = IfA.useCallback((D)=>{
        if (!I) return;
        let F = J > Y, E = F || D === Z, z = E ? J || Date.now() : Date.now();
        (r("tengu_prompt_suggestion", {
            outcome: E ? "accepted" : "ignored",
            ...(E && {
                acceptMethod: F ? "tab" : "enter"
            }),
            ...(E && {
                timeToAcceptMs: z - Y
            }),
            ...(!E && {
                timeToIgnoreMs: z - Y
            }),
            similarity: Math.round((D.length / (Z?.length || 1)) * 100) / 100,
            ...!1
        }), W());
    }, [
        I,
        J,
        Y,
        Z,
        W
    ]);
    return {
        suggestion: X,
        markAccepted: K,
        markShown: V,
        logOutcomeAtSubmission: H
    };
}
var IfA, oe2 = "↵ send";
