// Module: PA9
// Type: L
// Lines: 468065-468171
//
var PA9 = L(()=>{
    pushStartInstance();
    createRenderState();
    so();
    KB();
    samplingCallback();
});
function qq0() {
    if (!$q0) $q0 = qA("perf_hooks").performance;
    return $q0;
}
function xA9() {
    if (!KfA) return;
    (qq0().clearMarks(), wq0.clear(), (Uq0 = null), yA9++, xG("query_user_input_received"));
}
function xG(A) {
    if (!KfA) return;
    let Q = qq0();
    if ((Q.mark(A), wq0.set(A, process.memoryUsage()), A === "query_first_chunk_received" && Uq0 === null)) {
        let B = Q.getEntriesByType("mark");
        if (B.length > 0) Uq0 = B[B.length - 1]?.startTime ?? 0;
    }
}
function vA9() {
    if (!KfA) return;
    xG("query_profile_end");
}
function SDA(A) {
    return A.toFixed(3);
}
function SA9(A) {
    return (A / 1024 / 1024).toFixed(2);
}
function zQ7(A, Q) {
    if (Q === "query_user_input_received") return "";
    if (A > 1000) return " ⚠️  VERY SLOW";
    if (A > 100) return " ⚠️  SLOW";
    if (Q.includes("git_status") && A > 50) return " ⚠️  git status";
    if (Q.includes("tool_schema") && A > 50) return " ⚠️  tool schemas";
    if (Q.includes("client_creation") && A > 50) return " ⚠️  client creation";
    return "";
}
function CQ7() {
    if (!KfA) return "Query profiling not enabled (set CLAUDE_CODE_PROFILE_QUERY=1)";
    let Q = qq0().getEntriesByType("mark");
    if (Q.length === 0) return "No query profiling checkpoints recorded";
    let B = [];
    (B.push("=".repeat(80)), B.push(`QUERY PROFILING REPORT - Query #${yA9}`), B.push("=".repeat(80)), B.push(""));
    let G = Q[0]?.startTime ?? 0, Z = G, Y = 0, J = 0;
    for (let W of Q){
        let K = W.startTime - G, V = SDA(K), H = W.startTime - Z, D = SDA(H), F = wq0.get(W.name), E = zQ7(H, W.name), z = F ? ` | RSS: ${SA9(F.rss)}MB, Heap: ${SA9(F.heapUsed)}MB` : "";
        if ((B.push(`[+${V.padStart(10)}ms] (+${D.padStart(9)}ms) ${W.name}${E}${z}`), W.name === "query_api_request_sent")) Y = K;
        if (W.name === "query_first_chunk_received") J = K;
        Z = W.startTime;
    }
    let X = Q[Q.length - 1], I = X ? X.startTime - G : 0;
    if ((B.push(""), B.push("-".repeat(80)), J > 0)) {
        let W = Y, K = J - Y, V = ((W / J) * 100).toFixed(1), H = ((K / J) * 100).toFixed(1);
        (B.push(`Total TTFT: ${SDA(J)}ms`), B.push(`  - Pre-request overhead: ${SDA(W)}ms (${V}%)`), B.push(`  - Network latency: ${SDA(K)}ms (${H}%)`));
    } else B.push(`Total time: ${SDA(I)}ms`);
    return (B.push("=".repeat(80)), B.join(`
`));
}
function kA9() {
    if (!KfA) return;
    k(CQ7());
}
var KfA, wq0, yA9 = 0, Uq0 = null, $q0 = null;
