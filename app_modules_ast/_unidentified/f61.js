// Module: f61
// Type: L
// Lines: 277468-277494
//
var f61 = L(()=>{
    gIA = [
        "PreToolUse",
        "PostToolUse",
        "PostToolUseFailure",
        "Notification",
        "UserPromptSubmit",
        "SessionStart",
        "SessionEnd",
        "Stop",
        "SubagentStart",
        "SubagentStop",
        "PreCompact",
        "PermissionRequest"
    ];
});
function IlB(A) {
    return y80.filePatternTools.includes(A);
}
function WlB(A) {
    return y80.bashPrefixTools.includes(A);
}
function KlB(A) {
    return y80.customValidation[A];
}
var y80;
