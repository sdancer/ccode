// Module: iI0
// Type: L
// Lines: 364084-364322
//
var createRenderState = L(()=>{
    aQ();
    createRenderState();
    i0();
    ((iG1 = new Set()), (aH2 = new Map()));
    I25 = /^<system-reminder>\n?([\s\S]*?)\n?<\/system-reminder>$/;
});
import { AsyncLocalStorage as QD2 } from "async_hooks";
function RL(A) {
    return A.spanContext().spanId || "";
}
function K25() {
    return V0(process.env.ENABLE_ENHANCED_TELEMETRY_BETA);
}
function oP() {
    return K25() || XD();
}
function X_() {
    return WX.trace.getTracer("com.anthropic.claude_code.tracing", "1.0.0");
}
function VVA(A, Q = {}) {
    return {
        ...IVA(),
        "span.type": A,
        ...Q
    };
}
function BD2(A) {
    if (!oP()) return WX.trace.getActiveSpan() || X_().startSpan("dummy");
    let Q = X_(), G = V0(process.env.OTEL_LOG_USER_PROMPTS) ? A : "<REDACTED>";
    AD2++;
    let Z = VVA("interaction", {
        user_prompt: G,
        user_prompt_length: A.length,
        "interaction.sequence": AD2
    }), Y = Q.startSpan("claude_code.interaction", {
        attributes: Z
    });
    rH2(Y, A);
    let J = RL(Y);
    return (fV.set(J, {
        span: Y,
        startTime: Date.now(),
        attributes: Z
    }), WVA.enterWith(Y), Y);
}
function pSA() {
    if (!oP()) return;
    let A = WVA.getStore();
    if (!A) return;
    let Q = RL(A), B = fV.get(Q);
    if (!B) return;
    if (B.ended) return;
    let G = Date.now() - B.startTime;
    (B.span.setAttributes({
        "interaction.duration_ms": G
    }), B.span.end(), (B.ended = !0), fV.delete(Q), WVA.exit(()=>{}));
}
function GD2(A, Q, B) {
    if (!oP()) return WX.trace.getActiveSpan() || X_().startSpan("dummy");
    let G = X_(), Z = WVA.getStore(), Y = VVA("llm_request", {
        model: A,
        "llm_request.context": Z ? "interaction" : "standalone"
    }), J = Z ? WX.trace.setSpan(WX.context.active(), Z) : WX.context.active(), X = G.startSpan("claude_code.llm_request", {
        attributes: Y
    }, J);
    if (Q?.querySource) X.setAttribute("query_source", Q.querySource);
    sH2(X, Q, B);
    let I = RL(X);
    return (fV.set(I, {
        span: X,
        startTime: Date.now(),
        attributes: Y
    }), X);
}
function nI0(A, Q) {
    if (!oP()) return;
    let B;
    if (A) {
        let Y = RL(A);
        B = fV.get(Y);
    } else for (let [, Y] of Array.from(fV.entries()).reverse())if (Y.attributes["span.type"] === "llm_request") {
        B = Y;
        break;
    }
    if (!B) return;
    let Z = {
        duration_ms: Date.now() - B.startTime
    };
    if (Q) {
        if (Q.inputTokens !== void 0) Z.input_tokens = Q.inputTokens;
        if (Q.outputTokens !== void 0) Z.output_tokens = Q.outputTokens;
        if (Q.cacheReadTokens !== void 0) Z.cache_read_tokens = Q.cacheReadTokens;
        if (Q.cacheCreationTokens !== void 0) Z.cache_creation_tokens = Q.cacheCreationTokens;
        if (Q.success !== void 0) Z.success = Q.success;
        if (Q.statusCode !== void 0) Z.status_code = Q.statusCode;
        if (Q.error !== void 0) Z.error = Q.error;
        if (Q.attempt !== void 0) Z.attempt = Q.attempt;
        if (Q.hasToolCall !== void 0) Z["response.has_tool_call"] = Q.hasToolCall;
        tH2(Z, Q);
    }
    (B.span.setAttributes(Z), B.span.end(), fV.delete(RL(B.span)));
}
function ZD2(A, Q) {
    if (!oP()) return WX.trace.getActiveSpan() || X_().startSpan("dummy");
    let B = X_(), G = WVA.getStore(), Z = VVA("tool", {
        tool_name: A,
        ...Q
    }), Y = G ? WX.trace.setSpan(WX.context.active(), G) : WX.context.active(), J = B.startSpan("claude_code.tool", {
        attributes: Z
    }, Y), X = RL(J);
    return (fV.set(X, {
        span: J,
        startTime: Date.now(),
        attributes: Z
    }), KVA.enterWith(J), J);
}
function YD2() {
    if (!oP()) return WX.trace.getActiveSpan() || X_().startSpan("dummy");
    let A = X_(), Q = KVA.getStore(), B = VVA("tool.blocked_on_user"), G = Q ? WX.trace.setSpan(WX.context.active(), Q) : WX.context.active(), Z = A.startSpan("claude_code.tool.blocked_on_user", {
        attributes: B
    }, G), Y = RL(Z);
    return (fV.set(Y, {
        span: Z,
        startTime: Date.now(),
        attributes: B
    }), Z);
}
function aI0(A, Q) {
    if (!oP()) return;
    let B;
    for (let [, J] of Array.from(fV.entries()).reverse())if (J.attributes["span.type"] === "tool.blocked_on_user") {
        B = J;
        break;
    }
    if (!B) return;
    let Z = {
        duration_ms: Date.now() - B.startTime
    };
    if (A) Z.decision = A;
    if (Q) Z.source = Q;
    (B.span.setAttributes(Z), B.span.end());
    let Y = RL(B.span);
    fV.delete(Y);
}
function JD2() {
    if (!oP()) return WX.trace.getActiveSpan() || X_().startSpan("dummy");
    let A = X_(), Q = KVA.getStore(), B = VVA("tool.execution"), G = Q ? WX.trace.setSpan(WX.context.active(), Q) : WX.context.active(), Z = A.startSpan("claude_code.tool.execution", {
        attributes: B
    }, G), Y = RL(Z);
    return (fV.set(Y, {
        span: Z,
        startTime: Date.now(),
        attributes: B
    }), Z);
}
function oI0(A) {
    if (!oP()) return;
    let Q;
    for (let [, Y] of Array.from(fV.entries()).reverse())if (Y.attributes["span.type"] === "tool.execution") {
        Q = Y;
        break;
    }
    if (!Q) return;
    let G = {
        duration_ms: Date.now() - Q.startTime
    };
    if (A) {
        if (A.success !== void 0) G.success = A.success;
        if (A.error !== void 0) G.error = A.error;
    }
    (Q.span.setAttributes(G), Q.span.end());
    let Z = RL(Q.span);
    fV.delete(Z);
}
function nG1(A) {
    if (!oP()) return;
    let Q;
    for (let [, Y] of Array.from(fV.entries()).reverse())if (Y.attributes["span.type"] === "tool") {
        Q = Y;
        break;
    }
    if (!Q) return;
    let G = {
        duration_ms: Date.now() - Q.startTime
    };
    if (A) {
        let Y = Q.attributes.tool_name || "unknown";
        eH2(G, Y, A);
    }
    (Q.span.setAttributes(G), Q.span.end());
    let Z = RL(Q.span);
    (fV.delete(Z), KVA.exit(()=>{}));
}
function V25() {
    return V0(process.env.OTEL_LOG_TOOL_CONTENT);
}
function XD2(A, Q) {
    if (!oP() || !V25()) return;
    let B = KVA.getStore();
    if (!B) return;
    let G = {};
    for (let [Z, Y] of Object.entries(Q))if (typeof Y === "string") {
        let { content: J, truncated: X } = bm(Y);
        if (((G[Z] = J), X)) ((G[`${Z}_truncated`] = !0), (G[`${Z}_original_length`] = Y.length));
    } else G[Z] = Y;
    B.addEvent(A, G);
}
function ID2(A, Q, B, G) {
    if (!XD()) return WX.trace.getActiveSpan() || X_().startSpan("dummy");
    let Z = X_(), Y = KVA.getStore() || WVA.getStore(), J = VVA("hook", {
        hook_event: A,
        hook_name: Q,
        num_hooks: B,
        hook_definitions: G
    }), X = Y ? WX.trace.setSpan(WX.context.active(), Y) : WX.context.active(), I = Z.startSpan("claude_code.hook", {
        attributes: J
    }, X), W = RL(I);
    return (fV.set(W, {
        span: I,
        startTime: Date.now(),
        attributes: J
    }), I);
}
function WD2(A, Q) {
    if (!XD()) return;
    let B = RL(A), G = fV.get(B);
    if (!G) return;
    let Y = {
        duration_ms: Date.now() - G.startTime
    };
    if (Q) {
        if (Q.numSuccess !== void 0) Y.num_success = Q.numSuccess;
        if (Q.numBlocking !== void 0) Y.num_blocking = Q.numBlocking;
        if (Q.numNonBlockingError !== void 0) Y.num_non_blocking_error = Q.numNonBlockingError;
        if (Q.numCancelled !== void 0) Y.num_cancelled = Q.numCancelled;
    }
    (G.span.setAttributes(Y), G.span.end(), fV.delete(B));
}
var WX, WVA, KVA, fV, AD2 = 0;
