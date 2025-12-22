// Module: qlB
// Type: L
// Lines: 278449-278489
//
var qlB = L(()=>{
    v2();
    ((kU3 = u.object({
        allowedDomains: u.array(u.string()).optional(),
        allowUnixSockets: u.array(u.string()).optional(),
        allowAllUnixSockets: u.boolean().optional(),
        allowLocalBinding: u.boolean().optional(),
        httpProxyPort: u.number().optional(),
        socksProxyPort: u.number().optional()
    }).optional()), (wlB = u.object({
        enabled: u.boolean().optional(),
        autoAllowBashIfSandboxed: u.boolean().optional(),
        allowUnsandboxedCommands: u.boolean().optional().describe("Allow commands to run outside the sandbox via the dangerouslyDisableSandbox parameter. When false, the dangerouslyDisableSandbox parameter is completely ignored and all commands must run sandboxed. Default: true."),
        network: kU3,
        ignoreViolations: u.record(u.string(), u.array(u.string())).optional(),
        enableWeakerNestedSandbox: u.boolean().optional(),
        excludedCommands: u.array(u.string()).optional(),
        ripgrep: u.object({
            command: u.string(),
            args: u.array(u.string()).optional()
        }).optional().describe("Custom ripgrep configuration for bundled ripgrep support")
    }).passthrough()));
});
function ljA(A) {
    return "serverName" in A && A.serverName !== void 0;
}
function g61(A) {
    return "serverCommand" in A && A.serverCommand !== void 0;
}
var fU3, bU3, hU3, gU3, uU3, mU3, dU3, gjA, cU3, pU3, lU3, Qm;
