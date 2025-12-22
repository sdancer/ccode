// Module: ud0
// Type: U
// Lines: 15366-15403
//
var rpcCallback = U((rR7, gd0)=>{
    var m$1 = process.platform === "win32";
    function d$1(A, Q) {
        return Object.assign(Error(`${Q} ${A.command} ENOENT`), {
            code: "ENOENT",
            errno: "ENOENT",
            syscall: `${Q} ${A.command}`,
            path: A.command,
            spawnargs: A.args
        });
    }
    function pc9(A, Q) {
        if (!m$1) return;
        let B = A.emit;
        A.emit = function(G, Z) {
            if (G === "exit") {
                let Y = hd0(Z, Q);
                if (Y) return B.call(A, "error", Y);
            }
            return B.apply(A, arguments);
        };
    }
    function hd0(A, Q) {
        if (m$1 && A === 1 && !Q.file) return d$1(Q.original, "spawn");
        return null;
    }
    function lc9(A, Q) {
        if (m$1 && A === 1 && !Q.file) return d$1(Q.original, "spawnSync");
        return null;
    }
    gd0.exports = {
        hookChildProcess: pc9,
        verifyENOENT: hd0,
        verifyENOENTSync: lc9,
        notFoundError: d$1
    };
});
