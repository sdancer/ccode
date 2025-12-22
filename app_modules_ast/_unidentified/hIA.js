// Module: hIA
// Type: L
// Lines: 277410-277468
//
var hIA = L(()=>{
    v2();
    ((P80 = u.enum([
        "local",
        "user",
        "project",
        "dynamic",
        "enterprise",
        "claudeai"
    ])), (_BZ = u.enum([
        "stdio",
        "sse",
        "sse-ide",
        "http",
        "ws",
        "sdk"
    ])), (S80 = u.object({
        type: u.literal("stdio").optional(),
        command: u.string().min(1, "Command cannot be empty"),
        args: u.array(u.string()).default([]),
        env: u.record(u.string()).optional()
    })), (IU3 = u.object({
        type: u.literal("sse"),
        url: u.string(),
        headers: u.record(u.string()).optional(),
        headersHelper: u.string().optional()
    })), (WU3 = u.object({
        type: u.literal("sse-ide"),
        url: u.string(),
        ideName: u.string(),
        ideRunningInWindows: u.boolean().optional()
    })), (KU3 = u.object({
        type: u.literal("ws-ide"),
        url: u.string(),
        ideName: u.string(),
        authToken: u.string().optional(),
        ideRunningInWindows: u.boolean().optional()
    })), (VU3 = u.object({
        type: u.literal("http"),
        url: u.string(),
        headers: u.record(u.string()).optional(),
        headersHelper: u.string().optional()
    })), (HU3 = u.object({
        type: u.literal("ws"),
        url: u.string(),
        headers: u.record(u.string()).optional(),
        headersHelper: u.string().optional()
    })), (DU3 = u.object({
        type: u.literal("sdk"),
        name: u.string()
    })), (FU3 = u.object({
        type: u.literal("claudeai-proxy"),
        url: u.string(),
        id: u.string()
    })), (Ma = u.union([
        S80,
        IU3,
        WU3,
        KU3,
        VU3,
        HU3,
        DU3,
        FU3
    ])), (XlB = u.object({
        mcpServers: u.record(u.string(), Ma)
    })));
});
var gIA;
