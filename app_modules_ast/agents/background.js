// Module: fI9
// Type: L
// Lines: 511729-512017
//
var createRenderState = L(()=>{
    bA();
    N9();
    X2();
    $N0();
    ZZ();
    $2();
    ((f0 = l(React runtime(), 1)), (vI9 = l(React runtime(), 1)));
});
import * as i$ from "fs";
import * as d_ from "path";
function DZ7(A) {
    let Q = d_.basename(A), B = d_.basename(d_.dirname(A));
    if (Q === "plugin.json") return "plugin";
    if (Q === "marketplace.json") return "marketplace";
    if (B === ".claude-plugin") return "plugin";
    return "unknown";
}
function bI9(A) {
    return A.errors.map((Q)=>({
            path: Q.path.join(".") || "root",
            message: Q.message,
            code: Q.code
        }));
}
function UbA(A, Q, B) {
    if (A.includes("..")) B.push({
        path: Q,
        message: `Path contains ".." which could be a path traversal attempt: ${A}`
    });
}
function RM0(A) {
    let Q = [], B = [], G = d_.resolve(A);
    if (!i$.existsSync(G)) return {
        success: !1,
        errors: [
            {
                path: "file",
                message: `File not found: ${G}`
            }
        ],
        warnings: [],
        filePath: G,
        fileType: "plugin"
    };
    if (!i$.statSync(G).isFile()) return {
        success: !1,
        errors: [
            {
                path: "file",
                message: `Path is not a file: ${G}`
            }
        ],
        warnings: [],
        filePath: G,
        fileType: "plugin"
    };
    let Y;
    try {
        Y = i$.readFileSync(G, {
            encoding: "utf-8"
        });
    } catch (I) {
        return {
            success: !1,
            errors: [
                {
                    path: "file",
                    message: `Failed to read file: ${I instanceof Error ? I.message : String(I)}`
                }
            ],
            warnings: [],
            filePath: G,
            fileType: "plugin"
        };
    }
    let J;
    try {
        J = JSON.parse(Y);
    } catch (I) {
        return {
            success: !1,
            errors: [
                {
                    path: "json",
                    message: `Invalid JSON syntax: ${I instanceof Error ? I.message : String(I)}`
                }
            ],
            warnings: [],
            filePath: G,
            fileType: "plugin"
        };
    }
    if (J && typeof J === "object") {
        let I = J;
        if (I.commands) (Array.isArray(I.commands) ? I.commands : [
            I.commands
        ]).forEach((K, V)=>{
            if (typeof K === "string") UbA(K, `commands[${V}]`, Q);
        });
        if (I.agents) (Array.isArray(I.agents) ? I.agents : [
            I.agents
        ]).forEach((K, V)=>{
            if (typeof K === "string") UbA(K, `agents[${V}]`, Q);
        });
        if (I.skills) (Array.isArray(I.skills) ? I.skills : [
            I.skills
        ]).forEach((K, V)=>{
            if (typeof K === "string") UbA(K, `skills[${V}]`, Q);
        });
    }
    let X = qBA.safeParse(J);
    if (!X.success) Q.push(...bI9(X.error));
    if (X.success) {
        let I = X.data;
        if (!I.version) B.push({
            path: "version",
            message: 'No version specified. Consider adding a version following semver (e.g., "1.0.0")'
        });
        if (!I.description) B.push({
            path: "description",
            message: "No description provided. Adding a description helps users understand what your plugin does"
        });
        if (!I.author) B.push({
            path: "author",
            message: "No author information provided. Consider adding author details for plugin attribution"
        });
    }
    return {
        success: Q.length === 0,
        errors: Q,
        warnings: B,
        filePath: G,
        fileType: "plugin"
    };
}
function _M0(A) {
    let Q = [], B = [], G = d_.resolve(A);
    if (!i$.existsSync(G)) return {
        success: !1,
        errors: [
            {
                path: "file",
                message: `File not found: ${G}`
            }
        ],
        warnings: [],
        filePath: G,
        fileType: "marketplace"
    };
    if (!i$.statSync(G).isFile()) return {
        success: !1,
        errors: [
            {
                path: "file",
                message: `Path is not a file: ${G}`
            }
        ],
        warnings: [],
        filePath: G,
        fileType: "marketplace"
    };
    let Y;
    try {
        Y = i$.readFileSync(G, {
            encoding: "utf-8"
        });
    } catch (I) {
        return {
            success: !1,
            errors: [
                {
                    path: "file",
                    message: `Failed to read file: ${I instanceof Error ? I.message : String(I)}`
                }
            ],
            warnings: [],
            filePath: G,
            fileType: "marketplace"
        };
    }
    let J;
    try {
        J = JSON.parse(Y);
    } catch (I) {
        return {
            success: !1,
            errors: [
                {
                    path: "json",
                    message: `Invalid JSON syntax: ${I instanceof Error ? I.message : String(I)}`
                }
            ],
            warnings: [],
            filePath: G,
            fileType: "marketplace"
        };
    }
    if (J && typeof J === "object") {
        let I = J;
        if (Array.isArray(I.plugins)) I.plugins.forEach((W, K)=>{
            if (W && typeof W === "object" && "source" in W) {
                let V = W.source;
                if (typeof V === "string") UbA(V, `plugins[${K}].source`, Q);
                if (V && typeof V === "object" && "path" in V && typeof V.path === "string") UbA(V.path, `plugins[${K}].source.path`, Q);
            }
        });
    }
    let X = dIA.safeParse(J);
    if (!X.success) Q.push(...bI9(X.error));
    if (X.success) {
        let I = X.data;
        if (!I.plugins || I.plugins.length === 0) B.push({
            path: "plugins",
            message: "Marketplace has no plugins defined"
        });
        if (I.plugins) I.plugins.forEach((W, K)=>{
            if (typeof W.source === "object" && W.source.source === "npm") B.push({
                path: `plugins[${K}].source`,
                message: `Plugin "${W.name}" uses npm source which is not yet fully implemented`
            });
            if (I.plugins.filter((H)=>H.name === W.name).length > 1) Q.push({
                path: `plugins[${K}].name`,
                message: `Duplicate plugin name "${W.name}" found in marketplace`
            });
        });
        if (!I.metadata?.description) B.push({
            path: "metadata.description",
            message: "No marketplace description provided. Adding a description helps users understand what this marketplace offers"
        });
    }
    return {
        success: Q.length === 0,
        errors: Q,
        warnings: B,
        filePath: G,
        fileType: "marketplace"
    };
}
function jD1(A) {
    let Q = d_.resolve(A);
    if (i$.existsSync(Q) && i$.statSync(Q).isDirectory()) {
        let G = d_.join(Q, ".claude-plugin", "marketplace.json"), Z = d_.join(Q, ".claude-plugin", "plugin.json");
        if (i$.existsSync(G)) return _M0(G);
        else if (i$.existsSync(Z)) return RM0(Z);
        else return {
            success: !1,
            errors: [
                {
                    path: "directory",
                    message: "No manifest found in directory. Expected .claude-plugin/marketplace.json or .claude-plugin/plugin.json"
                }
            ],
            warnings: [],
            filePath: Q,
            fileType: "plugin"
        };
    }
    switch(DZ7(A)){
        case "plugin":
            return RM0(A);
        case "marketplace":
            return _M0(A);
        case "unknown":
            {
                if (!i$.existsSync(Q)) return {
                    success: !1,
                    errors: [
                        {
                            path: "file",
                            message: `File not found: ${Q}`
                        }
                    ],
                    warnings: [],
                    filePath: Q,
                    fileType: "plugin"
                };
                try {
                    let G = i$.readFileSync(Q, {
                        encoding: "utf-8"
                    }), Z = JSON.parse(G);
                    if (Array.isArray(Z.plugins)) return _M0(A);
                } catch  {}
                return RM0(A);
            }
    }
}
