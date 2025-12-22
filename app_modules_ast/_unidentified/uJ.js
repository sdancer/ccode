// Module: uJ
// Type: L
// Lines: 60684-60731
//
var uJ = L(()=>{
    dzA = class dzA extends Error {
        constructor(A){
            super(A);
            this.name = this.constructor.name;
        }
    };
    uy = class uy extends Error {
    };
    RX = class RX extends Error {
        constructor(A){
            super(A);
            this.name = "AbortError";
        }
    };
    EU = class EU extends Error {
        filePath;
        defaultConfig;
        constructor(A, Q, B){
            super(A);
            ((this.name = "ConfigParseError"), (this.filePath = Q), (this.defaultConfig = B));
        }
    };
    my = class my extends Error {
        stdout;
        stderr;
        code;
        interrupted;
        constructor(A, Q, B, G){
            super("Shell command failed");
            this.stdout = A;
            this.stderr = Q;
            this.code = B;
            this.interrupted = G;
            this.name = "ShellError";
        }
    };
    CV = class CV extends Error {
        formattedMessage;
        constructor(A, Q){
            super(A);
            this.formattedMessage = Q;
            this.name = "TeleportOperationError";
        }
    };
});
