// Module: zF1
// Type: L
// Lines: 527608-527731
//
var zF1 = L(()=>{
    iXA();
    ((tI7 = gB.object({
        command: gB.literal("servers")
    })), (iR0 = gB.array(gB.object({
        name: gB.string(),
        type: gB.string(),
        hasTools: gB.boolean().optional(),
        hasResources: gB.boolean().optional(),
        hasPrompts: gB.boolean().optional(),
        serverInfo: gB.object({
            name: gB.string(),
            version: gB.string()
        }).optional()
    }))), (eI7 = gB.object({
        command: gB.literal("tools"),
        params: gB.object({
            server: gB.string().optional()
        }).optional()
    })), (nR0 = gB.array(gB.object({
        server: gB.string(),
        name: gB.string(),
        description: gB.string().optional(),
        fullName: gB.string()
    }))), (AW7 = gB.object({
        command: gB.literal("info"),
        params: gB.object({
            server: gB.string(),
            toolName: gB.string()
        })
    })), (BH9 = gB.object({
        server: gB.string(),
        name: gB.string(),
        fullName: gB.string(),
        description: gB.string(),
        inputSchema: gB.record(gB.string(), gB.unknown())
    }).or(gB.null())), (QW7 = gB.object({
        command: gB.literal("call"),
        params: gB.object({
            server: gB.string(),
            tool: gB.string(),
            args: gB.record(gB.string(), gB.unknown()),
            timeoutMs: gB.number().optional()
        })
    })), (BW7 = gB.object({
        command: gB.literal("grep"),
        params: gB.object({
            pattern: gB.string(),
            ignoreCase: gB.boolean().optional()
        })
    })), (GH9 = gB.array(gB.object({
        server: gB.string(),
        name: gB.string(),
        fullName: gB.string(),
        description: gB.string()
    }))), (GW7 = gB.object({
        command: gB.literal("resources"),
        params: gB.object({
            server: gB.string().optional()
        }).optional()
    })), (ZH9 = gB.array(gB.object({
        uri: gB.string(),
        name: gB.string().optional(),
        description: gB.string().optional(),
        mimeType: gB.string().optional(),
        server: gB.string()
    }))), (ZW7 = gB.object({
        command: gB.literal("read"),
        params: gB.object({
            server: gB.string(),
            uri: gB.string(),
            timeoutMs: gB.number().optional()
        })
    })), (YH9 = gB.discriminatedUnion("command", [
        tI7,
        eI7,
        AW7,
        QW7,
        BW7,
        GW7,
        ZW7
    ])));
});
import { join as YW7 } from "path";
import { writeFileSync as JW7, readFileSync as XW7, mkdirSync as IW7 } from "fs";
function CF1() {
    let A = RFA();
    return YW7(Yc(), `${A}.endpoint`);
}
function X6A(A) {
    if (A) aR0 = A;
    if (!aR0) return;
    IW7(Yc(), {
        recursive: !0
    });
    let Q = CF1(), B = Buffer.from(JSON.stringify(aR0)).toString("base64");
    JW7(Q, B, {
        mode: 384
    });
}
function JH9() {
    let A = CF1();
    try {
        let Q = XW7(A, "utf-8");
        return JSON.parse(Buffer.from(Q, "base64").toString("utf-8"));
    } catch  {
        return null;
    }
}
var aR0 = null;
