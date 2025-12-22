// Module: cbA
// Type: U
// Lines: 525831-525852
//
var cbA = U((KI7)=>{
    class yR0 extends Error {
        constructor(A, Q, B){
            super(B);
            (Error.captureStackTrace(this, this.constructor), (this.name = this.constructor.name), (this.code = Q), (this.exitCode = A), (this.nestedError = void 0));
        }
    }
    class gV9 extends yR0 {
        constructor(A){
            super(1, "commander.invalidArgument", A);
            (Error.captureStackTrace(this, this.constructor), (this.name = this.constructor.name));
        }
    }
    KI7.CommanderError = yR0;
    KI7.InvalidArgumentError = gV9;
});
