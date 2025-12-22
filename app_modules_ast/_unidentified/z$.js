// Module: z$
// Type: L
// Lines: 318022-318065
//
var z$ = L(()=>{
    i0();
    ((fP = [
        "red",
        "blue",
        "green",
        "yellow",
        "purple",
        "orange",
        "pink",
        "cyan"
    ]), (E$ = {
        red: "red_FOR_SUBAGENTS_ONLY",
        blue: "blue_FOR_SUBAGENTS_ONLY",
        green: "green_FOR_SUBAGENTS_ONLY",
        yellow: "yellow_FOR_SUBAGENTS_ONLY",
        purple: "purple_FOR_SUBAGENTS_ONLY",
        orange: "orange_FOR_SUBAGENTS_ONLY",
        pink: "pink_FOR_SUBAGENTS_ONLY",
        cyan: "cyan_FOR_SUBAGENTS_ONLY"
    }));
});
function LQ2(A) {
    switch(A){
        case "allow":
            return "allowed";
        case "deny":
            return "denied";
        default:
            return "asked for confirmation for";
    }
}
function LG0(A) {
    if (q5A()) return D4Q(A);
    return A;
}
function AKA(A) {
    return A || q5A();
}
function OQ2(A) {
    return q5A() && A.status === 429;
}
