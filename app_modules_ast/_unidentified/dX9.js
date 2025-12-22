// Module: dX9
// Type: L
// Lines: 505852-505908
//
var dX9 = L(()=>{
    bA();
    bA();
    createRenderState();
    g_();
    defaultOnDefaultTransitionIndicator();
    ZZ();
    uX9();
    trackUsedThenable();
    _Y();
    U4();
    b6();
    pW = l(React runtime(), 1);
});
function zM0(A) {
    if (!A) return "Agent type is required";
    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(A)) return "Agent type must start and end with alphanumeric characters and contain only letters, numbers, and hyphens";
    if (A.length < 3) return "Agent type must be at least 3 characters long";
    if (A.length > 50) return "Agent type must be less than 50 characters";
    return null;
}
function cX9(A, Q, B) {
    let G = [], Z = [];
    if (!A.agentType) G.push("Agent type is required");
    else {
        let J = zM0(A.agentType);
        if (J) G.push(J);
        let X = B.find((I)=>I.agentType === A.agentType && I.source !== A.source);
        if (X) G.push(`Agent type "${A.agentType}" already exists in ${DFA(X.source)}`);
    }
    if (!A.whenToUse) G.push("Description (description) is required");
    else if (A.whenToUse.length < 10) Z.push("Description should be more descriptive (at least 10 characters)");
    else if (A.whenToUse.length > 5000) Z.push("Description is very long (over 5000 characters)");
    if (A.tools !== void 0 && !Array.isArray(A.tools)) G.push("Tools must be an array");
    else {
        if (A.tools === void 0) Z.push("Agent has access to all tools");
        else if (A.tools.length === 0) Z.push("No tools selected - agent will have very limited capabilities");
        let J = Or(A, Q, !1);
        if (J.invalidTools.length > 0) G.push(`Invalid tools: ${J.invalidTools.join(", ")}`);
    }
    let Y = A.getSystemPrompt();
    if (!Y) G.push("System prompt is required");
    else if (Y.length < 20) G.push("System prompt is too short (minimum 20 characters)");
    else if (Y.length > 1e4) Z.push("System prompt is very long (over 10,000 characters)");
    return {
        isValid: G.length === 0,
        errors: G,
        warnings: Z
    };
}
