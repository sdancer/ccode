// Module: mY0
// Type: U
// Lines: 341175-341191
//
var mY0 = U((V72)=>{
    Object.defineProperty(V72, "__esModule", {
        value: !0
    });
    V72.CIPHER_SUITES = void 0;
    V72.getDefaultRootsData = El3;
    var Fl3 = qA("fs");
    V72.CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES;
    var K72 = process.env.GRPC_DEFAULT_SSL_ROOTS_FILE_PATH, uY0 = null;
    function El3() {
        if (K72) {
            if (uY0 === null) uY0 = Fl3.readFileSync(K72);
            return uY0;
        }
        return null;
    }
});
