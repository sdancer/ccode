// Module: nrB
// Type: L
// Lines: 298358-298446
//
var createRenderState = L(()=>{
    v2();
    ((irB = gN({
        command: cQ(),
        args: HI(cQ()).optional(),
        env: wT(cQ(), cQ()).optional()
    })), (U_3 = gN({
        name: cQ(),
        email: cQ().email().optional(),
        url: cQ().url().optional()
    })), (w_3 = gN({
        type: cQ(),
        url: cQ().url()
    })), (q_3 = irB.partial()), (N_3 = irB.extend({
        platform_overrides: wT(cQ(), q_3).optional()
    })), (L_3 = gN({
        type: qT([
            "python",
            "node",
            "binary"
        ]),
        entry_point: cQ(),
        mcp_config: N_3
    })), (O_3 = gN({
        claude_desktop: cQ().optional(),
        platforms: HI(qT([
            "darwin",
            "win32",
            "linux"
        ])).optional(),
        runtimes: gN({
            python: cQ().optional(),
            node: cQ().optional()
        }).optional()
    }).passthrough()), (M_3 = gN({
        name: cQ(),
        description: cQ().optional()
    })), (R_3 = gN({
        name: cQ(),
        description: cQ().optional(),
        arguments: HI(cQ()).optional(),
        text: cQ()
    })), (__3 = gN({
        type: qT([
            "string",
            "number",
            "boolean",
            "directory",
            "file"
        ]),
        title: cQ(),
        description: cQ(),
        required: kH().optional(),
        default: s1A([
            cQ(),
            iM(),
            kH(),
            HI(cQ())
        ]).optional(),
        multiple: kH().optional(),
        sensitive: kH().optional(),
        min: iM().optional(),
        max: iM().optional()
    })), (f4Z = wT(cQ(), s1A([
        cQ(),
        iM(),
        kH(),
        HI(cQ())
    ]))), (j_3 = gN({
        $schema: cQ().optional(),
        dxt_version: cQ().optional().describe("@deprecated Use manifest_version instead"),
        manifest_version: cQ().optional(),
        name: cQ(),
        display_name: cQ().optional(),
        version: cQ(),
        description: cQ(),
        long_description: cQ().optional(),
        author: U_3,
        repository: w_3.optional(),
        homepage: cQ().url().optional(),
        documentation: cQ().url().optional(),
        support: cQ().url().optional(),
        icon: cQ().optional(),
        screenshots: HI(cQ()).optional(),
        server: L_3,
        tools: HI(M_3).optional(),
        tools_generated: kH().optional(),
        prompts: HI(R_3).optional(),
        prompts_generated: kH().optional(),
        keywords: HI(cQ()).optional(),
        license: cQ().optional(),
        compatibility: O_3.optional(),
        user_config: wT(cQ(), __3).optional()
    }).refine((A)=>!!(A.dxt_version || A.manifest_version), {
        message: "Either 'dxt_version' (deprecated) or 'manifest_version' must be provided"
    })), (b4Z = gN({
        status: qT([
            "signed",
            "unsigned",
            "self-signed"
        ]),
        publisher: cQ().optional(),
        issuer: cQ().optional(),
        valid_from: cQ().optional(),
        valid_to: cQ().optional(),
        fingerprint: cQ().optional()
    })));
});
var T_3, P_3;
