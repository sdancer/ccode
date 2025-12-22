// Module: EA9
// Type: L
// Lines: 467078-467493
//
var EA9 = L(()=>{
    bA();
    pushStartInstance();
    MkA();
    X2();
});
function OV1(A) {
    return DQ7.includes(A);
}
function MV1(A, Q, B, G) {
    if (!A.toolDecisions) A.toolDecisions = new Map();
    A.toolDecisions.set(Q, {
        source: G,
        decision: B,
        timestamp: Date.now()
    });
}
function RV1(A, Q, B, G) {
    let Z;
    if (A.getPath && Q) {
        let Y = A.inputSchema.safeParse(Q);
        if (Y.success) {
            let J = A.getPath(Y.data);
            if (J) Z = XHA(J);
        }
    }
    return {
        decision: B,
        source: G,
        tool_name: A.name,
        ...(Z && {
            language: Z
        })
    };
}
async function _V1(A, Q, B) {
    await JD("tool_decision", {
        decision: Q,
        source: B,
        tool_name: A
    });
}
function zA9(A, Q, B, G, Z) {
    if ((r("tengu_tool_use_granted_in_config", {
        messageID: G,
        toolName: A.name,
        sandboxEnabled: MB.isSandboxingEnabled()
    }), OV1(A.name))) {
        let Y = RV1(A, Q, "accept", "config");
        MEA()?.add(1, Y);
    }
    (MV1(B, Z, "accept", "config"), _V1(A.name, "accept", "config"));
}
function FQ7(A) {
    switch(A.type){
        case "hook":
            return "hook";
        case "user":
            return A.permanent ? "user_permanent" : "user_temporary";
    }
}
function Dq0(A, Q, B, G, Z, Y, J) {
    let X = J !== void 0 ? Date.now() - J : void 0;
    switch(Y.type){
        case "user":
            r(Y.permanent ? "tengu_tool_use_granted_in_prompt_permanent" : "tengu_tool_use_granted_in_prompt_temporary", {
                messageID: G,
                toolName: A.name,
                sandboxEnabled: MB.isSandboxingEnabled(),
                ...(X !== void 0 && {
                    waiting_for_user_permission_ms: X
                })
            });
            break;
        case "hook":
            r("tengu_tool_use_granted_by_permission_hook", {
                messageID: G,
                toolName: A.name,
                sandboxEnabled: MB.isSandboxingEnabled(),
                permanent: Y.permanent ?? !1,
                ...(X !== void 0 && {
                    waiting_for_user_permission_ms: X
                })
            });
            break;
    }
    let I = FQ7(Y);
    if (OV1(A.name)) {
        let W = RV1(A, Q, "accept", I);
        MEA()?.add(1, W);
    }
    (MV1(B, Z, "accept", I), _V1(A.name, "accept", I));
}
function LV1(A, Q, B, G, Z, Y, J) {
    let X = Y.type === "hook", I = X ? "hook" : Y.type, W = J !== void 0 ? Date.now() - J : void 0;
    if (X) r("tengu_tool_use_rejected_in_prompt", {
        messageID: G,
        toolName: A.name,
        sandboxEnabled: MB.isSandboxingEnabled(),
        isHook: !0,
        ...(W !== void 0 && {
            waiting_for_user_permission_ms: W
        })
    });
    else {
        let K = Y.type === "user_reject" ? Y.hasFeedback : !1;
        r("tengu_tool_use_rejected_in_prompt", {
            messageID: G,
            toolName: A.name,
            sandboxEnabled: MB.isSandboxingEnabled(),
            hasFeedback: K,
            ...(W !== void 0 && {
                waiting_for_user_permission_ms: W
            })
        });
    }
    if (OV1(A.name)) {
        let K = RV1(A, Q, "reject", I);
        MEA()?.add(1, K);
    }
    (MV1(B, Z, "reject", I), _V1(A.name, "reject", I));
}
function EQ7(A, Q) {
    return CA9.useCallback(async (B, G, Z, Y, J, X)=>{
        return new Promise((I)=>{
            function W() {
                r("tengu_tool_use_cancelled", {
                    messageID: Y.message.id,
                    toolName: B.name
                });
            }
            function K(H) {
                let D = H ? `${ykA}${H}` : K9A;
                if ((I({
                    behavior: "ask",
                    message: D
                }), !H)) Z.abortController.abort();
            }
            if (Z.abortController.signal.aborted) {
                (W(), K());
                return;
            }
            return (X !== void 0 ? Promise.resolve(X) : X$(B, G, Z, Y, J)).then(async (H)=>{
                if (H.behavior === "allow") {
                    (zA9(B, G, Z, Y.message.id, J), I({
                        ...H,
                        updatedInput: G,
                        userModified: !1
                    }));
                    return;
                }
                let D = await Z.getAppState(), F = await B.description(G, {
                    isNonInteractiveSession: Z.options.isNonInteractiveSession,
                    toolPermissionContext: D.toolPermissionContext,
                    tools: Z.options.tools
                });
                if (Z.abortController.signal.aborted) {
                    (W(), K());
                    return;
                }
                switch(H.behavior){
                    case "deny":
                        {
                            if ((r("tengu_tool_use_denied_in_config", {
                                messageID: Y.message.id,
                                toolName: B.name,
                                sandboxEnabled: MB.isSandboxingEnabled()
                            }), OV1(B.name))) {
                                let E = RV1(B, G, "reject", "config");
                                MEA()?.add(1, E);
                            }
                            (MV1(Z, J, "reject", "config"), _V1(B.name, "reject", "config"), I(H));
                            return;
                        }
                    case "ask":
                        {
                            let E = !1;
                            if ($xA()) try {
                                let O = yL2({
                                    toolName: B.name,
                                    toolUseId: J,
                                    input: G,
                                    description: F,
                                    permissionSuggestions: H.suggestions
                                });
                                (hL2({
                                    requestId: O.id,
                                    toolUseId: J,
                                    onAllow: async (N, M, R)=>{
                                        if (E) return;
                                        if (((E = !0), Z.setAppState((m)=>({
                                                ...m,
                                                pendingWorkerRequest: null
                                            })), M.length > 0)) {
                                            zYA(M);
                                            let m = await Z.getAppState(), g = Ng(m.toolPermissionContext, M);
                                            Q(g);
                                        }
                                        let j = M.some((m)=>MNA(m.destination));
                                        Dq0(B, N, Z, Y.message.id, J, {
                                            type: "user",
                                            permanent: j
                                        });
                                        let P = Object.keys(N).length > 0 ? N : G, f = B.inputsEquivalent ? !B.inputsEquivalent(G, P) : !1, y = R?.trim();
                                        I({
                                            behavior: "allow",
                                            updatedInput: P,
                                            userModified: f,
                                            acceptFeedback: y || void 0
                                        });
                                    },
                                    onReject: (N)=>{
                                        if (E) return;
                                        ((E = !0), Z.setAppState((M)=>({
                                                ...M,
                                                pendingWorkerRequest: null
                                            })), LV1(B, G, Z, Y.message.id, J, {
                                            type: "user_reject",
                                            hasFeedback: !!N
                                        }), K(N));
                                    }
                                }), vL2(O), Z.setAppState((N)=>({
                                        ...N,
                                        pendingWorkerRequest: {
                                            toolName: B.name,
                                            toolUseId: J,
                                            description: F
                                        }
                                    })));
                                return;
                            } catch (O) {
                                t(O instanceof Error ? O : Error(`Failed to submit swarm permission request: ${String(O)}`));
                            }
                            let z = Date.now();
                            A((O)=>[
                                    ...O,
                                    {
                                        assistantMessage: Y,
                                        tool: B,
                                        description: F,
                                        input: G,
                                        toolUseContext: Z,
                                        toolUseID: J,
                                        permissionResult: H,
                                        permissionPromptStartTimeMs: z,
                                        onAbort () {
                                            if (E) return;
                                            ((E = !0), W(), LV1(B, G, Z, Y.message.id, J, {
                                                type: "user_abort"
                                            }, z), K());
                                        },
                                        async onAllow (N, M, R) {
                                            if (E) return;
                                            ((E = !0), zYA(M));
                                            let j = await Z.getAppState(), P = Ng(j.toolPermissionContext, M);
                                            Q(P);
                                            let f = M.some((g)=>MNA(g.destination));
                                            Dq0(B, N, Z, Y.message.id, J, {
                                                type: "user",
                                                permanent: f
                                            }, z);
                                            let y = B.inputsEquivalent ? !B.inputsEquivalent(G, N) : !1, m = R?.trim();
                                            I({
                                                behavior: "allow",
                                                updatedInput: N,
                                                userModified: y,
                                                acceptFeedback: m || void 0
                                            });
                                        },
                                        onReject (N) {
                                            if (E) return;
                                            ((E = !0), LV1(B, G, Z, Y.message.id, J, {
                                                type: "user_reject",
                                                hasFeedback: !!N
                                            }, z), K(N));
                                        },
                                        async recheckPermission () {
                                            if (E) return;
                                            let N = await X$(B, G, Z, Y, J);
                                            if (N.behavior === "allow") (A((M)=>M.filter((R)=>R.toolUseID !== J)), zA9(B, G, Z, Y.message.id, J), (E = !0), I({
                                                behavior: "allow",
                                                updatedInput: N.updatedInput || G,
                                                userModified: !1
                                            }));
                                        }
                                    }
                                ]);
                            let $ = await Z.getAppState();
                            (async ()=>{
                                for await (let O of tVA([
                                    Fq0(B.name, J, G, Z, $.toolPermissionContext.mode, H.suggestions, Z.abortController.signal)
                                ])){
                                    if (E) return;
                                    if (O.permissionRequestResult && (O.permissionRequestResult.behavior === "allow" || O.permissionRequestResult.behavior === "deny")) {
                                        ((E = !0), A((M)=>M.filter((R)=>R.toolUseID !== J)));
                                        let N = O.permissionRequestResult;
                                        if (N.behavior === "allow") {
                                            let M = N.updatedInput || G, R = N.updatedPermissions ?? [];
                                            if (R.length > 0) {
                                                zYA(R);
                                                let P = await Z.getAppState(), f = Ng(P.toolPermissionContext, R);
                                                Q(f);
                                            }
                                            let j = R.some((P)=>MNA(P.destination));
                                            (Dq0(B, M, Z, Y.message.id, J, {
                                                type: "hook",
                                                permanent: j
                                            }, z), I({
                                                behavior: "allow",
                                                updatedInput: M,
                                                userModified: !1,
                                                decisionReason: {
                                                    type: "hook",
                                                    hookName: "PermissionRequest"
                                                }
                                            }));
                                            return;
                                        } else if (N.behavior === "deny") {
                                            if ((LV1(B, G, Z, Y.message.id, J, {
                                                type: "hook"
                                            }, z), I({
                                                behavior: "deny",
                                                message: N.message || "Permission denied by hook",
                                                decisionReason: {
                                                    type: "hook",
                                                    hookName: "PermissionRequest",
                                                    reason: N.message
                                                }
                                            }), N.interrupt)) Z.abortController.abort();
                                            return;
                                        }
                                    }
                                }
                            })();
                            return;
                        }
                }
            }).catch((H)=>{
                if (H instanceof RX) (W(), K());
                else t(H);
            });
        });
    }, [
        A,
        Q
    ]);
}
var CA9, DQ7, $A9;
