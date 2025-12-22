// Module: nc0
// Type: L
// Lines: 16771-16974
//
var nc0 = L(()=>{
    ic0 = Yl9("execa").enabled;
});
import { Buffer as Il9 } from "node:buffer";
import Wl9 from "node:path";
import CU1 from "node:child_process";
import TuA from "node:process";
function Ze(A, Q, B) {
    let G = rc0(A, Q, B), Z = DU1(A, Q), Y = FU1(A, Q);
    (zU1(Y, G.options), Dc0(G.options));
    let J;
    try {
        J = CU1.spawn(G.file, G.args, G.options);
    } catch (D) {
        let F = new CU1.ChildProcess(), E = Promise.reject(rEA({
            error: D,
            stdout: "",
            stderr: "",
            all: "",
            command: Z,
            escapedCommand: Y,
            parsed: G,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
        }));
        return (HU1(F, E), F);
    }
    let X = uc0(J), I = Hc0(J, G.options, X), W = Fc0(J, G.options, I), K = {
        isCanceled: !1
    };
    ((J.kill = Kc0.bind(null, J.kill.bind(J))), (J.cancel = Vc0.bind(null, J, K)));
    let H = ad0(async ()=>{
        let [{ error: D, exitCode: F, signal: E, timedOut: z }, $, O, N] = await hc0(J, G.options, W), M = eEA(G.options, $), R = eEA(G.options, O), j = eEA(G.options, N);
        if (D || F !== 0 || E !== null) {
            let P = rEA({
                error: D,
                exitCode: F,
                signal: E,
                stdout: M,
                stderr: R,
                all: j,
                command: Z,
                escapedCommand: Y,
                parsed: G,
                timedOut: z,
                isCanceled: K.isCanceled || (G.options.signal ? G.options.signal.aborted : !1),
                killed: J.killed
            });
            if (!G.options.reject) return P;
            throw P;
        }
        return {
            command: Z,
            escapedCommand: Y,
            exitCode: 0,
            stdout: M,
            stderr: R,
            all: j,
            failed: !1,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
        };
    });
    return (fc0(J, G.options), (J.all = bc0(J, G.options)), zc0(J), HU1(J, H), J);
}
function U3A(A, Q, B) {
    let G = rc0(A, Q, B), Z = DU1(A, Q), Y = FU1(A, Q);
    zU1(Y, G.options);
    let J = kc0(G.options), X;
    try {
        X = CU1.spawnSync(G.file, G.args, {
            ...G.options,
            input: J
        });
    } catch (K) {
        throw rEA({
            error: K,
            stdout: "",
            stderr: "",
            all: "",
            command: Z,
            escapedCommand: Y,
            parsed: G,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
        });
    }
    let I = eEA(G.options, X.stdout, X.error), W = eEA(G.options, X.stderr, X.error);
    if (X.error || X.status !== 0 || X.signal !== null) {
        let K = rEA({
            stdout: I,
            stderr: W,
            error: X.error,
            signal: X.signal,
            exitCode: X.status,
            command: Z,
            escapedCommand: Y,
            parsed: G,
            timedOut: X.error && X.error.code === "ETIMEDOUT",
            isCanceled: !1,
            killed: X.signal !== null
        });
        if (!G.options.reject) return K;
        throw K;
    }
    return {
        command: Z,
        escapedCommand: Y,
        exitCode: 0,
        stdout: I,
        stderr: W,
        failed: !1,
        timedOut: !1,
        isCanceled: !1,
        killed: !1
    };
}
function sc0(A) {
    function Q(B, ...G) {
        if (!Array.isArray(B)) return sc0({
            ...A,
            ...B
        });
        let [Z, ...Y] = EU1(B, G);
        return Ze(Z, Y, ac0(A));
    }
    return ((Q.sync = (B, ...G)=>{
        if (!Array.isArray(B)) throw TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");
        let [Z, ...Y] = EU1(B, G);
        return U3A(Z, Y, ac0(A));
    }), Q);
}
var oc0, Kl9 = 1e8, Vl9 = ({ env: A, extendEnv: Q, preferLocal: B, localDir: G, execPath: Z })=>{
    let Y = Q ? {
        ...TuA.env,
        ...A
    } : A;
    if (B) return pd0({
        env: Y,
        cwd: G,
        execPath: Z
    });
    return Y;
}, rc0 = (A, Q, B = {})=>{
    let G = oc0.default._parse(A, Q, B);
    if (((A = G.command), (Q = G.args), (B = G.options), (B = {
        maxBuffer: Kl9,
        buffer: !0,
        stripFinalNewline: !0,
        extendEnv: !0,
        preferLocal: !1,
        localDir: B.cwd || TuA.cwd(),
        execPath: TuA.execPath,
        encoding: "utf8",
        reject: !0,
        cleanup: !0,
        all: !1,
        windowsHide: !0,
        verbose: ic0,
        ...B
    }), (B.env = Vl9(B)), (B.stdio = Zc0(B)), TuA.platform === "win32" && Wl9.basename(A, ".exe") === "cmd")) Q.unshift("/q");
    return {
        file: A,
        args: Q,
        options: B,
        parsed: G
    };
}, eEA = (A, Q, B)=>{
    if (typeof Q !== "string" && !Il9.isBuffer(Q)) return B === void 0 ? void 0 : "";
    if (A.stripFinalNewline) return i$1(Q);
    return Q;
}, Hl9 = ({ input: A, inputFile: Q, stdio: B })=>A === void 0 && Q === void 0 && B === void 0 ? {
        stdin: "inherit"
    } : {}, ac0 = (A = {})=>({
        preferLocal: !0,
        ...Hl9(A),
        ...A
    }), yj7;
