// Module: SzB
// Type: U
// Lines: 216965-217017
//
var renderElement = U((TzB)=>{
    Object.defineProperty(TzB, "__esModule", {
        value: !0
    });
    TzB.Colours = void 0;
    class H3 {
        static isEnabled(A) {
            return (A.isTTY && (typeof A.getColorDepth === "function" ? A.getColorDepth() > 2 : !0));
        }
        static refresh() {
            if (((H3.enabled = H3.isEnabled(process.stderr)), !this.enabled)) ((H3.reset = ""), (H3.bright = ""), (H3.dim = ""), (H3.red = ""), (H3.green = ""), (H3.yellow = ""), (H3.blue = ""), (H3.magenta = ""), (H3.cyan = ""), (H3.white = ""), (H3.grey = ""));
            else ((H3.reset = "\x1B[0m"), (H3.bright = "\x1B[1m"), (H3.dim = "\x1B[2m"), (H3.red = "\x1B[31m"), (H3.green = "\x1B[32m"), (H3.yellow = "\x1B[33m"), (H3.blue = "\x1B[34m"), (H3.magenta = "\x1B[35m"), (H3.cyan = "\x1B[36m"), (H3.white = "\x1B[37m"), (H3.grey = "\x1B[90m"));
        }
    }
    TzB.Colours = H3;
    H3.enabled = !1;
    H3.reset = "";
    H3.bright = "";
    H3.dim = "";
    H3.red = "";
    H3.green = "";
    H3.yellow = "";
    H3.blue = "";
    H3.magenta = "";
    H3.cyan = "";
    H3.white = "";
    H3.grey = "";
    H3.refresh();
});
