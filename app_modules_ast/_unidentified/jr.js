// Module: jr
// Type: L
// Lines: 391317-391343
//
var jr = L(()=>{
    pushStartInstance();
});
function ew(A, Q) {
    YO2.useEffect(()=>{
        (r("tengu_tool_use_show_permission_request", {
            messageID: A.assistantMessage.message.id,
            toolName: A.tool.name,
            isMcp: A.tool.isMcp ?? !1,
            decisionReasonType: A.permissionResult.decisionReason?.type,
            sandboxEnabled: MB.isSandboxingEnabled()
        }), Promise.resolve(Q.language_name).then((G)=>{
            KX({
                completion_type: Q.completion_type,
                event: "response",
                metadata: {
                    language_name: G,
                    message_id: A.assistantMessage.message.id,
                    platform: JQ.platform
                }
            });
        }));
    }, [
        A,
        Q
    ]);
}
var YO2;
