// Module: nn2
// Type: L
// Lines: 451606-451632
//
var nn2 = L(()=>{
    bA();
    Ui();
    Qw0();
    VK1();
    ((MS = l(React runtime(), 1)), (ln2 = l(React runtime(), 1)));
});
function Je5(A, Q) {
    let B = null;
    for (let G of Q){
        if (G.type !== "assistant" || !Array.isArray(G.message.content)) continue;
        for (let Z of G.message.content)if (Z.type === "tool_use" && Z.id === A) B = Z;
    }
    return B;
}
function on2(A, Q, B) {
    return an2.useMemo(()=>{
        let G = Je5(A, B);
        if (!G) return null;
        let Z = Q.find((Y)=>Y.name === G.name);
        if (!Z) return null;
        return {
            tool: Z,
            toolUse: G
        };
    }, [
        A,
        B,
        Q
    ]);
}
var an2;
