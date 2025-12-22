// Module: bd0
// Type: U
// Lines: 15322-15366
//
var pushStartInstance = U((oR7, fd0)=>{
    var fc9 = qA("path"), vd0 = pushStartInstance(), kd0 = _d0(), bc9 = xd0(), hc9 = process.platform === "win32", gc9 = /\.(?:com|exe)$/i, uc9 = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
    function mc9(A) {
        A.file = vd0(A);
        let Q = A.file && bc9(A.file);
        if (Q) return (A.args.unshift(A.file), (A.command = Q), vd0(A));
        return A.file;
    }
    function dc9(A) {
        if (!hc9) return A;
        let Q = mc9(A), B = !gc9.test(Q);
        if (A.options.forceShell || B) {
            let G = uc9.test(Q);
            ((A.command = fc9.normalize(A.command)), (A.command = kd0.command(A.command)), (A.args = A.args.map((Y)=>kd0.argument(Y, G))));
            let Z = [
                A.command
            ].concat(A.args).join(" ");
            ((A.args = [
                "/d",
                "/s",
                "/c",
                `"${Z}"`
            ]), (A.command = process.env.comspec || "cmd.exe"), (A.options.windowsVerbatimArguments = !0));
        }
        return A;
    }
    function cc9(A, Q, B) {
        if (Q && !Array.isArray(Q)) ((B = Q), (Q = null));
        ((Q = Q ? Q.slice(0) : []), (B = Object.assign({}, B)));
        let G = {
            command: A,
            args: Q,
            options: B,
            file: void 0,
            original: {
                command: A,
                args: Q
            }
        };
        return B.shell ? G : dc9(G);
    }
    fd0.exports = cc9;
});
