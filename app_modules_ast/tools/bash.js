// Module: dH
// Type: L
// Lines: 256088-256647
//
var samplingCallback = L(()=>{
    iXA();
    ((c21 = [
        Ga,
        "2025-06-18",
        "2025-03-26",
        "2024-11-05",
        "2024-10-07"
    ]), (dv = v20((A)=>A !== null && (typeof A === "object" || typeof A === "function"))), (WxB = SZ([
        u1(),
        u7().int()
    ])), (KxB = u1()), (A83 = qF({
        ttl: SZ([
            u7(),
            V_A()
        ]).optional(),
        pollInterval: u7().optional()
    })), (b20 = qF({
        taskId: u1()
    })), (Q83 = qF({
        progressToken: WxB.optional(),
        [cv]: b20.optional()
    })), (Fw = qF({
        task: A83.optional(),
        _meta: Q83.optional()
    })), (NF = DB({
        method: u1(),
        params: Fw.optional()
    })), (lQA = qF({
        _meta: DB({
            [cv]: K9(b20)
        }).passthrough().optional()
    })), (qR = DB({
        method: u1(),
        params: lQA.optional()
    })), (Zz = qF({
        _meta: qF({
            [cv]: b20.optional()
        }).optional()
    })), (l21 = SZ([
        u1(),
        u7().int()
    ])), (VxB = DB({
        jsonrpc: o2(p21),
        id: l21,
        ...NF.shape
    }).strict()), (HxB = DB({
        jsonrpc: o2(p21),
        ...qR.shape
    }).strict()), (FxB = DB({
        jsonrpc: o2(p21),
        id: l21,
        result: Zz
    }).strict()));
    (function(A) {
        ((A[(A.ConnectionClosed = -32000)] = "ConnectionClosed"), (A[(A.RequestTimeout = -32001)] = "RequestTimeout"), (A[(A.ParseError = -32700)] = "ParseError"), (A[(A.InvalidRequest = -32600)] = "InvalidRequest"), (A[(A.MethodNotFound = -32601)] = "MethodNotFound"), (A[(A.InvalidParams = -32602)] = "InvalidParams"), (A[(A.InternalError = -32603)] = "InternalError"), (A[(A.UrlElicitationRequired = -32042)] = "UrlElicitationRequired"));
    })(w4 || (w4 = {}));
    ((ExB = DB({
        jsonrpc: o2(p21),
        id: l21,
        error: DB({
            code: u7().int(),
            message: u1(),
            data: K9(CW())
        })
    }).strict()), (pv = SZ([
        VxB,
        HxB,
        FxB,
        ExB
    ])), (xu = Zz.strict()), (B83 = lQA.extend({
        requestId: l21,
        reason: u1().optional()
    })), (i21 = qR.extend({
        method: o2("notifications/cancelled"),
        params: B83
    })), (G83 = DB({
        src: u1(),
        mimeType: u1().optional(),
        sizes: hB(u1()).optional()
    })), (E_A = DB({
        icons: hB(G83).optional()
    })), (nXA = DB({
        name: u1(),
        title: u1().optional()
    })), (CxB = nXA.extend({
        ...nXA.shape,
        ...E_A.shape,
        version: u1(),
        websiteUrl: u1().optional()
    })), (Z83 = H_A(DB({
        applyDefaults: PZ().optional()
    }), NI(u1(), CW()))), (Y83 = m21((A)=>{
        if (A && typeof A === "object" && !Array.isArray(A)) {
            if (Object.keys(A).length === 0) return {
                form: {}
            };
        }
        return A;
    }, H_A(DB({
        form: Z83.optional(),
        url: dv.optional()
    }), NI(u1(), CW()).optional()))), (J83 = DB({
        list: K9(DB({}).passthrough()),
        cancel: K9(DB({}).passthrough()),
        requests: K9(DB({
            sampling: K9(DB({
                createMessage: K9(DB({}).passthrough())
            }).passthrough()),
            elicitation: K9(DB({
                create: K9(DB({}).passthrough())
            }).passthrough())
        }).passthrough())
    }).passthrough()), (X83 = DB({
        list: K9(DB({}).passthrough()),
        cancel: K9(DB({}).passthrough()),
        requests: K9(DB({
            tools: K9(DB({
                call: K9(DB({}).passthrough())
            }).passthrough())
        }).passthrough())
    }).passthrough()), (I83 = DB({
        experimental: NI(u1(), dv).optional(),
        sampling: DB({
            context: dv.optional(),
            tools: dv.optional()
        }).optional(),
        elicitation: Y83.optional(),
        roots: DB({
            listChanged: PZ().optional()
        }).optional(),
        tasks: K9(J83)
    })), (W83 = Fw.extend({
        protocolVersion: u1(),
        capabilities: I83,
        clientInfo: CxB
    })), (h20 = NF.extend({
        method: o2("initialize"),
        params: W83
    })), (K83 = DB({
        experimental: NI(u1(), dv).optional(),
        logging: dv.optional(),
        completions: dv.optional(),
        prompts: K9(DB({
            listChanged: K9(PZ())
        })),
        resources: DB({
            subscribe: PZ().optional(),
            listChanged: PZ().optional()
        }).optional(),
        tools: DB({
            listChanged: PZ().optional()
        }).optional(),
        tasks: K9(X83)
    }).passthrough()), (g20 = Zz.extend({
        protocolVersion: u1(),
        capabilities: K83,
        serverInfo: CxB,
        instructions: u1().optional()
    })), (n21 = qR.extend({
        method: o2("notifications/initialized")
    })), (a21 = NF.extend({
        method: o2("ping")
    })), (V83 = DB({
        progress: u7(),
        total: K9(u7()),
        message: K9(u1())
    })), (H83 = DB({
        ...lQA.shape,
        ...V83.shape,
        progressToken: WxB
    })), (o21 = qR.extend({
        method: o2("notifications/progress"),
        params: H83
    })), (D83 = Fw.extend({
        cursor: KxB.optional()
    })), (z_A = NF.extend({
        params: D83.optional()
    })), (C_A = Zz.extend({
        nextCursor: K9(KxB)
    })), ($_A = DB({
        taskId: u1(),
        status: mH([
            "working",
            "input_required",
            "completed",
            "failed",
            "cancelled"
        ]),
        ttl: SZ([
            u7(),
            V_A()
        ]),
        createdAt: u1(),
        lastUpdatedAt: u1(),
        pollInterval: K9(u7()),
        statusMessage: K9(u1())
    })), (vu = Zz.extend({
        task: $_A
    })), (F83 = lQA.merge($_A)), (U_A = qR.extend({
        method: o2("notifications/tasks/status"),
        params: F83
    })), (r21 = NF.extend({
        method: o2("tasks/get"),
        params: Fw.extend({
            taskId: u1()
        })
    })), (s21 = Zz.merge($_A)), (t21 = NF.extend({
        method: o2("tasks/result"),
        params: Fw.extend({
            taskId: u1()
        })
    })), (e21 = z_A.extend({
        method: o2("tasks/list")
    })), (A91 = C_A.extend({
        tasks: hB($_A)
    })), (UxB = NF.extend({
        method: o2("tasks/cancel"),
        params: Fw.extend({
            taskId: u1()
        })
    })), (wxB = Zz.merge($_A)), (qxB = DB({
        uri: u1(),
        mimeType: K9(u1()),
        _meta: NI(u1(), CW()).optional()
    })), (NxB = qxB.extend({
        text: u1()
    })), (u20 = u1().refine((A)=>{
        try {
            return (atob(A), !0);
        } catch (Q) {
            return !1;
        }
    }, {
        message: "Invalid Base64 string"
    })), (LxB = qxB.extend({
        blob: u20
    })), (aXA = DB({
        audience: hB(mH([
            "user",
            "assistant"
        ])).optional(),
        priority: u7().min(0).max(1).optional(),
        lastModified: cXA.datetime({
            offset: !0
        }).optional()
    })), (OxB = DB({
        ...nXA.shape,
        ...E_A.shape,
        uri: u1(),
        description: K9(u1()),
        mimeType: K9(u1()),
        annotations: aXA.optional(),
        _meta: K9(qF({}))
    })), (E83 = DB({
        ...nXA.shape,
        ...E_A.shape,
        uriTemplate: u1(),
        description: K9(u1()),
        mimeType: K9(u1()),
        annotations: aXA.optional(),
        _meta: K9(qF({}))
    })), (z83 = z_A.extend({
        method: o2("resources/list")
    })), (nQA = C_A.extend({
        resources: hB(OxB)
    })), (C83 = z_A.extend({
        method: o2("resources/templates/list")
    })), (m20 = C_A.extend({
        resourceTemplates: hB(E83)
    })), (d20 = Fw.extend({
        uri: u1()
    })), ($83 = d20), (U83 = NF.extend({
        method: o2("resources/read"),
        params: $83
    })), (aQA = Zz.extend({
        contents: hB(SZ([
            NxB,
            LxB
        ]))
    })), (w83 = qR.extend({
        method: o2("notifications/resources/list_changed")
    })), (q83 = d20), (N83 = NF.extend({
        method: o2("resources/subscribe"),
        params: q83
    })), (L83 = d20), (O83 = NF.extend({
        method: o2("resources/unsubscribe"),
        params: L83
    })), (M83 = lQA.extend({
        uri: u1()
    })), (R83 = qR.extend({
        method: o2("notifications/resources/updated"),
        params: M83
    })), (_83 = DB({
        name: u1(),
        description: K9(u1()),
        required: K9(PZ())
    })), (j83 = DB({
        ...nXA.shape,
        ...E_A.shape,
        description: K9(u1()),
        arguments: K9(hB(_83)),
        _meta: K9(qF({}))
    })), (T83 = z_A.extend({
        method: o2("prompts/list")
    })), (w_A = C_A.extend({
        prompts: hB(j83)
    })), (P83 = Fw.extend({
        name: u1(),
        arguments: NI(u1(), u1()).optional()
    })), (S83 = NF.extend({
        method: o2("prompts/get"),
        params: P83
    })), (c20 = DB({
        type: o2("text"),
        text: u1(),
        annotations: aXA.optional(),
        _meta: NI(u1(), CW()).optional()
    })), (p20 = DB({
        type: o2("image"),
        data: u20,
        mimeType: u1(),
        annotations: aXA.optional(),
        _meta: NI(u1(), CW()).optional()
    })), (l20 = DB({
        type: o2("audio"),
        data: u20,
        mimeType: u1(),
        annotations: aXA.optional(),
        _meta: NI(u1(), CW()).optional()
    })), (y83 = DB({
        type: o2("tool_use"),
        name: u1(),
        id: u1(),
        input: DB({}).passthrough(),
        _meta: K9(DB({}).passthrough())
    }).passthrough()), (x83 = DB({
        type: o2("resource"),
        resource: SZ([
            NxB,
            LxB
        ]),
        annotations: aXA.optional(),
        _meta: NI(u1(), CW()).optional()
    })), (v83 = OxB.extend({
        type: o2("resource_link")
    })), (i20 = SZ([
        c20,
        p20,
        l20,
        v83,
        x83
    ])), (k83 = DB({
        role: mH([
            "user",
            "assistant"
        ]),
        content: i20
    })), (n20 = Zz.extend({
        description: K9(u1()),
        messages: hB(k83)
    })), (f83 = qR.extend({
        method: o2("notifications/prompts/list_changed")
    })), (b83 = DB({
        title: u1().optional(),
        readOnlyHint: PZ().optional(),
        destructiveHint: PZ().optional(),
        idempotentHint: PZ().optional(),
        openWorldHint: PZ().optional()
    })), (h83 = DB({
        taskSupport: mH([
            "required",
            "optional",
            "forbidden"
        ]).optional()
    })), (MxB = DB({
        ...nXA.shape,
        ...E_A.shape,
        description: u1().optional(),
        inputSchema: DB({
            type: o2("object"),
            properties: NI(u1(), dv).optional(),
            required: hB(u1()).optional()
        }).catchall(CW()),
        outputSchema: DB({
            type: o2("object"),
            properties: NI(u1(), dv).optional(),
            required: hB(u1()).optional()
        }).catchall(CW()).optional(),
        annotations: K9(b83),
        execution: K9(h83),
        _meta: NI(u1(), CW()).optional()
    })), (q_A = z_A.extend({
        method: o2("tools/list")
    })), (N_A = C_A.extend({
        tools: hB(MxB)
    })), (oC = Zz.extend({
        content: hB(i20).default([]),
        structuredContent: NI(u1(), CW()).optional(),
        isError: K9(PZ())
    })), (BnG = oC.or(Zz.extend({
        toolResult: CW()
    }))), (g83 = Fw.extend({
        name: u1(),
        arguments: K9(NI(u1(), CW()))
    })), (oQA = NF.extend({
        method: o2("tools/call"),
        params: g83
    })), (u83 = qR.extend({
        method: o2("notifications/tools/list_changed")
    })), (L_A = mH([
        "debug",
        "info",
        "notice",
        "warning",
        "error",
        "critical",
        "alert",
        "emergency"
    ])), (m83 = Fw.extend({
        level: L_A
    })), (a20 = NF.extend({
        method: o2("logging/setLevel"),
        params: m83
    })), (d83 = lQA.extend({
        level: L_A,
        logger: u1().optional(),
        data: CW()
    })), (c83 = qR.extend({
        method: o2("notifications/message"),
        params: d83
    })), (p83 = DB({
        name: u1().optional()
    })), (l83 = DB({
        hints: K9(hB(p83)),
        costPriority: K9(u7().min(0).max(1)),
        speedPriority: K9(u7().min(0).max(1)),
        intelligencePriority: K9(u7().min(0).max(1))
    })), (i83 = DB({
        mode: K9(mH([
            "auto",
            "required",
            "none"
        ]))
    })), (n83 = DB({
        type: o2("tool_result"),
        toolUseId: u1().describe("The unique identifier for the corresponding tool call."),
        content: hB(i20).default([]),
        structuredContent: DB({}).passthrough().optional(),
        isError: K9(PZ()),
        _meta: K9(DB({}).passthrough())
    }).passthrough()), (a83 = g21("type", [
        c20,
        p20,
        l20
    ])), (d21 = g21("type", [
        c20,
        p20,
        l20,
        y83,
        n83
    ])), (o83 = DB({
        role: mH([
            "user",
            "assistant"
        ]),
        content: SZ([
            d21,
            hB(d21)
        ]),
        _meta: K9(DB({}).passthrough())
    }).passthrough()), (r83 = Fw.extend({
        messages: hB(o83),
        modelPreferences: l83.optional(),
        systemPrompt: u1().optional(),
        includeContext: mH([
            "none",
            "thisServer",
            "allServers"
        ]).optional(),
        temperature: u7().optional(),
        maxTokens: u7().int(),
        stopSequences: hB(u1()).optional(),
        metadata: dv.optional(),
        tools: K9(hB(MxB)),
        toolChoice: K9(i83)
    })), (o20 = NF.extend({
        method: o2("sampling/createMessage"),
        params: r83
    })), (O_A = Zz.extend({
        model: u1(),
        stopReason: K9(mH([
            "endTurn",
            "stopSequence",
            "maxTokens"
        ]).or(u1())),
        role: mH([
            "user",
            "assistant"
        ]),
        content: a83
    })), (r20 = Zz.extend({
        model: u1(),
        stopReason: K9(mH([
            "endTurn",
            "stopSequence",
            "maxTokens",
            "toolUse"
        ]).or(u1())),
        role: mH([
            "user",
            "assistant"
        ]),
        content: SZ([
            d21,
            hB(d21)
        ])
    })), (s83 = DB({
        type: o2("boolean"),
        title: u1().optional(),
        description: u1().optional(),
        default: PZ().optional()
    })), (t83 = DB({
        type: o2("string"),
        title: u1().optional(),
        description: u1().optional(),
        minLength: u7().optional(),
        maxLength: u7().optional(),
        format: mH([
            "email",
            "uri",
            "date",
            "date-time"
        ]).optional(),
        default: u1().optional()
    })), (e83 = DB({
        type: mH([
            "number",
            "integer"
        ]),
        title: u1().optional(),
        description: u1().optional(),
        minimum: u7().optional(),
        maximum: u7().optional(),
        default: u7().optional()
    })), (A33 = DB({
        type: o2("string"),
        title: u1().optional(),
        description: u1().optional(),
        enum: hB(u1()),
        default: u1().optional()
    })), (Q33 = DB({
        type: o2("string"),
        title: u1().optional(),
        description: u1().optional(),
        oneOf: hB(DB({
            const: u1(),
            title: u1()
        })),
        default: u1().optional()
    })), (B33 = DB({
        type: o2("string"),
        title: u1().optional(),
        description: u1().optional(),
        enum: hB(u1()),
        enumNames: hB(u1()).optional(),
        default: u1().optional()
    })), (G33 = SZ([
        A33,
        Q33
    ])), (Z33 = DB({
        type: o2("array"),
        title: u1().optional(),
        description: u1().optional(),
        minItems: u7().optional(),
        maxItems: u7().optional(),
        items: DB({
            type: o2("string"),
            enum: hB(u1())
        }),
        default: hB(u1()).optional()
    })), (Y33 = DB({
        type: o2("array"),
        title: u1().optional(),
        description: u1().optional(),
        minItems: u7().optional(),
        maxItems: u7().optional(),
        items: DB({
            anyOf: hB(DB({
                const: u1(),
                title: u1()
            }))
        }),
        default: hB(u1()).optional()
    })), (J33 = SZ([
        Z33,
        Y33
    ])), (X33 = SZ([
        B33,
        G33,
        J33
    ])), (I33 = SZ([
        X33,
        s83,
        t83,
        e83
    ])), (W33 = Fw.extend({
        mode: o2("form").optional(),
        message: u1(),
        requestedSchema: DB({
            type: o2("object"),
            properties: NI(u1(), I33),
            required: hB(u1()).optional()
        })
    })), (K33 = Fw.extend({
        mode: o2("url"),
        message: u1(),
        elicitationId: u1(),
        url: u1().url()
    })), (V33 = SZ([
        W33,
        K33
    ])), (Q91 = NF.extend({
        method: o2("elicitation/create"),
        params: V33
    })), (H33 = lQA.extend({
        elicitationId: u1()
    })), (D33 = qR.extend({
        method: o2("notifications/elicitation/complete"),
        params: H33
    })), (oXA = Zz.extend({
        action: mH([
            "accept",
            "decline",
            "cancel"
        ]),
        content: m21((A)=>(A === null ? void 0 : A), NI(u1(), SZ([
            u1(),
            u7(),
            PZ(),
            hB(u1())
        ])).optional())
    })), (F33 = DB({
        type: o2("ref/resource"),
        uri: u1()
    })), (E33 = DB({
        type: o2("ref/prompt"),
        name: u1()
    })), (z33 = Fw.extend({
        ref: SZ([
            E33,
            F33
        ]),
        argument: DB({
            name: u1(),
            value: u1()
        }),
        context: DB({
            arguments: NI(u1(), u1()).optional()
        }).optional()
    })), (C33 = NF.extend({
        method: o2("completion/complete"),
        params: z33
    })), (s20 = Zz.extend({
        completion: qF({
            values: hB(u1()).max(100),
            total: K9(u7().int()),
            hasMore: K9(PZ())
        })
    })), ($33 = DB({
        uri: u1().startsWith("file://"),
        name: u1().optional(),
        _meta: NI(u1(), CW()).optional()
    })), (t20 = NF.extend({
        method: o2("roots/list")
    })), (e20 = Zz.extend({
        roots: hB($33)
    })), (U33 = qR.extend({
        method: o2("notifications/roots/list_changed")
    })), (GnG = SZ([
        a21,
        h20,
        C33,
        a20,
        S83,
        T83,
        z83,
        C83,
        U83,
        N83,
        O83,
        oQA,
        q_A,
        r21,
        t21,
        e21
    ])), (ZnG = SZ([
        i21,
        o21,
        n21,
        U33,
        U_A
    ])), (YnG = SZ([
        xu,
        O_A,
        r20,
        oXA,
        e20,
        s21,
        A91,
        vu
    ])), (JnG = SZ([
        a21,
        o20,
        Q91,
        t20,
        r21,
        t21,
        e21
    ])), (XnG = SZ([
        i21,
        o21,
        c83,
        R83,
        w83,
        u83,
        f83,
        U_A,
        D33
    ])), (InG = SZ([
        xu,
        g20,
        s20,
        n20,
        w_A,
        nQA,
        m20,
        aQA,
        oC,
        N_A,
        s21,
        A91,
        vu
    ])));
    C9 = class C9 extends Error {
        constructor(A, Q, B){
            super(`MCP error ${A}: ${Q}`);
            ((this.code = A), (this.data = B), (this.name = "McpError"));
        }
        static fromError(A, Q, B) {
            if (A === w4.UrlElicitationRequired && B) {
                let G = B;
                if (G.elicitations) return new RxB(G.elicitations, Q);
            }
            return new C9(A, Q, B);
        }
    };
    RxB = class RxB extends C9 {
        constructor(A, Q = `URL elicitation${A.length > 1 ? "s" : ""} required`){
            super(w4.UrlElicitationRequired, Q, {
                elicitations: A
            });
        }
        get elicitations() {
            var A, Q;
            return (Q = (A = this.data) === null || A === void 0 ? void 0 : A.elicitations) !== null && Q !== void 0 ? Q : [];
        }
    };
});
function Za(A) {
    return A === "completed" || A === "failed" || A === "cancelled";
}
var w33;
