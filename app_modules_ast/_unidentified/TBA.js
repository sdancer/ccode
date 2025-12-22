// Module: TBA
// Type: U
// Lines: 281387-281475
//
var renderElement = U((J30)=>{
    var CiB = renderElement().fromCallback, jw = renderElement(), Vq3 = [
        "access",
        "appendFile",
        "chmod",
        "chown",
        "close",
        "copyFile",
        "fchmod",
        "fchown",
        "fdatasync",
        "fstat",
        "fsync",
        "ftruncate",
        "futimes",
        "lchmod",
        "lchown",
        "link",
        "lstat",
        "mkdir",
        "mkdtemp",
        "open",
        "opendir",
        "readdir",
        "readFile",
        "readlink",
        "realpath",
        "rename",
        "rm",
        "rmdir",
        "stat",
        "symlink",
        "truncate",
        "unlink",
        "utimes",
        "writeFile"
    ].filter((A)=>{
        return typeof jw[A] === "function";
    });
    Object.assign(J30, jw);
    Vq3.forEach((A)=>{
        J30[A] = CiB(jw[A]);
    });
    J30.exists = function(A, Q) {
        if (typeof Q === "function") return jw.exists(A, Q);
        return new Promise((B)=>{
            return jw.exists(A, B);
        });
    };
    J30.read = function(A, Q, B, G, Z, Y) {
        if (typeof Y === "function") return jw.read(A, Q, B, G, Z, Y);
        return new Promise((J, X)=>{
            jw.read(A, Q, B, G, Z, (I, W, K)=>{
                if (I) return X(I);
                J({
                    bytesRead: W,
                    buffer: K
                });
            });
        });
    };
    J30.write = function(A, Q, ...B) {
        if (typeof B[B.length - 1] === "function") return jw.write(A, Q, ...B);
        return new Promise((G, Z)=>{
            jw.write(A, Q, ...B, (Y, J, X)=>{
                if (Y) return Z(Y);
                G({
                    bytesWritten: J,
                    buffer: X
                });
            });
        });
    };
    if (typeof jw.writev === "function") J30.writev = function(A, Q, ...B) {
        if (typeof B[B.length - 1] === "function") return jw.writev(A, Q, ...B);
        return new Promise((G, Z)=>{
            jw.writev(A, Q, ...B, (Y, J, X)=>{
                if (Y) return Z(Y);
                G({
                    bytesWritten: J,
                    buffers: X
                });
            });
        });
    };
    if (typeof jw.realpath.native === "function") J30.realpath.native = CiB(jw.realpath.native);
    else process.emitWarning("fs.realpath.native is not a function. Is fs being monkey-patched?", "Warning", "fs-extra-WARN0003");
});
