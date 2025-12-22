// Module: RD0
// Type: L
// Lines: 396067-396122
//
var createRenderState = L(()=>{
    isPoint();
    restoreViewTransitionName();
    HS();
    pushStartInstance();
    s1();
    ((KX5 = new Set([
        "export",
        "declare",
        "typeset",
        "readonly",
        "local",
        "unset",
        "unsetenv"
    ])), (VX5 = new Set([
        "word",
        "string",
        "raw_string",
        "number"
    ])), (HX5 = new Set([
        "command_substitution",
        "process_substitution"
    ])), (LD0 = new Set([
        "command",
        "declaration_command"
    ])));
});
class bO2 {
    originalCommand;
    constructor(A){
        this.originalCommand = A;
    }
    toString() {
        return this.originalCommand;
    }
    getPipeSegments() {
        try {
            let A = _D0(this.originalCommand), Q = [], B = [];
            for (let G of A)if (G === "|") {
                if (B.length > 0) (Q.push(B.join(" ")), (B = []));
            } else B.push(G);
            if (B.length > 0) Q.push(B.join(" "));
            return Q.length > 0 ? Q : [
                this.originalCommand
            ];
        } catch  {
            return [
                this.originalCommand
            ];
        }
    }
    withoutOutputRedirections() {
        if (!this.originalCommand.includes(">")) return this.originalCommand;
        let { commandWithoutRedirections: A, redirections: Q } = DS(this.originalCommand);
        return Q.length > 0 ? A : this.originalCommand;
    }
    getOutputRedirections() {
        let { redirections: A } = DS(this.originalCommand);
        return A;
    }
}
var wX5, qJ1;
