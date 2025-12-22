// Module: sjA
// Type: L
// Lines: 280429-280517
//
var createRenderState = L(()=>{
    v2();
    ((mlB = uN({
        command: cQ(),
        args: HI(cQ()).optional(),
        env: wT(cQ(), cQ()).optional()
    })), (Dw3 = uN({
        name: cQ(),
        email: cQ().email().optional(),
        url: cQ().url().optional()
    })), (Fw3 = uN({
        type: cQ(),
        url: cQ().url()
    })), (Ew3 = mlB.partial()), (zw3 = mlB.extend({
        platform_overrides: wT(cQ(), Ew3).optional()
    })), (Cw3 = uN({
        type: qT([
            "python",
            "node",
            "binary"
        ]),
        entry_point: cQ(),
        mcp_config: zw3
    })), ($w3 = uN({
        claude_desktop: cQ().optional(),
        platforms: HI(qT([
            "darwin",
            "win32",
            "linux"
        ])).optional(),
        runtimes: uN({
            python: cQ().optional(),
            node: cQ().optional()
        }).optional()
    }).passthrough()), (Uw3 = uN({
        name: cQ(),
        description: cQ().optional()
    })), (ww3 = uN({
        name: cQ(),
        description: cQ().optional(),
        arguments: HI(cQ()).optional(),
        text: cQ()
    })), (qw3 = uN({
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
    })), (l2Z = wT(cQ(), s1A([
        cQ(),
        iM(),
        kH(),
        HI(cQ())
    ]))), (l61 = uN({
        $schema: cQ().optional(),
        dxt_version: cQ().optional().describe("@deprecated Use manifest_version instead"),
        manifest_version: cQ().optional(),
        name: cQ(),
        display_name: cQ().optional(),
        version: cQ(),
        description: cQ(),
        long_description: cQ().optional(),
        author: Dw3,
        repository: Fw3.optional(),
        homepage: cQ().url().optional(),
        documentation: cQ().url().optional(),
        support: cQ().url().optional(),
        icon: cQ().optional(),
        screenshots: HI(cQ()).optional(),
        server: Cw3,
        tools: HI(Uw3).optional(),
        tools_generated: kH().optional(),
        prompts: HI(ww3).optional(),
        prompts_generated: kH().optional(),
        keywords: HI(cQ()).optional(),
        license: cQ().optional(),
        privacy_policies: HI(cQ()).optional(),
        compatibility: $w3.optional(),
        user_config: wT(cQ(), qw3).optional()
    }).refine((A)=>!!(A.dxt_version || A.manifest_version), {
        message: "Either 'dxt_version' (deprecated) or 'manifest_version' must be provided"
    })), (i2Z = uN({
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
