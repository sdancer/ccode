// Module: Uy2
// Type: L
// Lines: 425990-426087
//
var pushStartInstance = L(()=>{
    bA();
    $2();
    N9();
    WJ1();
    P3();
    createRenderState();
    createRenderState();
    Z6();
    j9 = l(React runtime(), 1);
});
import { homedir as nX1 } from "os";
import { join as aX1 } from "path";
function oX1() {
    return process.env.XDG_STATE_HOME ?? aX1(nX1(), ".local", "state");
}
function wy2() {
    return process.env.XDG_CACHE_HOME ?? aX1(nX1(), ".cache");
}
function qy2() {
    return process.env.XDG_DATA_HOME ?? aX1(nX1(), ".local", "share");
}
function Ny2() {
    return aX1(nX1(), ".local", "bin");
}
var Bz0 = ()=>{};
import { homedir as rX1 } from "os";
import { join as Gz0 } from "path";
function ar() {
    let A = process.env.ZDOTDIR || rX1();
    return {
        zsh: Gz0(A, ".zshrc"),
        bash: Gz0(rX1(), ".bashrc"),
        fish: Gz0(rX1(), ".config/fish/config.fish")
    };
}
function sX1(A) {
    let Q = !1;
    return {
        filtered: A.filter((G)=>{
            if (Ly2.test(G)) {
                let Z = G.match(/alias\s+claude\s*=\s*["']([^"']+)["']/);
                if (!Z) Z = G.match(/alias\s+claude\s*=\s*([^#\n]+)/);
                if (Z && Z[1]) {
                    if (Z[1].trim() === KbQ) return ((Q = !0), !1);
                }
            }
            return !0;
        }),
        hadAlias: Q
    };
}
function WvA(A) {
    let Q = vA();
    try {
        if (!Q.existsSync(A)) return null;
        return Q.readFileSync(A, {
            encoding: "utf8"
        }).split(`
`);
    } catch  {
        return null;
    }
}
function tX1(A, Q) {
    vA().writeFileSync(A, Q.join(`
`), {
        encoding: "utf8",
        flush: !0
    });
}
function Zz0() {
    let A = ar();
    for (let Q of Object.values(A)){
        let B = WvA(Q);
        if (!B) continue;
        for (let G of B)if (Ly2.test(G)) {
            let Z = G.match(/alias\s+claude=["']?([^"'\s]+)/);
            if (Z && Z[1]) return Z[1];
        }
    }
    return null;
}
function Oy2() {
    let A = Zz0();
    if (!A) return null;
    let Q = vA(), B = A.startsWith("~") ? A.replace("~", rX1()) : A;
    try {
        if (Q.existsSync(B)) {
            let G = Q.statSync(B);
            if (G.isFile() || G.isSymbolicLink()) return A;
        }
    } catch  {}
    return null;
}
var Ly2;
