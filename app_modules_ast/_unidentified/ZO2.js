// Module: ZO2
// Type: L
// Lines: 391292-391317
//
var ZO2 = L(()=>{
    v2();
    pushStartInstance();
    mX();
    ((BO2 = l(React runtime(), 1)), (zJ5 = u.object({
        method: u.literal("log_event"),
        params: u.object({
            eventName: u.string(),
            eventData: u.object({}).passthrough()
        })
    })));
});
function KX(A) {
    r("tengu_unary_event", {
        event: A.event,
        completion_type: A.completion_type,
        language_name: A.metadata.language_name,
        message_id: A.metadata.message_id,
        platform: A.metadata.platform,
        ...(A.metadata.hasFeedback !== void 0 && {
            hasFeedback: A.metadata.hasFeedback
        })
    });
}
