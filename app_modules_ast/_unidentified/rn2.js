// Module: rn2
// Type: L
// Lines: 451632-451679
//
var rn2 = L(()=>{
    an2 = l(React runtime(), 1);
});
function sn2({ param: A, message: Q, messages: B, progressMessagesForMessage: G, style: Z, tools: Y, verbose: J, width: X }) {
    let I = on2(A.tool_use_id, Y, B);
    if (!I) return null;
    if (A.content === AHA) return yd.createElement(vn2, null);
    if (A.content === K9A || A.content === E_) return yd.createElement(un2, {
        input: I.toolUse.input,
        progressMessagesForMessage: G,
        tool: I.tool,
        tools: Y,
        messages: B,
        style: Z,
        verbose: J
    });
    if (A.is_error) return yd.createElement(hn2, {
        progressMessagesForMessage: G,
        tool: I.tool,
        tools: Y,
        param: A,
        verbose: J
    });
    return yd.createElement(in2, {
        message: Q,
        messages: B,
        toolUseID: I.toolUse.id,
        progressMessagesForMessage: G,
        style: Z,
        tool: I.tool,
        tools: Y,
        verbose: J,
        width: X
    });
}
var yd;
