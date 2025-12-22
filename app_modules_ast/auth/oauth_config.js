// Module: BJ
// Type: L
// Lines: 58809-58937
//
var BJ = L(()=>{
    aQ();
    ((y44 = [
        S44,
        "user:profile"
    ]), (QN1 = [
        "user:profile",
        B5A,
        "user:sessions:claude_code",
        ...[]
    ]), (f2Q = Array.from(new Set([
        ...y44,
        ...QN1
    ]))), (x2Q = {
        BASE_API_URL: "https://api.anthropic.com",
        CONSOLE_AUTHORIZE_URL: "https://console.anthropic.com/oauth/authorize",
        CLAUDE_AI_AUTHORIZE_URL: "https://claude.ai/oauth/authorize",
        TOKEN_URL: "https://console.anthropic.com/v1/oauth/token",
        API_KEY_URL: "https://api.anthropic.com/api/oauth/claude_cli/create_api_key",
        ROLES_URL: "https://api.anthropic.com/api/oauth/claude_cli/roles",
        CONSOLE_SUCCESS_URL: "https://console.anthropic.com/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code",
        CLAUDEAI_SUCCESS_URL: "https://console.anthropic.com/oauth/code/success?app=claude-code",
        MANUAL_REDIRECT_URL: "https://console.anthropic.com/oauth/code/callback",
        CLIENT_ID: "9d1c250a-e61b-44d9-88ed-5944d1962f5e",
        OAUTH_FILE_SUFFIX: "",
        MCP_PROXY_URL: void 0,
        MCP_PROXY_PATH: void 0
    }), (v44 = {
        BASE_API_URL: "http://localhost:3000",
        CONSOLE_AUTHORIZE_URL: "http://localhost:3000/oauth/authorize",
        CLAUDE_AI_AUTHORIZE_URL: "http://localhost:4000/oauth/authorize",
        TOKEN_URL: "http://localhost:3000/v1/oauth/token",
        API_KEY_URL: "http://localhost:3000/api/oauth/claude_cli/create_api_key",
        ROLES_URL: "http://localhost:3000/api/oauth/claude_cli/roles",
        CONSOLE_SUCCESS_URL: "http://localhost:3000/buy_credits?returnUrl=/oauth/code/success%3Fapp%3Dclaude-code",
        CLAUDEAI_SUCCESS_URL: "http://localhost:3000/oauth/code/success?app=claude-code",
        MANUAL_REDIRECT_URL: "https://console.staging.ant.dev/oauth/code/callback",
        CLIENT_ID: "22422756-60c9-4084-8eb7-27705fd5cf9a",
        OAUTH_FILE_SUFFIX: "-local-oauth",
        MCP_PROXY_URL: "http://localhost:8205",
        MCP_PROXY_PATH: "/v1/toolbox/shttp/mcp/{server_id}"
    }));
});
import { accessSync as k44 } from "fs";
import { join as BN1 } from "path";
import { homedir as f44 } from "os";
import { constants as b2Q } from "fs";
function pD() {
    if (vA().existsSync(BN1(gQ(), ".config.json"))) return BN1(gQ(), ".config.json");
    let A = `.claude${k2Q()}.json`;
    return BN1(process.env.CLAUDE_CONFIG_DIR || f44(), A);
}
async function G5A(A) {
    try {
        let { cmd: Q } = GN1.findActualExecutable(A, []);
        try {
            return (k44(Q, b2Q.F_OK | b2Q.X_OK), !0);
        } catch  {
            return !1;
        }
    } catch  {
        return !1;
    }
}
function c44() {
    if (process.env.CURSOR_TRACE_ID) return "cursor";
    if (process.env.VSCODE_GIT_ASKPASS_MAIN?.includes("/.cursor-server/")) return "cursor";
    if (process.env.VSCODE_GIT_ASKPASS_MAIN?.includes("/.windsurf-server/")) return "windsurf";
    let A = process.env.__CFBundleIdentifier?.toLowerCase();
    if (A?.includes("vscodium")) return "codium";
    if (A?.includes("windsurf")) return "windsurf";
    if (A?.includes("com.google.android.studio")) return "androidstudio";
    if (A) {
        for (let Q of d44)if (A.includes(Q)) return Q;
    }
    if (process.env.VisualStudioVersion) return "visualstudio";
    if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") {
        if (process.platform === "darwin") return "pycharm";
        return "pycharm";
    }
    if (process.env.TERM === "xterm-ghostty") return "ghostty";
    if (process.env.TERM?.includes("kitty")) return "kitty";
    if (process.env.TERM_PROGRAM) return process.env.TERM_PROGRAM;
    if (process.env.STY) return "screen";
    if (process.env.KONSOLE_VERSION) return "konsole";
    if (process.env.GNOME_TERMINAL_SERVICE) return "gnome-terminal";
    if (process.env.XTERM_VERSION) return "xterm";
    if (process.env.VTE_VERSION) return "vte-based";
    if (process.env.TERMINATOR_UUID) return "terminator";
    if (process.env.KITTY_WINDOW_ID) return "kitty";
    if (process.env.ALACRITTY_LOG) return "alacritty";
    if (process.env.TILIX_ID) return "tilix";
    if (process.env.WT_SESSION) return "windows-terminal";
    if (process.env.SESSIONNAME && process.env.TERM === "cygwin") return "cygwin";
    if (process.env.MSYSTEM) return process.env.MSYSTEM.toLowerCase();
    if (process.env.ConEmuANSI || process.env.ConEmuPID || process.env.ConEmuTask) return "conemu";
    if (process.env.WSL_DISTRO_NAME) return `wsl-${process.env.WSL_DISTRO_NAME}`;
    if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.env.SSH_TTY) return "ssh-session";
    if (process.env.TERM) {
        let Q = process.env.TERM;
        if (Q.includes("alacritty")) return "alacritty";
        if (Q.includes("rxvt")) return "rxvt";
        if (Q.includes("termite")) return "termite";
        return process.env.TERM;
    }
    if (!process.stdout.isTTY) return "non-interactive";
    return null;
}
var GN1, b44, h44, g44, h2Q, u44, m44 = ()=>{
    return process.env.__CFBundleIdentifier === "com.conductor.app";
}, d44, p44, JQ;
