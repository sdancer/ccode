// Module: ob2
// Type: U
// Lines: 435244-435258
//
var ob2 = U((ab2)=>{
    Object.defineProperty(ab2, "__esModule", {
        value: !0
    });
    function ky5(A, ...Q) {
        let B = new String(String.raw(A, ...Q));
        return ((B.__sentry_template_string__ = A.join("\x00").replace(/%/g, "%%").replace(/\0/g, "%s")), (B.__sentry_template_values__ = Q), B);
    }
    ab2.parameterize = ky5;
});
