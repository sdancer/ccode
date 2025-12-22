// Module: FR0
// Type: L
// Lines: 521196-521246
//
var FR0 = L(()=>{
    v2();
    aK9();
    mN();
    ((LFA = f2.enum([
        "userSettings",
        "projectSettings",
        "localSettings",
        "session",
        "cliArg"
    ])), (iD1 = f2.discriminatedUnion("type", [
        f2.object({
            type: f2.literal("addRules"),
            rules: f2.array(lD1),
            behavior: f2.enum([
                "allow",
                "deny",
                "ask"
            ]),
            destination: LFA
        }),
        f2.object({
            type: f2.literal("replaceRules"),
            rules: f2.array(lD1),
            behavior: f2.enum([
                "allow",
                "deny",
                "ask"
            ]),
            destination: LFA
        }),
        f2.object({
            type: f2.literal("removeRules"),
            rules: f2.array(lD1),
            behavior: f2.enum([
                "allow",
                "deny",
                "ask"
            ]),
            destination: LFA
        }),
        f2.object({
            type: f2.literal("setMode"),
            mode: uZB,
            destination: LFA
        }),
        f2.object({
            type: f2.literal("addDirectories"),
            directories: f2.array(f2.string()),
            destination: LFA
        }),
        f2.object({
            type: f2.literal("removeDirectories"),
            directories: f2.array(f2.string()),
            destination: LFA
        })
    ])));
});
function oK9(A) {
    return !("async" in A && A.async === !0);
}
function OFA(A) {
    return "async" in A && A.async === !0;
}
var aJ7, oJ7, nD1;
