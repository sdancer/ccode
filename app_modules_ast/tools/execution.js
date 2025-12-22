// Module: hq0
// Type: L
// Lines: 471032-471726
//
var main = L(()=>{
    M90();
    samplingCallback();
    F60();
    Y_A();
    $fA = class $fA extends R_A {
        constructor(A, Q){
            var B, G;
            super(Q);
            if (((this._serverInfo = A), (this._loggingLevels = new Map()), (this.LOG_LEVEL_SEVERITY = new Map(L_A.options.map((Z, Y)=>[
                    Z,
                    Y
                ]))), (this.isMessageIgnored = (Z, Y)=>{
                let J = this._loggingLevels.get(Y);
                return J ? this.LOG_LEVEL_SEVERITY.get(Z) < this.LOG_LEVEL_SEVERITY.get(J) : !1;
            }), (this._capabilities = (B = Q === null || Q === void 0 ? void 0 : Q.capabilities) !== null && B !== void 0 ? B : {}), (this._instructions = Q === null || Q === void 0 ? void 0 : Q.instructions), (this._jsonSchemaValidator = (G = Q === null || Q === void 0 ? void 0 : Q.jsonSchemaValidator) !== null && G !== void 0 ? G : new CjA()), this.setRequestHandler(h20, (Z)=>this._oninitialize(Z)), this.setNotificationHandler(n21, ()=>{
                var Z;
                return (Z = this.oninitialized) === null || Z === void 0 ? void 0 : Z.call(this);
            }), this._capabilities.logging)) this.setRequestHandler(a20, async (Z, Y)=>{
                var J;
                let X = Y.sessionId || ((J = Y.requestInfo) === null || J === void 0 ? void 0 : J.headers["mcp-session-id"]) || void 0, { level: I } = Z.params, W = L_A.safeParse(I);
                if (W.success) this._loggingLevels.set(X, W.data);
                return {};
            });
        }
        get experimental() {
            if (!this._experimental) this._experimental = {
                tasks: new bq0(this)
            };
            return this._experimental;
        }
        registerCapabilities(A) {
            if (this.transport) throw Error("Cannot register capabilities after connecting to transport");
            this._capabilities = X91(this._capabilities, A);
        }
        setRequestHandler(A, Q) {
            var B, G, Z;
            let Y = dXA(A), J = Y === null || Y === void 0 ? void 0 : Y.method;
            if (!J) throw Error("Schema is missing a method literal");
            let X;
            if (Ba(J)) {
                let W = J, K = (B = W._zod) === null || B === void 0 ? void 0 : B.def;
                X = (G = K === null || K === void 0 ? void 0 : K.value) !== null && G !== void 0 ? G : W.value;
            } else {
                let W = J, K = W._def;
                X = (Z = K === null || K === void 0 ? void 0 : K.value) !== null && Z !== void 0 ? Z : W.value;
            }
            if (typeof X !== "string") throw Error("Schema method literal must be a string");
            if (X === "tools/call") {
                let W = async (K, V)=>{
                    let H = aC(oQA, K);
                    if (!H.success) {
                        let z = H.error instanceof Error ? H.error.message : String(H.error);
                        throw new C9(w4.InvalidParams, `Invalid tools/call request: ${z}`);
                    }
                    let { params: D } = H.data, F = await Promise.resolve(Q(K, V));
                    if (D.task) {
                        let z = aC(vu, F);
                        if (!z.success) {
                            let $ = z.error instanceof Error ? z.error.message : String(z.error);
                            throw new C9(w4.InvalidParams, `Invalid task creation result: ${$}`);
                        }
                        return z.data;
                    }
                    let E = aC(oC, F);
                    if (!E.success) {
                        let z = E.error instanceof Error ? E.error.message : String(E.error);
                        throw new C9(w4.InvalidParams, `Invalid tools/call result: ${z}`);
                    }
                    return E.data;
                };
                return super.setRequestHandler(A, W);
            }
            return super.setRequestHandler(A, Q);
        }
        assertCapabilityForMethod(A) {
            var Q, B, G;
            switch(A){
                case "sampling/createMessage":
                    if (!((Q = this._clientCapabilities) === null || Q === void 0 ? void 0 : Q.sampling)) throw Error(`Client does not support sampling (required for ${A})`);
                    break;
                case "elicitation/create":
                    if (!((B = this._clientCapabilities) === null || B === void 0 ? void 0 : B.elicitation)) throw Error(`Client does not support elicitation (required for ${A})`);
                    break;
                case "roots/list":
                    if (!((G = this._clientCapabilities) === null || G === void 0 ? void 0 : G.roots)) throw Error(`Client does not support listing roots (required for ${A})`);
                    break;
                case "ping":
                    break;
            }
        }
        assertNotificationCapability(A) {
            var Q, B;
            switch(A){
                case "notifications/message":
                    if (!this._capabilities.logging) throw Error(`Server does not support logging (required for ${A})`);
                    break;
                case "notifications/resources/updated":
                case "notifications/resources/list_changed":
                    if (!this._capabilities.resources) throw Error(`Server does not support notifying about resources (required for ${A})`);
                    break;
                case "notifications/tools/list_changed":
                    if (!this._capabilities.tools) throw Error(`Server does not support notifying of tool list changes (required for ${A})`);
                    break;
                case "notifications/prompts/list_changed":
                    if (!this._capabilities.prompts) throw Error(`Server does not support notifying of prompt list changes (required for ${A})`);
                    break;
                case "notifications/elicitation/complete":
                    if (!((B = (Q = this._clientCapabilities) === null || Q === void 0 ? void 0 : Q.elicitation) === null || B === void 0 ? void 0 : B.url)) throw Error(`Client does not support URL elicitation (required for ${A})`);
                    break;
                case "notifications/cancelled":
                    break;
                case "notifications/progress":
                    break;
            }
        }
        assertRequestHandlerCapability(A) {
            if (!this._capabilities) return;
            switch(A){
                case "completion/complete":
                    if (!this._capabilities.completions) throw Error(`Server does not support completions (required for ${A})`);
                    break;
                case "logging/setLevel":
                    if (!this._capabilities.logging) throw Error(`Server does not support logging (required for ${A})`);
                    break;
                case "prompts/get":
                case "prompts/list":
                    if (!this._capabilities.prompts) throw Error(`Server does not support prompts (required for ${A})`);
                    break;
                case "resources/list":
                case "resources/templates/list":
                case "resources/read":
                    if (!this._capabilities.resources) throw Error(`Server does not support resources (required for ${A})`);
                    break;
                case "tools/call":
                case "tools/list":
                    if (!this._capabilities.tools) throw Error(`Server does not support tools (required for ${A})`);
                    break;
                case "tasks/get":
                case "tasks/list":
                case "tasks/result":
                case "tasks/cancel":
                    if (!this._capabilities.tasks) throw Error(`Server does not support tasks capability (required for ${A})`);
                    break;
                case "ping":
                case "initialize":
                    break;
            }
        }
        assertTaskCapability(A) {
            var Q, B;
            M41((B = (Q = this._clientCapabilities) === null || Q === void 0 ? void 0 : Q.tasks) === null || B === void 0 ? void 0 : B.requests, A, "Client");
        }
        assertTaskHandlerCapability(A) {
            var Q;
            if (!this._capabilities) return;
            O41((Q = this._capabilities.tasks) === null || Q === void 0 ? void 0 : Q.requests, A, "Server");
        }
        async _oninitialize(A) {
            let Q = A.params.protocolVersion;
            return ((this._clientCapabilities = A.params.capabilities), (this._clientVersion = A.params.clientInfo), {
                protocolVersion: c21.includes(Q) ? Q : Ga,
                capabilities: this.getCapabilities(),
                serverInfo: this._serverInfo,
                ...(this._instructions && {
                    instructions: this._instructions
                })
            });
        }
        getClientCapabilities() {
            return this._clientCapabilities;
        }
        getClientVersion() {
            return this._clientVersion;
        }
        getCapabilities() {
            return this._capabilities;
        }
        async ping() {
            return this.request({
                method: "ping"
            }, xu);
        }
        async createMessage(A, Q) {
            var B, G;
            if (A.tools || A.toolChoice) {
                if (!((G = (B = this._clientCapabilities) === null || B === void 0 ? void 0 : B.sampling) === null || G === void 0 ? void 0 : G.tools)) throw Error("Client does not support sampling tools capability.");
            }
            if (A.messages.length > 0) {
                let Z = A.messages[A.messages.length - 1], Y = Array.isArray(Z.content) ? Z.content : [
                    Z.content
                ], J = Y.some((K)=>K.type === "tool_result"), X = A.messages.length > 1 ? A.messages[A.messages.length - 2] : void 0, I = X ? (Array.isArray(X.content) ? X.content : [
                    X.content
                ]) : [], W = I.some((K)=>K.type === "tool_use");
                if (J) {
                    if (Y.some((K)=>K.type !== "tool_result")) throw Error("The last message must contain only tool_result content if any is present");
                    if (!W) throw Error("tool_result blocks are not matching any tool_use from the previous message");
                }
                if (W) {
                    let K = new Set(I.filter((H)=>H.type === "tool_use").map((H)=>H.id)), V = new Set(Y.filter((H)=>H.type === "tool_result").map((H)=>H.toolUseId));
                    if (K.size !== V.size || ![
                        ...K
                    ].every((H)=>V.has(H))) throw Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
                }
            }
            if (A.tools) return this.request({
                method: "sampling/createMessage",
                params: A
            }, r20, Q);
            return this.request({
                method: "sampling/createMessage",
                params: A
            }, O_A, Q);
        }
        async elicitInput(A, Q) {
            var B, G, Z, Y, J;
            switch((B = A.mode) !== null && B !== void 0 ? B : "form"){
                case "url":
                    {
                        if (!((Z = (G = this._clientCapabilities) === null || G === void 0 ? void 0 : G.elicitation) === null || Z === void 0 ? void 0 : Z.url)) throw Error("Client does not support url elicitation.");
                        let I = A;
                        return this.request({
                            method: "elicitation/create",
                            params: I
                        }, oXA, Q);
                    }
                case "form":
                    {
                        if (!((J = (Y = this._clientCapabilities) === null || Y === void 0 ? void 0 : Y.elicitation) === null || J === void 0 ? void 0 : J.form)) throw Error("Client does not support form elicitation.");
                        let I = A.mode === "form" ? A : {
                            ...A,
                            mode: "form"
                        }, W = await this.request({
                            method: "elicitation/create",
                            params: I
                        }, oXA, Q);
                        if (W.action === "accept" && W.content && I.requestedSchema) try {
                            let V = this._jsonSchemaValidator.getValidator(I.requestedSchema)(W.content);
                            if (!V.valid) throw new C9(w4.InvalidParams, `Elicitation response content does not match requested schema: ${V.errorMessage}`);
                        } catch (K) {
                            if (K instanceof C9) throw K;
                            throw new C9(w4.InternalError, `Error validating elicitation response: ${K instanceof Error ? K.message : String(K)}`);
                        }
                        return W;
                    }
            }
        }
        createElicitationCompletionNotifier(A, Q) {
            var B, G;
            if (!((G = (B = this._clientCapabilities) === null || B === void 0 ? void 0 : B.elicitation) === null || G === void 0 ? void 0 : G.url)) throw Error("Client does not support URL elicitation (required for notifications/elicitation/complete)");
            return ()=>this.notification({
                    method: "notifications/elicitation/complete",
                    params: {
                        elicitationId: A
                    }
                }, Q);
        }
        async listRoots(A, Q) {
            return this.request({
                method: "roots/list",
                params: A
            }, e20, Q);
        }
        async sendLoggingMessage(A, Q) {
            if (this._capabilities.logging) {
                if (!this.isMessageIgnored(A.level, Q)) return this.notification({
                    method: "notifications/message",
                    params: A
                });
            }
        }
        async sendResourceUpdated(A) {
            return this.notification({
                method: "notifications/resources/updated",
                params: A
            });
        }
        async sendResourceListChanged() {
            return this.notification({
                method: "notifications/resources/list_changed"
            });
        }
        async sendToolListChanged() {
            return this.notification({
                method: "notifications/tools/list_changed"
            });
        }
        async sendPromptListChanged() {
            return this.notification({
                method: "notifications/prompts/list_changed"
            });
        }
    };
});
import { promises as iQ7 } from "fs";
import { platform as nQ7 } from "os";
import { createConnection as aQ7 } from "net";
function oQ7(A) {
    return "result" in A || "error" in A;
}
function rQ7(A) {
    return "method" in A && typeof A.method === "string";
}
class L19 {
    socket = null;
    connected = !1;
    connecting = !1;
    responseCallback = null;
    notificationHandler = null;
    responseBuffer = Buffer.alloc(0);
    reconnectAttempts = 0;
    maxReconnectAttempts = 10;
    reconnectDelay = 1000;
    reconnectTimer = null;
    context;
    constructor(A){
        this.context = A;
    }
    async connect() {
        let { serverName: A, logger: Q } = this.context;
        if (this.connecting) {
            Q.info(`[${A}] Already connecting, skipping duplicate attempt`);
            return;
        }
        (this.closeSocket(), (this.connecting = !0));
        let B = this.context.socketPath;
        Q.info(`[${A}] Attempting to connect to: ${B}`);
        try {
            await this.validateSocketSecurity(B);
        } catch (G) {
            ((this.connecting = !1), Q.info(`[${A}] Security validation failed:`, G));
            return;
        }
        ((this.socket = aQ7(B)), this.socket.on("connect", ()=>{
            ((this.connected = !0), (this.connecting = !1), (this.reconnectAttempts = 0), Q.info(`[${A}] Successfully connected to bridge server`));
        }), this.socket.on("data", (G)=>{
            this.responseBuffer = Buffer.concat([
                this.responseBuffer,
                G
            ]);
            while(this.responseBuffer.length >= 4){
                let Z = this.responseBuffer.readUInt32LE(0);
                if (this.responseBuffer.length < 4 + Z) break;
                let Y = this.responseBuffer.slice(4, 4 + Z);
                this.responseBuffer = this.responseBuffer.slice(4 + Z);
                try {
                    let J = JSON.parse(Y.toString("utf-8"));
                    if (rQ7(J)) {
                        if ((Q.info(`[${A}] Received notification: ${J.method}`), this.notificationHandler)) this.notificationHandler(J);
                    } else if (oQ7(J)) (Q.info(`[${A}] Received tool response: ${J}`), this.handleResponse(J));
                    else Q.info(`[${A}] Received unknown message: ${J}`);
                } catch (J) {
                    Q.info(`[${A}] Failed to parse message:`, J);
                }
            }
        }), this.socket.on("error", (G)=>{
            if ((Q.info(`[${A}] Socket error:`, G), (this.connected = !1), (this.connecting = !1), G.code && [
                "ECONNREFUSED",
                "ECONNRESET",
                "EPIPE"
            ].includes(G.code))) this.scheduleReconnect();
        }), this.socket.on("close", ()=>{
            ((this.connected = !1), (this.connecting = !1), this.scheduleReconnect());
        }));
    }
    scheduleReconnect() {
        let { serverName: A, logger: Q } = this.context;
        if (this.reconnectTimer) {
            Q.info(`[${A}] Reconnect already scheduled, skipping`);
            return;
        }
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            (Q.info(`[${A}] Max reconnection attempts reached`), this.cleanup());
            return;
        }
        this.reconnectAttempts++;
        let B = Math.min(this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts - 1), 30000);
        (Q.info(`[${A}] Reconnecting in ${Math.round(B)}ms (attempt ${this.reconnectAttempts})`), (this.reconnectTimer = setTimeout(()=>{
            ((this.reconnectTimer = null), this.connect());
        }, B)));
    }
    handleResponse(A) {
        if (this.responseCallback) {
            let Q = this.responseCallback;
            ((this.responseCallback = null), Q(A));
        }
    }
    setNotificationHandler(A) {
        this.notificationHandler = A;
    }
    async ensureConnected() {
        let { serverName: A } = this.context;
        if (this.connected && this.socket) return !0;
        if (!this.socket && !this.connecting) await this.connect();
        return new Promise((Q, B)=>{
            let G = setTimeout(()=>{
                B(new _4A(`[${A}] Connection attempt timed out after 5000ms`));
            }, 5000), Z = ()=>{
                if (this.connected) (clearTimeout(G), Q(!0));
                else setTimeout(Z, 100);
            };
            Z();
        });
    }
    async sendRequest(A, Q = 30000) {
        let { serverName: B } = this.context;
        if (!this.socket) throw new _4A(`[${B}] Cannot send request: not connected`);
        let G = this.socket;
        return new Promise((Z, Y)=>{
            let J = setTimeout(()=>{
                ((this.responseCallback = null), Y(new _4A(`[${B}] Tool request timed out after ${Q}ms`)));
            }, Q);
            this.responseCallback = (V)=>{
                (clearTimeout(J), Z(V));
            };
            let X = JSON.stringify(A), I = Buffer.from(X, "utf-8"), W = Buffer.allocUnsafe(4);
            W.writeUInt32LE(I.length, 0);
            let K = Buffer.concat([
                W,
                I
            ]);
            G.write(K);
        });
    }
    async callTool(A, Q) {
        let B = {
            method: "execute_tool",
            params: {
                client_id: this.context.clientTypeId,
                tool: A,
                args: Q
            }
        };
        return this.sendRequestWithRetry(B);
    }
    async sendRequestWithRetry(A) {
        let { serverName: Q, logger: B } = this.context;
        try {
            return await this.sendRequest(A);
        } catch (G) {
            if (!(G instanceof _4A)) throw G;
            return (B.info(`[${Q}] Connection error, forcing reconnect and retrying: ${G.message}`), this.closeSocket(), await this.ensureConnected(), await this.sendRequest(A));
        }
    }
    isConnected() {
        return this.connected;
    }
    closeSocket() {
        if (this.socket) (this.socket.removeAllListeners(), this.socket.end(), this.socket.destroy(), (this.socket = null));
        ((this.connected = !1), (this.connecting = !1));
    }
    cleanup() {
        if (this.reconnectTimer) (clearTimeout(this.reconnectTimer), (this.reconnectTimer = null));
        (this.closeSocket(), (this.reconnectAttempts = 0), (this.responseBuffer = Buffer.alloc(0)), (this.responseCallback = null));
    }
    disconnect() {
        this.cleanup();
    }
    async validateSocketSecurity(A) {
        let { serverName: Q, logger: B } = this.context;
        if (nQ7() === "win32") return;
        try {
            let G = await iQ7.stat(A);
            if (!G.isSocket()) throw Error(`[${Q}] Path exists but it's not a socket: ${A}`);
            let Z = G.mode & 511;
            if (Z !== 384) throw Error(`[${Q}] Insecure socket permissions: ${Z.toString(8)} (expected 0600). Socket may have been tampered with. `);
            let Y = process.getuid?.();
            if (Y !== void 0 && G.uid !== Y) throw Error(`Socket not owned by current user (uid: ${Y}, socket uid: ${G.uid}). Potential security risk.`);
            B.info(`[${Q}] Socket security validation passed`);
        } catch (G) {
            if (G.code === "ENOENT") {
                B.info(`[${Q}] Socket not found, will be created by server`);
                return;
            }
            throw G;
        }
    }
}
function O19(A) {
    return new L19(A);
}
var _4A;
