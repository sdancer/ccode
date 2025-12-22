// Module: z4
// Type: L
// Lines: 524364-524513
//
var z4 = L(()=>{
    n2();
    R5();
    renderElement();
    aBQ();
    Ag();
    s1();
    g1();
    getViewTransitionClassName();
    DZA();
    cAA();
    ((NR0 = l(React runtime(), 1)), (BF1 = l(lBQ(), 1)), (CV9 = {}));
    ((J6A = Y0(()=>{
        if (wV()) return null;
        let A = OX7(rBQ);
        return (A.initialized.then(()=>{
            LR0 = !0;
        }), A);
    })), (Zc = Y0(async ()=>{
        let A = J6A();
        if (!A) return null;
        return (await A.initialized, A.client);
    })));
    pX = Y0(async (A)=>{
        if (wV()) return !1;
        let Q = J6A();
        if (!Q) return !1;
        await Q.initialized;
        let B = Q.client.checkGate(A);
        return ((CV9[A] = B), B);
    });
    MX7 = Y0(async (A, Q)=>{
        if (wV()) return Q;
        let B = J6A();
        if (!B) return Q;
        await B.initialized;
        let G = B.client.getExperiment(A);
        if (Object.keys(G.value).length === 0) return Q;
        return G.value;
    });
    RX7 = Y0(Yf);
    _X7 = Y0(async (A)=>{
        let Q = await pX(A);
        n0((B)=>{
            if (B.cachedStatsigGates[A] === Q) return B;
            return {
                ...B,
                cachedStatsigGates: {
                    ...B.cachedStatsigGates,
                    [A]: Q
                }
            };
        });
    });
});
function B7(A) {
    return A.replace(/[^a-zA-Z0-9_-]/g, "_");
}
import { join as NV9 } from "path";
import { tmpdir as jX7 } from "os";
import { writeFile as TX7, mkdir as PX7, rm as qV9, readdir as SX7 } from "fs/promises";
function Yc() {
    return process.env.USE_MCP_CLI_DIR || NV9(jX7(), "claude-code-mcp-cli");
}
function RFA() {
    if (lY()) {
        let A = process.env.CLAUDE_CODE_SESSION_ID;
        if (A) return A;
    }
    return m0();
}
function LV9() {
    if (!lY()) return;
    X3(async ()=>{
        try {
            let A = GF1();
            await qV9(A, {
                force: !0
            });
            let Q = Yc();
            if ((await SX7(Q)).length === 0) await qV9(Q, {
                recursive: !0,
                force: !0
            });
        } catch  {}
    });
}
function GF1() {
    let A = RFA();
    return NV9(Yc(), `${A}.json`);
}
function yX7(A) {
    let Q = {
        name: A.name,
        type: A.type
    };
    if (A.type === "connected") return {
        ...Q,
        capabilities: A.capabilities
    };
    return Q;
}
async function xX7(A) {
    let Q = "";
    try {
        Q = await A.description({}, {
            isNonInteractiveSession: !1,
            toolPermissionContext: {
                mode: "default",
                additionalWorkingDirectories: new Map(),
                alwaysAllowRules: {},
                alwaysDenyRules: {},
                alwaysAskRules: {},
                isBypassPermissionsModeAvailable: !1
            },
            tools: []
        });
    } catch  {}
    return {
        name: A.name,
        description: Q,
        inputJSONSchema: A.inputJSONSchema,
        isMcp: A.isMcp,
        originalToolName: A.originalMcpToolName
    };
}
async function OV9(A, Q, B) {
    if (!lY()) return;
    try {
        await PX7(Yc(), {
            recursive: !0
        });
        let G = await Promise.all(Q.filter((I)=>I.isMcp).map(xX7)), Z = {}, Y = {};
        for (let I of A){
            Z[I.name] = I.config;
            let W = B7(I.name);
            if (Y[W] && Y[W] !== I.name) console.warn(`Warning: MCP server name collision detected. Both "${Y[W]}" and "${I.name}" normalize to "${W}". Only "${I.name}" will be accessible via normalized lookup.`);
            Y[W] = I.name;
        }
        let J = {
            clients: A.map(yX7),
            configs: Z,
            tools: G,
            resources: B,
            normalizedNames: Y
        }, X = GF1();
        await TX7(X, JSON.stringify(J, null, 2));
    } catch  {}
}
