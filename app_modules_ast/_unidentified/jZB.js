// Module: jZB
// Type: L
// Lines: 187644-187766
//
var jZB = L(()=>{
    v2();
    ((NZB = u.string().refine((A)=>{
        if (A.includes("://") || A.includes("/") || A.includes(":")) return !1;
        if (A === "localhost") return !0;
        if (A.startsWith("*.")) {
            let Q = A.slice(2);
            if (!Q.includes(".") || Q.startsWith(".") || Q.endsWith(".")) return !1;
            let B = Q.split(".");
            return B.length >= 2 && B.every((G)=>G.length > 0);
        }
        if (A.includes("*")) return !1;
        return A.includes(".") && !A.startsWith(".") && !A.endsWith(".");
    }, {
        message: 'Invalid domain pattern. Must be a valid domain (e.g., "example.com") or wildcard (e.g., "*.example.com"). Overly broad patterns like "*.com" or "*" are not allowed for security reasons.'
    })), (Il1 = u.string().min(1, "Path cannot be empty")), (LZB = u.object({
        allowedDomains: u.array(NZB).describe('List of allowed domains (e.g., ["github.com", "*.npmjs.org"])'),
        deniedDomains: u.array(NZB).describe("List of denied domains"),
        allowUnixSockets: u.array(u.string()).optional().describe("Unix socket paths that are allowed (macOS only)"),
        allowAllUnixSockets: u.boolean().optional().describe("Allow ALL Unix sockets (Linux only - disables Unix socket blocking)"),
        allowLocalBinding: u.boolean().optional().describe("Whether to allow binding to local ports (default: false)"),
        httpProxyPort: u.number().int().min(1).max(65535).optional().describe("Port of an external HTTP proxy to use instead of starting a local one. When provided, the library will skip starting its own HTTP proxy and use this port. The external proxy must handle domain filtering."),
        socksProxyPort: u.number().int().min(1).max(65535).optional().describe("Port of an external SOCKS proxy to use instead of starting a local one. When provided, the library will skip starting its own SOCKS proxy and use this port. The external proxy must handle domain filtering.")
    })), (OZB = u.object({
        denyRead: u.array(Il1).describe("Paths denied for reading"),
        allowWrite: u.array(Il1).describe("Paths allowed for writing"),
        denyWrite: u.array(Il1).describe("Paths denied for writing (takes precedence over allowWrite)"),
        allowGitConfig: u.boolean().optional().describe("Allow writes to .git/config files (default: false). Enables git remote URL updates while keeping .git/hooks protected.")
    })), (MZB = u.record(u.string(), u.array(u.string())).describe('Map of command patterns to filesystem paths to ignore violations for. Use "*" to match all commands')), (RZB = u.object({
        command: u.string().describe('The ripgrep command to execute (e.g., "rg", "claude")'),
        args: u.array(u.string()).optional().describe('Additional arguments to pass before ripgrep args (e.g., ["--ripgrep"])')
    })), (_ZB = u.object({
        network: LZB.describe("Network restrictions configuration"),
        filesystem: OZB.describe("Filesystem restrictions configuration"),
        ignoreViolations: MZB.optional().describe("Optional configuration for ignoring specific violations"),
        enableWeakerNestedSandbox: u.boolean().optional().describe("Enable weaker nested sandbox mode (for Docker environments)"),
        ripgrep: RZB.optional().describe('Custom ripgrep configuration (default: { command: "rg" })'),
        mandatoryDenySearchDepth: u.number().int().min(1).max(10).optional().describe("Maximum directory depth to search for dangerous files on Linux (default: 3). Higher values provide more protection but slower performance."),
        allowPty: u.boolean().optional().describe("Allow pseudo-terminal (pty) operations (macOS only)")
    })));
});
