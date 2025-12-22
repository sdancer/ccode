// Module: E_0
// Type: L
// Lines: 532676-532915
//
var E_0 = L(()=>{
    v2();
    FR0();
    OK();
    ((dRJ = f2.object({
        tool_name: f2.string().describe("The name of the tool requesting permission"),
        input: f2.record(f2.unknown()).describe("The input for the tool"),
        tool_use_id: f2.string().optional().describe("The unique tool use request ID")
    })), (mK7 = f2.object({
        behavior: f2.literal("allow"),
        updatedInput: f2.record(f2.unknown()),
        updatedPermissions: f2.array(iD1).optional(),
        toolUseID: f2.string().optional()
    })), (dK7 = f2.object({
        behavior: f2.literal("deny"),
        message: f2.string(),
        interrupt: f2.boolean().optional(),
        toolUseID: f2.string().optional()
    })), (yF1 = f2.union([
        mK7,
        dK7
    ])));
});
import { randomUUID as cK7 } from "crypto";
function pK7(A) {
    if (!A) return;
    switch(A.type){
        case "rule":
        case "mode":
        case "subcommandResults":
        case "permissionPromptTool":
            return;
        case "hook":
        case "asyncAgent":
        case "sandboxOverride":
        case "classifier":
        case "workingDir":
        case "other":
            return A.reason;
    }
}
class GhA {
    input;
    replayUserMessages;
    structuredInput;
    pendingRequests = new Map();
    inputClosed = !1;
    unexpectedResponseCallback;
    constructor(A, Q){
        this.input = A;
        this.replayUserMessages = Q;
        ((this.input = A), (this.structuredInput = this.read()));
    }
    async *read() {
        let A = "";
        for await (let Q of this.input){
            A += Q;
            let B;
            while((B = A.indexOf(`
`)) !== -1){
                let G = A.slice(0, B);
                A = A.slice(B + 1);
                let Z = await this.processLine(G);
                if (Z) yield Z;
            }
        }
        if (A) {
            let Q = await this.processLine(A);
            if (Q) yield Q;
        }
        this.inputClosed = !0;
        for (let Q of this.pendingRequests.values())Q.reject(Error("Tool permission stream closed before response received"));
    }
    getPendingPermissionRequests() {
        return this.pendingRequests.values().map((A)=>A.request).filter((A)=>A.request.subtype === "can_use_tool").toArray();
    }
    setUnexpectedResponseCallback(A) {
        this.unexpectedResponseCallback = A;
    }
    async processLine(A) {
        try {
            let Q = JSON.parse(A);
            if (Q.type === "keep_alive") return;
            if (Q.type === "control_response") {
                let B = this.pendingRequests.get(Q.response.request_id);
                if (!B) {
                    if (this.unexpectedResponseCallback) await this.unexpectedResponseCallback(Q);
                    return;
                }
                if ((this.pendingRequests.delete(Q.response.request_id), Q.response.subtype === "error")) {
                    B.reject(Error(Q.response.error));
                    return;
                }
                let G = Q.response.response;
                if (B.schema) try {
                    B.resolve(B.schema.parse(G));
                } catch (Z) {
                    B.reject(Z);
                }
                else B.resolve({});
                if (this.replayUserMessages) return Q;
                return;
            }
            if (Q.type !== "user" && Q.type !== "control_request") z_0(`Error: Expected message type 'user' or 'control', got '${Q.type}'`);
            if (Q.type === "control_request") {
                if (!Q.request) z_0("Error: Missing request on control_request");
                return Q;
            }
            if (Q.message.role !== "user") z_0(`Error: Expected message role 'user', got '${Q.message.role}'`);
            return Q;
        } catch (Q) {
            (console.error(`Error parsing streaming input line: ${A}: ${Q}`), process.exit(1));
        }
    }
    write(A) {
        o9(JSON.stringify(A) + `
`);
    }
    async sendRequest(A, Q, B) {
        let G = cK7(), Z = {
            type: "control_request",
            request_id: G,
            request: A
        };
        if (this.inputClosed) throw Error("Stream closed");
        if (B?.aborted) throw Error("Request aborted");
        this.write(Z);
        let Y = ()=>{
            this.write({
                type: "control_cancel_request",
                request_id: G
            });
            let J = this.pendingRequests.get(G);
            if (J) J.reject(new RX());
        };
        if (B) B.addEventListener("abort", Y, {
            once: !0
        });
        try {
            return await new Promise((J, X)=>{
                this.pendingRequests.set(G, {
                    request: {
                        type: "control_request",
                        request_id: G,
                        request: A
                    },
                    resolve: (I)=>{
                        J(I);
                    },
                    reject: X,
                    schema: Q
                });
            });
        } finally{
            if (B) B.removeEventListener("abort", Y);
            this.pendingRequests.delete(G);
        }
    }
    createCanUseTool() {
        return async (A, Q, B, G, Z)=>{
            let Y = await X$(A, Q, B, G, Z);
            if (Y.behavior === "allow" || Y.behavior === "deny") return Y;
            try {
                let J = await this.sendRequest({
                    subtype: "can_use_tool",
                    tool_name: A.name,
                    input: Q,
                    permission_suggestions: Y.suggestions,
                    blocked_path: Y.blockedPath,
                    decision_reason: pK7(Y.decisionReason),
                    tool_use_id: Z,
                    agent_id: B.agentId
                }, yF1, B.abortController.signal);
                return BhA(J, A, Q, B);
            } catch (J) {
                return BhA({
                    behavior: "deny",
                    message: `Tool permission request failed: ${J}`,
                    toolUseID: Z
                }, A, Q, B);
            }
        };
    }
    createHookCallback(A, Q) {
        return {
            type: "callback",
            timeout: Q,
            callback: async (B, G, Z)=>{
                try {
                    return await this.sendRequest({
                        subtype: "hook_callback",
                        callback_id: A,
                        input: B,
                        tool_use_id: G || void 0
                    }, nD1, Z);
                } catch (Y) {
                    return (console.error(`Error in hook callback ${A}:`, Y), {});
                }
            }
        };
    }
    async sendMcpMessage(A, Q) {
        return (await this.sendRequest({
            subtype: "mcp_message",
            server_name: A,
            message: Q
        }, u.object({
            mcp_response: u.any()
        }))).mcp_response;
    }
}
function z_0(A) {
    (console.error(A), process.exit(1));
}
