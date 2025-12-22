// Module: M69
// Type: L
// Lines: 479987-480036
//
var samplingCallback = L(()=>{
    bA();
    i4();
    SK();
    qI();
    pf = l(React runtime(), 1);
});
function n27(A, Q, B) {
    let G = [], Z = "", Y = !0;
    for (let J of A){
        if (J.type === "server_tool_use") {
            if (Y) {
                if (((Y = !1), Z.trim().length > 0)) G.push(Z.trim());
                Z = "";
            }
            continue;
        }
        if (J.type === "web_search_tool_result") {
            if (!Array.isArray(J.content)) {
                let I = `Web search error: ${J.content.error_code}`;
                (t(Error(I)), G.push(I));
                continue;
            }
            let X = J.content.map((I)=>({
                    title: I.title,
                    url: I.url
                }));
            G.push({
                tool_use_id: J.tool_use_id,
                content: X
            });
        }
        if (J.type === "text") if (Y) Z += J.text;
        else ((Y = !0), (Z = J.text));
    }
    if (Z.length) G.push(Z.trim());
    return {
        query: Q,
        results: G,
        durationSeconds: B
    };
}
var d27, c27, p27, l27, i27 = (A)=>{
    return {
        type: "web_search_20250305",
        name: "web_search",
        allowed_domains: A.allowed_domains,
        blocked_domains: A.blocked_domains,
        max_uses: 8
    };
}, NH1;
