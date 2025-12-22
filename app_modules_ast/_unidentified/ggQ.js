// Module: ggQ
// Type: U
// Lines: 126792-126818
//
var renderElement = U((bgQ)=>{
    Object.defineProperty(bgQ, "__esModule", {
        value: !0
    });
    bgQ.DiagConsoleLogger = void 0;
    var eh1 = [
        {
            n: "error",
            c: "error"
        },
        {
            n: "warn",
            c: "warn"
        },
        {
            n: "info",
            c: "info"
        },
        {
            n: "debug",
            c: "debug"
        },
        {
            n: "verbose",
            c: "trace"
        }
    ];
    class fgQ {
        constructor(){
            function A(Q) {
                return function(...B) {
                    if (console) {
                        let G = console[Q];
                        if (typeof G !== "function") G = console.log;
                        if (typeof G === "function") return G.apply(console, B);
                    }
                };
            }
            for(let Q = 0; Q < eh1.length; Q++)this[eh1[Q].n] = A(eh1[Q].c);
        }
    }
    bgQ.DiagConsoleLogger = fgQ;
});
