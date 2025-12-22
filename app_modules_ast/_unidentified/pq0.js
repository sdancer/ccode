// Module: pq0
// Type: L
// Lines: 472545-472559
//
var pq0 = L(()=>{
    getViewTransitionClassName();
});
async function DB7() {
    return "claude-code-plugins" in (await v5());
}
async function rV1(A) {
    let Q = [
        ...FB7,
        ...EB7
    ], B = await Promise.all(Q.map((G)=>G.isRelevant(A)));
    return Q.filter((G, Z)=>B[Z]).filter((G)=>oV1(G.id) >= G.cooldownSessions);
}
var FB7, EB7;
