// Module: Rw0
// Type: U
// Lines: 453564-453585
//
var renderElement = U((ro2)=>{
    Object.defineProperty(ro2, "__esModule", {
        value: !0
    });
    ro2.detectRuntime = void 0;
    var mA7 = ()=>{
        if (typeof process === "object" && process && typeof process.env === "object" && process.env && typeof process.version === "string") return "node";
        if (typeof window === "object") return "browser";
        if (typeof WebSocketPair < "u") return "cloudflare-worker";
        if (typeof EdgeRuntime === "string") return "vercel-edge";
        if (typeof WorkerGlobalScope < "u" && typeof importScripts === "function") return "web-worker";
        return "unknown";
    };
    ro2.detectRuntime = mA7;
});
