// Module: zm
// Type: L
// Lines: 317021-317386
//
var createRenderState = L(()=>{
    v2();
    pushStartInstance();
    pushStartInstance();
    A4();
    OT();
    describeNativeComponentFrame();
    read_string_buffer();
    GJ();
    restoreViewTransitionName();
    oBA();
    lTA();
    renderElement();
    g1();
    s1();
    pushStartInstance();
    xw();
    pushStartInstance();
    ((Uf3 = u.strictObject({
        file_path: u.string().describe("The absolute path to the file to write (must be absolute, not relative)"),
        content: u.string().describe("The content to write to the file")
    })), (wf3 = u.object({
        type: u.enum([
            "create",
            "update"
        ]).describe("Whether a new file was created or an existing file was updated"),
        filePath: u.string().describe("The path to the file that was written"),
        content: u.string().describe("The content that was written to the file"),
        structuredPatch: u.array(k70).describe("Diff patch showing the changes"),
        originalFile: u.string().nullable().describe("The original file content before the write (null for new files)")
    })), (yV = {
        name: zI,
        strict: !0,
        input_examples: [
            {
                file_path: "/Users/username/project/src/newFile.ts",
                content: `export function hello() {
  console.log("Hello, World!");
}`
            }
        ],
        async description () {
            return "Write a file to the local filesystem.";
        },
        userFacingName: o02,
        getToolUseSummary: r02,
        async prompt () {
            return JYB;
        },
        isEnabled () {
            return !0;
        },
        renderToolUseMessage: s02,
        inputSchema: Uf3,
        outputSchema: wf3,
        isConcurrencySafe () {
            return !1;
        },
        isReadOnly () {
            return !1;
        },
        getPath (A) {
            return A.file_path;
        },
        async checkPermissions (A, Q) {
            let B = await Q.getAppState();
            return J2A(yV, A, B.toolPermissionContext);
        },
        renderToolUseRejectedMessage: t02,
        renderToolUseErrorMessage: e02,
        renderToolUseProgressMessage: AQ2,
        renderToolResultMessage: QQ2,
        async validateInput ({ file_path: A }, Q) {
            let B = R4(A), G = await Q.getAppState();
            if (wF(B, G.toolPermissionContext, "edit", "deny") !== null) return {
                result: !1,
                message: "File is in a directory that is denied by your permission settings.",
                errorCode: 1
            };
            if (!vA().existsSync(B)) return {
                result: !0
            };
            let J = Q.readFileState.get(B);
            if (!J) return {
                result: !1,
                message: "File has not been read yet. Read it first before writing to it.",
                errorCode: 2
            };
            if (J) {
                if (Vw(B) > J.timestamp) return {
                    result: !1,
                    message: "File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.",
                    errorCode: 3
                };
            }
            return {
                result: !0
            };
        },
        async call ({ file_path: A, content: Q }, { readFileState: B, updateFileHistoryState: G }, Z, Y) {
            let J = R4(A), X = zf3(J), I = vA();
            await Km.beforeFileEdited(J);
            let W = I.existsSync(J);
            if (W) {
                let E = Vw(J), z = B.get(J);
                if (!z || E > z.timestamp) throw Error("File has been unexpectedly modified. Read it again before attempting to write it.");
            }
            let K = W ? LE(J) : "utf-8", V = W ? I.readFileSync(J, {
                encoding: K
            }) : null;
            if (QZ()) await fWA(G, J, Y.uuid);
            let H = W ? X2A(J) : await ZQ2();
            (I.mkdirSync(X), oWA(J, Q, K, H));
            let D = vWA();
            if (D) (O31(`file://${J}`), D.changeFile(J, Q).catch((E)=>{
                (k(`LSP: Failed to notify server of file change for ${J}: ${E.message}`), t(E));
            }), D.saveFile(J).catch((E)=>{
                (k(`LSP: Failed to notify server of file save for ${J}: ${E.message}`), t(E));
            }));
            if ((B.set(J, {
                content: Q,
                timestamp: Vw(J),
                offset: void 0,
                limit: void 0
            }), J.endsWith(`${Cf3}CLAUDE.md`))) r("tengu_write_claudemd", {});
            if (V) {
                let E = QL({
                    filePath: A,
                    fileContents: V,
                    edits: [
                        {
                            old_string: V,
                            new_string: Q,
                            replace_all: !1
                        }
                    ]
                }), z = {
                    type: "update",
                    filePath: A,
                    content: Q,
                    structuredPatch: E,
                    originalFile: V
                };
                return (qRA(E), gv({
                    operation: "write",
                    tool: "FileWriteTool",
                    filePath: J,
                    type: "update"
                }), {
                    data: z
                });
            }
            let F = {
                type: "create",
                filePath: A,
                content: Q,
                structuredPatch: [],
                originalFile: null
            };
            return (qRA([], Q), gv({
                operation: "write",
                tool: "FileWriteTool",
                filePath: J,
                type: "create"
            }), {
                data: F
            });
        },
        mapToolResultToToolResultBlockParam ({ filePath: A, content: Q, type: B }, G) {
            switch(B){
                case "create":
                    return {
                        tool_use_id: G,
                        type: "tool_result",
                        content: `File created successfully at: ${A}`
                    };
                case "update":
                    return {
                        tool_use_id: G,
                        type: "tool_result",
                        content: `The file ${A} has been updated. Here's the result of running \`cat -n\` on a snippet of the edited file:
${en({
                            content: Q.split(/\r?\n/).length > GQ2 ? Q.split(/\r?\n/).slice(0, GQ2).join(`
`) + $f3 : Q,
                            startLine: 1
                        })}`
                    };
            }
        }
    }));
});
function CG0({ count: A, countLabel: Q, secondaryCount: B, secondaryLabel: G, content: Z, verbose: Y }) {
    let J = mK.default.createElement(C, null, "Found ", mK.default.createElement(C, {
        bold: !0
    }, A, " "), A === 0 || A > 1 ? Q : Q.slice(0, -1)), X = B !== void 0 && G ? mK.default.createElement(C, null, " ", "across ", mK.default.createElement(C, {
        bold: !0
    }, B, " "), B === 0 || B > 1 ? G : G.slice(0, -1)) : null;
    if (Y) return mK.default.createElement(T, {
        flexDirection: "column"
    }, mK.default.createElement(T, {
        flexDirection: "row"
    }, mK.default.createElement(C, null, "  ⎿  ", J, X)), mK.default.createElement(T, {
        marginLeft: 5
    }, mK.default.createElement(C, null, Z)));
    return mK.default.createElement(b0, {
        height: 1
    }, mK.default.createElement(C, null, J, X, " ", A > 0 && mK.default.createElement(sT, null)));
}
function YQ2({ pattern: A, path: Q, glob: B, type: G, output_mode: Z = "files_with_matches", head_limit: Y }, { verbose: J }) {
    if (!A) return null;
    let X = [
        `pattern: "${A}"`
    ];
    if (Q) X.push(`path: "${J ? Q : S5(Q)}"`);
    if (B) X.push(`glob: "${B}"`);
    if (G) X.push(`type: "${G}"`);
    if (Z !== "files_with_matches") X.push(`output_mode: "${Z}"`);
    if (Y !== void 0) X.push(`head_limit: ${Y}`);
    return X.join(", ");
}
function JQ2() {
    return mK.default.createElement(o3, null);
}
function XQ2(A, { verbose: Q }) {
    if (!Q && typeof A === "string" && Z9(A, "tool_use_error")) return mK.default.createElement(b0, null, mK.default.createElement(C, {
        color: "error"
    }, "Error searching files"));
    return mK.default.createElement(n8, {
        result: A,
        verbose: Q
    });
}
function IQ2() {
    return null;
}
function WQ2({ mode: A = "files_with_matches", filenames: Q, numFiles: B, content: G, numLines: Z, numMatches: Y }, J, { verbose: X }) {
    if (A === "content") return mK.default.createElement(CG0, {
        count: Z ?? 0,
        countLabel: "lines",
        content: G,
        verbose: X
    });
    if (A === "count") return mK.default.createElement(CG0, {
        count: Y ?? 0,
        countLabel: "matches",
        secondaryCount: B,
        secondaryLabel: "files",
        content: G,
        verbose: X
    });
    let I = Q.map((W)=>W).join(`
`);
    return mK.default.createElement(CG0, {
        count: B,
        countLabel: "files",
        content: I,
        verbose: X
    });
}
function KQ2(A) {
    if (!A?.pattern) return null;
    return s5(A.pattern, ov);
}
var mK;
