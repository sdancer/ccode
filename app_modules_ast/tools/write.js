// Module: IPA
// Type: L
// Lines: 317425-317785
//
var createRenderState = L(()=>{
    v2();
    aB();
    GJ();
    xy();
    LT();
    read_string_buffer();
    restoreViewTransitionName();
    pushStartInstance();
    su();
    ((Nf3 = u.strictObject({
        pattern: u.string().describe("The regular expression pattern to search for in file contents"),
        path: u.string().optional().describe("File or directory to search in (rg PATH). Defaults to current working directory."),
        glob: u.string().optional().describe('Glob pattern to filter files (e.g. "*.js", "*.{ts,tsx}") - maps to rg --glob'),
        output_mode: u.enum([
            "content",
            "files_with_matches",
            "count"
        ]).optional().describe('Output mode: "content" shows matching lines (supports -A/-B/-C context, -n line numbers, head_limit), "files_with_matches" shows file paths (supports head_limit), "count" shows match counts (supports head_limit). Defaults to "files_with_matches".'),
        "-B": u.number().optional().describe('Number of lines to show before each match (rg -B). Requires output_mode: "content", ignored otherwise.'),
        "-A": u.number().optional().describe('Number of lines to show after each match (rg -A). Requires output_mode: "content", ignored otherwise.'),
        "-C": u.number().optional().describe('Number of lines to show before and after each match (rg -C). Requires output_mode: "content", ignored otherwise.'),
        "-n": u.boolean().optional().describe('Show line numbers in output (rg -n). Requires output_mode: "content", ignored otherwise. Defaults to true.'),
        "-i": u.boolean().optional().describe("Case insensitive search (rg -i)"),
        type: u.string().optional().describe("File type to search (rg --type). Common types: js, py, rust, go, java, etc. More efficient than include for standard file types."),
        head_limit: u.number().optional().describe('Limit output to first N lines/entries, equivalent to "| head -N". Works across all output modes: content (limits output lines), files_with_matches (limits file paths), count (limits count entries). Defaults to 0 (unlimited).'),
        offset: u.number().optional().describe('Skip first N lines/entries before applying head_limit, equivalent to "| tail -n +N | head -N". Works across all output modes. Defaults to 0.'),
        multiline: u.boolean().optional().describe("Enable multiline mode where . matches newlines and patterns can span lines (rg -U --multiline-dotall). Default: false.")
    })), (Lf3 = [
        ".git",
        ".svn",
        ".hg",
        ".bzr"
    ]));
    ((Of3 = u.object({
        mode: u.enum([
            "content",
            "files_with_matches",
            "count"
        ]).optional(),
        numFiles: u.number(),
        filenames: u.array(u.string()),
        content: u.string().optional(),
        numLines: u.number().optional(),
        numMatches: u.number().optional(),
        appliedLimit: u.number().optional(),
        appliedOffset: u.number().optional()
    })), (Cm = {
        name: kX,
        strict: !0,
        input_examples: [
            {
                pattern: "TODO",
                output_mode: "files_with_matches"
            },
            {
                pattern: "function.*export",
                glob: "*.ts",
                output_mode: "content",
                "-n": !0
            },
            {
                pattern: "error",
                "-i": !0,
                type: "js"
            }
        ],
        async description () {
            return yl1();
        },
        userFacingName () {
            return "Search";
        },
        getToolUseSummary: KQ2,
        isEnabled () {
            return !0;
        },
        inputSchema: Nf3,
        outputSchema: Of3,
        isConcurrencySafe () {
            return !0;
        },
        isReadOnly () {
            return !0;
        },
        isSearchOrReadCommand () {
            return {
                isSearch: !0,
                isRead: !1
            };
        },
        getPath ({ path: A }) {
            return A || i1();
        },
        async validateInput ({ path: A }) {
            if (A) {
                let Q = vA(), B = R4(A);
                if (!Q.existsSync(B)) return {
                    result: !1,
                    message: `Path does not exist: ${A}`,
                    errorCode: 1
                };
            }
            return {
                result: !0
            };
        },
        async checkPermissions (A, Q) {
            let B = await Q.getAppState();
            return tn(Cm, A, B.toolPermissionContext);
        },
        async prompt () {
            return yl1();
        },
        renderToolUseMessage: YQ2,
        renderToolUseRejectedMessage: JQ2,
        renderToolUseErrorMessage: XQ2,
        renderToolUseProgressMessage: IQ2,
        renderToolResultMessage: WQ2,
        mapToolResultToToolResultBlockParam ({ mode: A = "files_with_matches", numFiles: Q, filenames: B, content: G, numLines: Z, numMatches: Y, appliedLimit: J, appliedOffset: X }, I) {
            if (A === "content") {
                let H = NG0(J, X), D = UG0(G || "No matches found"), F = H ? `${D}

[Showing results with pagination = ${H}]` : D;
                return {
                    tool_use_id: I,
                    type: "tool_result",
                    content: F
                };
            }
            if (A === "count") {
                let H = NG0(J, X), F = UG0(G || "No matches found"), E = Y ?? 0, z = Q ?? 0, $ = `

Found ${E} total ${E === 1 ? "occurrence" : "occurrences"} across ${z} ${z === 1 ? "file" : "files"}.${H ? ` with pagination = ${H}` : ""}`;
                return {
                    tool_use_id: I,
                    type: "tool_result",
                    content: F + $
                };
            }
            let W = NG0(J, X);
            if (Q === 0) return {
                tool_use_id: I,
                type: "tool_result",
                content: "No files found"
            };
            let K = `Found ${Q} file${Q === 1 ? "" : "s"}${W ? ` ${W}` : ""}
${B.join(`
`)}`, V = UG0(K);
            return {
                tool_use_id: I,
                type: "tool_result",
                content: V
            };
        },
        async call ({ pattern: A, path: Q, glob: B, type: G, output_mode: Z = "files_with_matches", "-B": Y, "-A": J, "-C": X, "-n": I = !0, "-i": W = !1, head_limit: K, offset: V = 0, multiline: H = !1 }, { abortController: D, getAppState: F }) {
            let E = Q ? R4(Q) : i1(), z = [
                "--hidden"
            ];
            for (let y of Lf3)z.push("--glob", `!${y}`);
            if ((z.push("--max-columns", "500"), H)) z.push("-U", "--multiline-dotall");
            if (W) z.push("-i");
            if (Z === "files_with_matches") z.push("-l");
            else if (Z === "count") z.push("-c");
            if (I && Z === "content") z.push("-n");
            if (X !== void 0 && Z === "content") z.push("-C", X.toString());
            else if (Z === "content") {
                if (Y !== void 0) z.push("-B", Y.toString());
                if (J !== void 0) z.push("-A", J.toString());
            }
            if (A.startsWith("-")) z.push("-e", A);
            else z.push(A);
            if (G) z.push("--type", G);
            if (B) {
                let y = [], m = B.split(/\s+/);
                for (let g of m)if (g.includes("{") && g.includes("}")) y.push(g);
                else y.push(...g.split(",").filter(Boolean));
                for (let g of y.filter(Boolean))z.push("--glob", g);
            }
            let $ = await F(), O = rWA(sWA($.toolPermissionContext), i1());
            for (let y of O){
                let m = y.startsWith("/") ? `!${y}` : `!**/${y}`;
                z.push("--glob", m);
            }
            let N = await yy(z, E, D.signal);
            if (Z === "content") {
                let y = N.map((s)=>{
                    let p = s.indexOf(":");
                    if (p > 0) {
                        let v = s.substring(0, p), d = s.substring(p);
                        return qG0(v) + d;
                    }
                    return s;
                }), m = wG0(y, K, V);
                return {
                    data: {
                        mode: "content",
                        numFiles: 0,
                        filenames: [],
                        content: m.join(`
`),
                        numLines: m.length,
                        ...(K !== void 0 && {
                            appliedLimit: K
                        }),
                        ...(V > 0 && {
                            appliedOffset: V
                        })
                    }
                };
            }
            if (Z === "count") {
                let y = N.map((v)=>{
                    let d = v.lastIndexOf(":");
                    if (d > 0) {
                        let AA = v.substring(0, d), YA = v.substring(d);
                        return qG0(AA) + YA;
                    }
                    return v;
                }), m = wG0(y, K, V), g = 0, s = 0;
                for (let v of m){
                    let d = v.lastIndexOf(":");
                    if (d > 0) {
                        let AA = v.substring(d + 1), YA = parseInt(AA, 10);
                        if (!isNaN(YA)) ((g += YA), (s += 1));
                    }
                }
                return {
                    data: {
                        mode: "count",
                        numFiles: s,
                        filenames: [],
                        content: m.join(`
`),
                        numMatches: g,
                        ...(K !== void 0 && {
                            appliedLimit: K
                        }),
                        ...(V > 0 && {
                            appliedOffset: V
                        })
                    }
                };
            }
            let M = await Promise.all(N.map((y)=>vA().stat(y))), R = N.map((y, m)=>[
                    y,
                    M[m]
                ]).sort((y, m)=>{
                let g = (m[1].mtimeMs ?? 0) - (y[1].mtimeMs ?? 0);
                if (g === 0) return y[0].localeCompare(m[0]);
                return g;
            }).map((y)=>y[0]), P = wG0(R, K, V).map(qG0);
            return {
                data: {
                    mode: "files_with_matches",
                    filenames: P,
                    numFiles: P.length,
                    ...(K !== void 0 && {
                        appliedLimit: K
                    }),
                    ...(V > 0 && {
                        appliedOffset: V
                    })
                }
            };
        }
    }));
});
function HQ2() {
    return "Search";
}
function DQ2({ pattern: A, path: Q }, { verbose: B }) {
    if (!A) return null;
    if (!Q) return `pattern: "${A}"`;
    return `pattern: "${A}", path: "${B ? Q : S5(Q)}"`;
}
function FQ2() {
    return WPA.default.createElement(o3, null);
}
function EQ2(A, { verbose: Q }) {
    if (!Q && typeof A === "string" && Z9(A, "tool_use_error")) return WPA.default.createElement(b0, null, WPA.default.createElement(C, {
        color: "error"
    }, "Error searching files"));
    return WPA.default.createElement(n8, {
        result: A,
        verbose: Q
    });
}
function zQ2() {
    return null;
}
function $Q2(A) {
    if (!A?.pattern) return null;
    return s5(A.pattern, ov);
}
var WPA, CQ2;
