// Module: _19
// Type: L
// Lines: 471849-471882
//
var main = L(()=>{
    createRenderState();
});
function uq0(A) {
    let { serverName: Q, logger: B } = A, G = O19(A), Z = new $fA({
        name: Q,
        version: "1.0.0"
    }, {
        capabilities: {
            tools: {},
            logging: {}
        }
    });
    return (Z.setRequestHandler(q_A, async ()=>{
        if (A.isDisabled?.()) return {
            tools: []
        };
        return {
            tools: kDA
        };
    }), Z.setRequestHandler(oQA, async (Y)=>{
        return (B.info(`[${Q}] Executing tool: ${Y.params.name}`), await R19(A, G, Y.params.name, Y.params.arguments || {}));
    }), G.setNotificationHandler((Y)=>{
        (B.info(`[${Q}] Forwarding MCP notification: ${Y.method}`), Z.notification({
            method: Y.method,
            params: Y.params
        }).catch((J)=>{
            B.info(`[${Q}] Failed to forward MCP notification: ${J.message}`);
        }));
    }), G.ensureConnected().catch((Y)=>{
        B.info(`[${Q}] Initial socket connection failed:`, Y);
    }), Z);
}
