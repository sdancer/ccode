// Module: uR0
// Type: L
// Lines: 527494-527538
//
var renderElement = L(()=>{
    ((QH9 = l(AH9(), 1)), ({ program: X$J, createCommand: I$J, createArgument: W$J, createOption: K$J, CommanderError: V$J, InvalidArgumentError: H$J, InvalidOptionArgumentError: D$J, Command: KF1, Argument: F$J, Option: ZV, Help: E$J } = QH9.default));
});
function VF1(A) {
    return A.map((Q)=>({
            name: B7(Q.name),
            type: Q.type,
            hasTools: Q.type === "connected" && Q.capabilities?.tools !== void 0,
            hasResources: Q.type === "connected" && Q.capabilities?.resources !== void 0,
            hasPrompts: Q.type === "connected" && Q.capabilities?.prompts !== void 0,
            serverInfo: Q.type === "connected" && "serverInfo" in Q ? Q.serverInfo : void 0
        }));
}
var mR0 = ()=>{};
function HF1(A, Q) {
    let B = Q?.server, G = B ? B7(B) : void 0, Z = G ? `mcp__${G}__` : "mcp__";
    return A.filter((J)=>J.name.startsWith(Z)).map((J)=>{
        let X = jF(J.name);
        return {
            server: X?.serverName || "unknown",
            name: X?.toolName || J.name,
            description: typeof J.description === "function" ? void 0 : J.description || "",
            fullName: J.name
        };
    });
}
