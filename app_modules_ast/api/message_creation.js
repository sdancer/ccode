// Module: ME9
// Type: L
// Lines: 537905-538920
//
var renderElement = L(()=>{
    at();
    RH9();
    gH9();
    updateProperties();
    samplingCallback();
    I5();
    Y1A();
    obA();
    stripOptionsFromArgs();
    createRenderState();
    tH9();
    yH0();
    createRenderState();
    AxA();
    SoA();
    bA();
    samplingCallback();
    Gf();
    samplingCallback();
    renderElement();
    pushStartInstance();
    dr();
    n6();
    WD9();
    HD9();
    RoA();
    FVA();
    jDA();
    L3();
    getViewTransitionClassName();
    A2();
    createRenderState();
    EKA();
    pushStartInstance();
    pushStartInstance();
    g1();
    b8();
    wk();
    b8();
    pushStartInstance();
    zyA();
    wL0();
    jq0();
    Y_0();
    vD9();
    WL0();
    fD9();
    U$();
    Q9();
    preload();
    zB();
    bD9();
    createRenderState();
    dD9();
    createRenderState();
    aQ();
    B$();
    IS();
    PTA();
    jM0();
    wW();
    createRenderState();
    NM0();
    pushStartInstance();
    XL();
    createRenderState();
    $2();
    createRenderState();
    dM0();
    fDA();
    VW();
    i0();
    QF9();
    aQ();
    eI();
    createRenderState();
    pE0();
    b8();
    _Y();
    T31();
    XF9();
    z4();
    zF9();
    pushStartInstance();
    Wq0();
    pushViewTransitionAttributes();
    x9A();
    Cf();
    Lu();
    CF9();
    mN();
    UF9();
    qF9();
    main();
    createRenderState();
    xy();
    getViewTransitionClassName();
    createRenderState();
    vM();
    HN0();
    createRenderState();
    Ag();
    i0();
    X2();
    pushViewTransitionAttributes();
    NF9();
    createRenderState();
    KKA();
    i0();
    hK();
    s1();
    OF9();
    pushStartInstance();
    jF9();
    PF9();
    yF9();
    vF9();
    uYA();
    sF9();
    AE9();
    zfA();
    pushStartInstance();
    K6();
    prepareToHydrateHostInstance();
    Ir();
    rv();
    wF1();
    YE9();
    pushStartInstance();
    EE9();
    samplingCallback();
    eyA();
    KJ();
    pushStartInstance();
    uJ();
    lR();
    LI();
    zk();
    bG0();
    restoreViewTransitionName();
    createRenderState();
    aB();
    UD1();
    lq0();
    pushStartInstance();
    J_0();
    _DA();
    rm();
    $E9();
    EI();
    Q_0();
    sH();
    TFA();
    renderChildrenArray();
    renderElement();
    u5 = l(React runtime(), 1);
    k9("main_tsx_entry");
    k9("main_tsx_imports_loaded");
    if (LV7()) process.exit(1);
});
at();
s1();
sH();
renderElement();
renderElement();
n6();
main();
getViewTransitionClassName();
z4();
pushStartInstance();
iXA();
R5();
mR0();
createRenderState();
cR0();
pR0();
lR0();
zF1();
samplingCallback();
sH();
TFA();
import { readFileSync as WW7, existsSync as KW7 } from "fs";
var oR0, XH9 = !1;
function IH9() {
    if (oR0 === void 0) oR0 = JH9();
    return oR0;
}
function mz() {
    let A = ss(), Q = IH9();
    if (!XH9) {
        if (((XH9 = !0), A && Q === null)) {
            let B = CF1(), G = RFA();
            console.error(V1.yellow(`Warning: MCP endpoint file not found at ${B} (session: ${G}). Falling back to state file.`));
        }
    }
    return A && Q !== null;
}
class lbA extends Error {
    constructor(A){
        super(A);
        this.name = "ConnectionFailedError";
    }
}
async function ibA(A, Q, B, G) {
    let Z = Date.now();
    try {
        let Y = await Q();
        if (!mz()) {
            let J = typeof B === "function" ? B(Y) : B || {};
            await Ap("tengu_mcp_cli_command_executed", {
                command: A,
                success: !0,
                duration_ms: Date.now() - Z,
                ...J
            });
        }
        return {
            success: !0,
            data: Y
        };
    } catch (Y) {
        let J = Y instanceof Error ? Y : Error(String(Y));
        if ((console.error(V1.red("Error:"), J.message), !mz())) {
            let X = typeof B === "object" ? B : {};
            await Ap("tengu_mcp_cli_command_executed", {
                command: A,
                success: !1,
                error_type: J.constructor.name,
                duration_ms: Date.now() - Z,
                ...X,
                ...G
            });
        }
        return {
            success: !1,
            error: J
        };
    }
}
function ts() {
    let A = GF1();
    if (!KW7(A)) {
        let Q = RFA();
        throw Error(`MCP state file not found at ${A} (session: ${Q}). Is Claude Code running?`);
    }
    try {
        return JSON.parse(WW7(A, "utf-8"));
    } catch (Q) {
        throw Error(`Error reading MCP state file ${A}: ${Q instanceof Error ? Q.message : String(Q)}`);
    }
}
function WH9(A, Q) {
    if (A.configs?.[Q]) return A.configs[Q];
    let B = A.normalizedNames?.[Q];
    if (B && A.configs?.[B]) return A.configs[B];
    return;
}
function VW7(A, Q) {
    if (A.resources?.[Q]) return A.resources[Q];
    let B = A.normalizedNames?.[Q];
    if (B && A.resources?.[B]) return A.resources[B];
    return [];
}
function rR0(A) {
    let Q = A.split("/");
    if (Q.length !== 2 || !Q[0] || !Q[1]) throw Error(`Invalid tool identifier '${A}'. Expected format: <server>/<tool>`);
    return {
        server: Q[0],
        tool: Q[1]
    };
}
async function W6A(A, Q, B = 1e4) {
    let G = IH9();
    if (!G) throw Error("MCP CLI endpoint not enabled");
    try {
        let Z = await PQ({
            method: "POST",
            url: `${G.url}/mcp`,
            data: Q,
            headers: {
                Authorization: `Bearer ${G.key}`,
                "Content-Type": "application/json"
            },
            timeout: B,
            validateStatus: ()=>!0
        });
        if (Z.status >= 400) {
            let Y = gB.object({
                error: gB.string().optional(),
                type: gB.string().optional()
            }).safeParse(Z.data), J = Y.success ? Y.data : {}, X = Error(J.error || `HTTP ${Z.status}: ${Z.statusText}`);
            if (J.type) X.name = J.type;
            throw X;
        }
        return A.parse(Z.data);
    } catch (Z) {
        if (PQ.isAxiosError(Z)) {
            if (Z.code === "ECONNREFUSED") throw Error("Connection refused - is the MCP endpoint running?");
            if (Z.code === "ETIMEDOUT" || Z.message.includes("timeout")) throw Error("Request timeout");
            if (Z.message.startsWith("HTTP ")) throw Z;
            throw Error(`Network error: ${Z.message}`);
        }
        throw Z;
    }
}
var es = new KF1().name("mcp-cli").description("Interact with MCP servers and tools").version("1.0.0");
es.command("servers").description("List all connected MCP servers").option("--json", "Output in JSON format").action(async (A)=>{
    let Q = await ibA("servers", async ()=>{
        return mz() ? await W6A(iR0, {
            command: "servers"
        }) : VF1(ts().clients);
    }, (G)=>({
            server_count: G.length
        }));
    if (!Q.success) process.exit(1);
    let B = Q.data;
    if (A.json) console.log(JSON.stringify(B));
    else B.forEach((G)=>{
        let Z = G.type === "connected" ? V1.green("connected") : G.type === "failed" ? V1.red("failed") : V1.yellow(G.type), Y = "";
        if (G.type === "connected") {
            let J = [];
            if (G.hasTools) J.push("tools");
            if (G.hasResources) J.push("resources");
            if (G.hasPrompts) J.push("prompts");
            if (J.length > 0) Y = ` (${J.join(", ")})`;
        }
        console.log(`${G.name} - ${Z}${Y}`);
    });
});
es.command("tools").description("List all available tools").argument("[server]", "Filter by server name").option("--json", "Output in JSON format").action(async (A, Q)=>{
    let B = {
        server: A
    }, G = await ibA("tools", async ()=>{
        return mz() ? await W6A(nR0, {
            command: "tools",
            params: B
        }) : HF1(ts().tools, B);
    }, (Y)=>({
            tool_count: Y.length,
            filtered: !!A
        }));
    if (!G.success) process.exit(1);
    let Z = G.data;
    if (Q.json) console.log(JSON.stringify(Z));
    else if (A) Z.forEach((Y)=>console.log(Y.name));
    else Z.forEach((Y)=>console.log(`${Y.server}/${Y.name}`));
});
es.command("info").description("Get detailed information about a tool").argument("<tool>", "Tool identifier in format <server>/<tool>").option("--json", "Output in JSON format").action(async (A, Q)=>{
    let B = await ibA("info", async ()=>{
        let { server: Z, tool: Y } = rR0(A), J = {
            server: Z,
            toolName: Y
        };
        if (mz()) return await W6A(BH9, {
            command: "info",
            params: J
        });
        let X = ts(), I = await DF1(X.tools, J);
        if (!I) {
            let W = pbA(X.clients, Z, X.normalizedNames), K = I6A(Z, W?.type);
            if (K) throw K;
            throw Error(`Tool '${Y}' not found on server '${Z}'`);
        }
        return I;
    }, ()=>({
            tool_found: !0
        }), {
        tool_found: !1
    });
    if (!B.success) process.exit(1);
    let G = B.data;
    if (Q.json) console.log(JSON.stringify(G));
    else {
        if ((console.log(V1.bold(`Tool: ${A}`)), console.log(V1.dim(`Server: ${G.server}`)), G.description)) console.log(V1.dim(`Description: ${G.description}`));
        (console.log(), console.log(V1.bold("Input Schema:")), console.log(JSON.stringify(G.inputSchema, null, 2)));
    }
});
async function HW7(A, Q, B, G) {
    let Z = ts(), Y = WH9(Z, Q);
    if (!Y) throw Error(`Server '${Q}' not found`);
    if (G.debug) console.error(`Connecting to ${Q} (${Y.type})...`);
    let J = await nBA(Q, Y);
    if (J.client.type !== "connected") throw (I6A(Q, J.client.type) ?? new lbA(`Failed to connect to server '${Q}'`));
    let X = (()=>{
        let V = `mcp__${B7(Q)}__${B7(A)}`;
        return Z.tools.find((D)=>D.name === V)?.originalToolName || A;
    })();
    if (G.debug) console.error(`Calling tool ${X}...`);
    let I = parseInt(G.timeout || "", 10) || aBA(), W = await J.client.client.request({
        method: "tools/call",
        params: {
            name: X,
            arguments: B
        }
    }, oC, {
        signal: AbortSignal.timeout(I)
    });
    return (J.client.client.close(), W);
}
es.command("call").description("Invoke an MCP tool").argument("<tool>", "Tool identifier in format <server>/<tool>").argument("<args>", 'Tool arguments as JSON string or "-" for stdin').option("--json", "Output in JSON format").option("--timeout <ms>", "Timeout in milliseconds (default: MCP_TOOL_TIMEOUT env var or effectively infinite)").option("--debug", "Show debug output").action(async (A, Q, B)=>{
    let { server: G, tool: Z } = rR0(A);
    if (Q === "-") {
        let I = [];
        for await (let W of process.stdin)I.push(W);
        Q = Buffer.concat(I).toString("utf-8").trim();
    }
    let Y;
    try {
        Y = JSON.parse(Q);
    } catch (I) {
        (console.error(V1.red("Error: Invalid JSON arguments")), console.error(String(I)), process.exit(1));
    }
    let J = `mcp__${B7(G)}__${B7(Z)}`, X = Date.now();
    try {
        let I = parseInt(B.timeout || "", 10) || aBA(), W = {
            server: G,
            tool: Z,
            args: Y,
            timeoutMs: I
        }, K = mz() ? await W6A(oC, {
            command: "call",
            params: W
        }, I) : await HW7(Z, G, Y, B), V = B.json ? JSON.stringify(K) : typeof K === "string" ? K : JSON.stringify(K, null, 2);
        if ((await new Promise((H)=>{
            process.stdout.write(V + `
`, ()=>H());
        }), !mz())) await Ap("tengu_mcp_cli_command_executed", {
            command: "call",
            tool_name: J,
            success: !0,
            duration_ms: Date.now() - X
        });
        process.exit(0);
    } catch (I) {
        console.error(V1.red("Error calling tool:"), String(I));
        let W = Date.now() - X, K = String(I).slice(0, 2000);
        if (!mz()) (await Ap("tengu_tool_use_error", {
            toolName: J,
            isMcp: !0,
            error: K,
            durationMs: W
        }), await Ap("tengu_mcp_cli_command_executed", {
            command: "call",
            tool_name: J,
            success: !1,
            error_type: I instanceof lbA ? "connection_failed" : "tool_execution_failed",
            duration_ms: Date.now() - X
        }));
        process.exit(1);
    }
});
es.command("grep").description("Search tool names and descriptions using regex patterns").argument("<pattern>", "Regex pattern to search for").option("--json", "Output in JSON format").option("-i, --ignore-case", "Case insensitive search (default: true)", !0).action(async (A, Q)=>{
    let B = await ibA("grep", async ()=>{
        try {
            new RegExp(A, Q.ignoreCase ? "i" : "");
        } catch (Y) {
            throw Error(`Invalid regex pattern: ${Y instanceof Error ? Y.message : String(Y)}`);
        }
        let Z = {
            pattern: A,
            ignoreCase: Q.ignoreCase
        };
        return mz() ? await W6A(GH9, {
            command: "grep",
            params: Z
        }) : FF1(ts().tools, Z);
    }, (Z)=>({
            match_count: Z.length
        }));
    if (!B.success) process.exit(1);
    let G = B.data;
    if (Q.json) console.log(JSON.stringify(G));
    else if (G.length === 0) console.log(V1.yellow("No tools found matching pattern"));
    else G.forEach((Z)=>{
        if ((console.log(V1.bold(`${Z.server}/${Z.name}`)), Z.description)) {
            let Y = Z.description.length > 100 ? Z.description.slice(0, 100) + "..." : Z.description;
            console.log(V1.dim(`  ${Y}`));
        }
        console.log();
    });
});
es.command("resources").description("List MCP resources").argument("[server]", "Filter by server name").option("--json", "Output in JSON format").action(async (A, Q)=>{
    let B = {
        server: A
    }, G = await ibA("resources", async ()=>{
        if (mz()) return await W6A(ZH9, {
            command: "resources",
            params: B
        });
        else {
            let Y = ts();
            return EF1(Y.resources, B, Y.normalizedNames);
        }
    }, (Y)=>({
            resource_count: Y.length,
            filtered: !!A
        }));
    if (!G.success) process.exit(1);
    let Z = G.data;
    if (Q.json) console.log(JSON.stringify(Z));
    else Z.forEach((Y)=>{
        console.log(`${Y.server}/${Y.name || Y.uri}`);
    });
});
async function DW7(A, Q, B) {
    let G = ts(), Z = WH9(G, A);
    if (!Z) throw Error(`Server '${A}' not found`);
    if (B.debug) console.error(`Connecting to ${A} (${Z.type})...`);
    let Y = await nBA(A, Z);
    if (Y.client.type !== "connected") throw (I6A(A, Y.client.type) ?? new lbA(`Failed to connect to server '${A}'`));
    if (B.debug) console.error(`Reading resource: ${Q}`);
    let J = parseInt(B.timeout || "", 10) || aBA(), X = await Y.client.client.readResource({
        uri: Q
    }, {
        signal: AbortSignal.timeout(J)
    });
    return (Y.client.client.close(), X);
}
es.command("read").description("Read an MCP resource").argument("<resource>", "Resource identifier in format <server>/<resource> or <server> <uri>").argument("[uri]", "Optional: Direct resource URI (file://, https://, etc.)").option("--json", "Output in JSON format").option("--timeout <ms>", "Timeout in milliseconds (default: MCP_TOOL_TIMEOUT env var or effectively infinite)").option("--debug", "Show debug output").action(async (A, Q, B)=>{
    let G, Z, Y;
    if (Q) ((G = A), (Y = Q));
    else {
        let I = rR0(A);
        ((G = I.server), (Z = I.tool));
    }
    let J;
    if (Y) {
        if (((J = Y), B.debug)) console.log(`Using direct URI: ${J}`);
    } else {
        let I = ts(), K = VW7(I, G).find((V)=>V.name === Z || V.uri === Z);
        if (!K) (console.error(V1.red(`Error: Resource '${Z}' not found on server '${G}'`)), process.exit(1));
        J = K.uri;
    }
    let X = Date.now();
    try {
        let I = parseInt(B.timeout || "", 10) || aBA(), W = {
            server: G,
            uri: J,
            timeoutMs: I
        }, K = mz() ? await W6A(aQA, {
            command: "read",
            params: W
        }, I) : await DW7(G, J, B);
        if (B.json) console.log(JSON.stringify(K));
        else if (K.contents && Array.isArray(K.contents)) K.contents.forEach((V)=>{
            if (V && typeof V === "object") {
                if ("text" in V) console.log(V.text);
                else if ("blob" in V) {
                    console.log(V1.yellow("[Binary blob content]"));
                    let H = "mimeType" in V ? V.mimeType : void 0;
                    console.log(V1.dim(`MIME type: ${H || "unknown"}`));
                }
            }
        });
        else console.log(JSON.stringify(K, null, 2));
        if (!mz()) await Ap("tengu_mcp_cli_command_executed", {
            command: "read",
            success: !0,
            duration_ms: Date.now() - X
        });
        process.exit(0);
    } catch (I) {
        if ((console.error(V1.red("Error reading resource:"), String(I)), !mz())) await Ap("tengu_mcp_cli_command_executed", {
            command: "read",
            success: !1,
            error_type: I instanceof lbA ? "connection_failed" : "read_failed",
            duration_ms: Date.now() - X
        });
        process.exit(1);
    }
});
async function KH9(A) {
    if ((hbA(), !mz())) Zc();
    try {
        if ((await es.parseAsync(A, {
            from: "user"
        }), !mz())) await (await Zc())?.flush();
        return 0;
    } catch (Q) {
        if ((console.error(V1.red("Error:"), Q), !mz())) await (await Zc())?.flush();
        return 1;
    }
}
s1();
main();
cV1();
zk();
import { format as $F1 } from "util";
var FW7 = "https://claude.ai/chrome";
async function HH9() {
    let A = new DH9(), Q = {
        serverName: "Claude in Chrome",
        logger: A,
        socketPath: yTA(),
        clientTypeId: "claude-code",
        onAuthenticationError: ()=>{
            A.warn("Authentication error occurred. Please ensure you are logged into the Claude browser extension.");
        },
        onToolCallDisconnected: ()=>{
            return `Browser extension is not connected. Please ensure the Claude browser extension is installed and running (${FW7}). If this is your first time connecting to Chrome, you may need to restart Chrome for the installation to take effect.`;
        }
    }, B = uq0(Q), G = new nbA();
    (k("[Claude in Chrome] Starting MCP server"), await B.connect(G), k("[Claude in Chrome] MCP server started"));
}
class DH9 {
    debug(A, ...Q) {
        k($F1(A, ...Q), {
            level: "debug"
        });
    }
    info(A, ...Q) {
        k($F1(A, ...Q), {
            level: "info"
        });
    }
    warn(A, ...Q) {
        k($F1(A, ...Q), {
            level: "warn"
        });
    }
    error(A, ...Q) {
        k($F1(A, ...Q), {
            level: "error"
        });
    }
}
import { createServer as EW7 } from "net";
import { platform as tR0 } from "os";
zk();
import { existsSync as FH9, unlinkSync as EH9, chmodSync as zW7, statSync as CW7, appendFileSync as $W7 } from "fs";
var UW7 = "1.0.0", eR0 = 1048576, zH9 = void 0;
function iW(A, ...Q) {
    if (zH9) {
        let B = new Date().toISOString(), G = Q.length > 0 ? " " + JSON.stringify(Q) : "", Z = `[${B}] [Claude Chrome Native Host] ${A}${G}
`;
        try {
            $W7(zH9, Z);
        } catch  {}
    }
    console.error(`[Claude Chrome Native Host] ${A}`, ...Q);
}
function PFA(A) {
    let Q = Buffer.from(A, "utf-8"), B = Buffer.alloc(4);
    (B.writeUInt32LE(Q.length, 0), process.stdout.write(B), process.stdout.write(Q));
}
async function CH9() {
    iW("Initializing...");
    let A = new $H9(), Q = new UH9();
    await A.start();
    while(!0){
        let B = await Q.read();
        if (B === null) break;
        await A.handleMessage(B);
    }
    await A.stop();
}
class $H9 {
    mcpClients = new Map();
    nextClientId = 1;
    server = null;
    running = !1;
    async start() {
        if (this.running) return;
        let A = yTA();
        if ((iW(`Creating socket listener: ${A}`), tR0() !== "win32" && FH9(A))) try {
            if (CW7(A).isSocket()) EH9(A);
        } catch  {}
        ((this.server = EW7((Q)=>this.handleMcpClient(Q))), await new Promise((Q, B)=>{
            (this.server.listen(A, ()=>{
                if ((iW("Socket server listening for connections"), tR0() !== "win32")) try {
                    (zW7(A, 384), iW("Socket permissions set to 0600"));
                } catch (G) {
                    iW("Failed to set socket permissions:", G);
                }
                ((this.running = !0), Q());
            }), this.server.on("error", (G)=>{
                (iW("Socket server error:", G), B(G));
            }));
        }));
    }
    async stop() {
        if (!this.running) return;
        for (let [, Q] of this.mcpClients)Q.socket.destroy();
        if ((this.mcpClients.clear(), this.server)) (await new Promise((Q)=>{
            this.server.close(()=>Q());
        }), (this.server = null));
        let A = yTA();
        if (tR0() !== "win32" && FH9(A)) try {
            (EH9(A), iW("Cleaned up socket file"));
        } catch  {}
        this.running = !1;
    }
    async isRunning() {
        return this.running;
    }
    async getClientCount() {
        return this.mcpClients.size;
    }
    async handleMessage(A) {
        let Q = JSON.parse(A);
        switch((iW(`Handling Chrome message type: ${Q.type}`), Q.type)){
            case "ping":
                (iW("Responding to ping"), PFA(JSON.stringify({
                    type: "pong",
                    timestamp: Date.now()
                })));
                break;
            case "get_status":
                PFA(JSON.stringify({
                    type: "status_response",
                    native_host_version: UW7
                }));
                break;
            case "tool_response":
                {
                    if (this.mcpClients.size > 0) {
                        iW(`Forwarding tool response to ${this.mcpClients.size} MCP clients`);
                        let { type: B, ...G } = Q, Z = Buffer.from(JSON.stringify(G), "utf-8"), Y = Buffer.alloc(4);
                        Y.writeUInt32LE(Z.length, 0);
                        let J = Buffer.concat([
                            Y,
                            Z
                        ]);
                        for (let [X, I] of this.mcpClients)try {
                            I.socket.write(J);
                        } catch (W) {
                            iW(`Failed to send to MCP client ${X}:`, W);
                        }
                    }
                    break;
                }
            case "notification":
                {
                    if (this.mcpClients.size > 0) {
                        iW(`Forwarding notification to ${this.mcpClients.size} MCP clients`);
                        let { type: B, ...G } = Q, Z = Buffer.from(JSON.stringify(G), "utf-8"), Y = Buffer.alloc(4);
                        Y.writeUInt32LE(Z.length, 0);
                        let J = Buffer.concat([
                            Y,
                            Z
                        ]);
                        for (let [X, I] of this.mcpClients)try {
                            I.socket.write(J);
                        } catch (W) {
                            iW(`Failed to send notification to MCP client ${X}:`, W);
                        }
                    }
                    break;
                }
            default:
                (iW(`Unknown message type: ${Q.type}`), PFA(JSON.stringify({
                    type: "error",
                    error: `Unknown message type: ${Q.type}`
                })));
        }
    }
    handleMcpClient(A) {
        let Q = this.nextClientId++, B = {
            id: Q,
            socket: A,
            buffer: Buffer.alloc(0)
        };
        (this.mcpClients.set(Q, B), iW(`MCP client ${Q} connected. Total clients: ${this.mcpClients.size}`), PFA(JSON.stringify({
            type: "mcp_connected"
        })), A.on("data", (G)=>{
            B.buffer = Buffer.concat([
                B.buffer,
                G
            ]);
            while(B.buffer.length >= 4){
                let Z = B.buffer.readUInt32LE(0);
                if (Z === 0 || Z > eR0) {
                    (iW(`Invalid message length from MCP client ${Q}: ${Z}`), A.destroy());
                    return;
                }
                if (B.buffer.length < 4 + Z) break;
                let Y = B.buffer.slice(4, 4 + Z);
                B.buffer = B.buffer.slice(4 + Z);
                try {
                    let J = JSON.parse(Y.toString("utf-8"));
                    (iW(`Forwarding tool request from MCP client ${Q}: ${J.method}`), PFA(JSON.stringify({
                        type: "tool_request",
                        method: J.method,
                        params: J.params
                    })));
                } catch (J) {
                    iW(`Failed to parse tool request from MCP client ${Q}:`, J);
                }
            }
        }), A.on("error", (G)=>{
            iW(`MCP client ${Q} error: ${G}`);
        }), A.on("close", ()=>{
            (iW(`MCP client ${Q} disconnected. Remaining clients: ${this.mcpClients.size - 1}`), this.mcpClients.delete(Q), PFA(JSON.stringify({
                type: "mcp_disconnected"
            })));
        }));
    }
}
class UH9 {
    buffer = Buffer.alloc(0);
    pendingResolve = null;
    closed = !1;
    constructor(){
        (process.stdin.on("data", (A)=>{
            ((this.buffer = Buffer.concat([
                this.buffer,
                A
            ])), this.tryProcessMessage());
        }), process.stdin.on("end", ()=>{
            if (((this.closed = !0), this.pendingResolve)) (this.pendingResolve(null), (this.pendingResolve = null));
        }), process.stdin.on("error", ()=>{
            if (((this.closed = !0), this.pendingResolve)) (this.pendingResolve(null), (this.pendingResolve = null));
        }));
    }
    tryProcessMessage() {
        if (!this.pendingResolve) return;
        if (this.buffer.length < 4) return;
        let A = this.buffer.readUInt32LE(0);
        if (A === 0 || A > eR0) {
            (iW(`Invalid message length: ${A}`), this.pendingResolve(null), (this.pendingResolve = null));
            return;
        }
        if (this.buffer.length < 4 + A) return;
        let Q = this.buffer.subarray(4, 4 + A);
        this.buffer = this.buffer.subarray(4 + A);
        let B = Q.toString("utf-8");
        (this.pendingResolve(B), (this.pendingResolve = null));
    }
    async read() {
        if (this.closed) return null;
        if (this.buffer.length >= 4) {
            let A = this.buffer.readUInt32LE(0);
            if (A > 0 && A <= eR0 && this.buffer.length >= 4 + A) {
                let Q = this.buffer.subarray(4, 4 + A);
                return ((this.buffer = this.buffer.subarray(4 + A)), Q.toString("utf-8"));
            }
        }
        return new Promise((A)=>{
            ((this.pendingResolve = A), this.tryProcessMessage());
        });
    }
}
Q_0();
main();
lR();
getViewTransitionClassName();
fDA();
process.env.COREPACK_ENABLE_AUTO_PIN = "0";
k9("cli_entry");
k9("cli_imports_loaded");
async function hV7() {
    let A = process.argv.slice(2);
    if (A.length === 1 && (A[0] === "--version" || A[0] === "-v" || A[0] === "-V")) {
        (k9("cli_version_fast_path"), console.log(`${{
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://code.claude.com/docs/en/overview",
            VERSION: "2.0.72",
            FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
            BUILD_TIME: "2025-12-17T21:20:34Z"
        }.VERSION} (Claude Code)`));
        return;
    }
    if (lY() && A[0] === "--mcp-cli") {
        let B = A.slice(1);
        process.exit(await KH9(B));
    }
    if (A[0] === "--ripgrep") {
        k9("cli_ripgrep_path");
        let B = A.slice(1), { ripgrepMain: G } = await Promise.resolve().then(()=>(qH9(), wH9));
        process.exitCode = G(B);
        return;
    }
    if (process.argv[2] === "--claude-in-chrome-mcp") {
        (k9("cli_claude_in_chrome_mcp_path"), await HH9());
        return;
    } else if (process.argv[2] === "--chrome-native-host") {
        (k9("cli_chrome_native_host_path"), await CH9());
        return;
    }
    k9("cli_before_main_import");
    let { main: Q } = await Promise.resolve().then(()=>(renderElement(), OE9));
    (k9("cli_after_main_import"), await Q(), k9("cli_after_main_complete"));
}
hV7();
