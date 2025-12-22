// Module: eZ1
// Type: L
// Lines: 378514-378562
//
var eZ1 = L(()=>{
    ((Q$2 = Symbol("Let zodToJsonSchema decide on which parser to use")), (A$2 = {
        name: void 0,
        $refStrategy: "root",
        basePath: [
            "#"
        ],
        effectStrategy: "input",
        pipeStrategy: "all",
        dateStrategy: "format:date-time",
        mapStrategy: "entries",
        removeAdditionalStrategy: "passthrough",
        allowedAdditionalProperties: !0,
        rejectedAdditionalProperties: !1,
        definitionPath: "definitions",
        target: "jsonSchema7",
        strictUnions: !1,
        definitions: {},
        errorMessages: !1,
        markdownDescription: !1,
        patternStrategy: "escape",
        applyRegexFlags: !1,
        emailStrategy: "format:email",
        base64Strategy: "contentEncoding:base64",
        nameStrategy: "ref"
    }));
});
var G$2 = (A)=>{
    let Q = B$2(A), B = Q.name !== void 0 ? [
        ...Q.basePath,
        Q.definitionPath,
        Q.name
    ] : Q.basePath;
    return {
        ...Q,
        currentPath: B,
        propertyPath: void 0,
        seen: new Map(Object.entries(Q.definitions).map(([G, Z])=>[
                Z._def,
                {
                    def: Z._def,
                    path: [
                        ...Q.basePath,
                        Q.definitionPath,
                        G
                    ],
                    jsonSchema: void 0
                }
            ]))
    };
};
