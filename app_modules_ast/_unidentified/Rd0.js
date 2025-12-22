// Module: Rd0
// Type: U
// Lines: 15242-15273
//
var pushStartInstance = U((lR7, Md0)=>{
    var Ld0 = qA("path"), Mc9 = renderElement(), Rc9 = Nd0();
    function Od0(A, Q) {
        let B = A.options.env || process.env, G = process.cwd(), Z = A.options.cwd != null, Y = Z && process.chdir !== void 0 && !process.chdir.disabled;
        if (Y) try {
            process.chdir(A.options.cwd);
        } catch (X) {}
        let J;
        try {
            J = Mc9.sync(A.command, {
                path: B[Rc9({
                    env: B
                })],
                pathExt: Q ? Ld0.delimiter : void 0
            });
        } catch (X) {} finally{
            if (Y) process.chdir(G);
        }
        if (J) J = Ld0.resolve(Z ? A.options.cwd : "", J);
        return J;
    }
    function _c9(A) {
        return Od0(A) || Od0(A, !0);
    }
    Md0.exports = _c9;
});
