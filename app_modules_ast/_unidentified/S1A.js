// Module: S1A
// Type: L
// Lines: 170735-170779
//
var S1A = L(()=>{
    aQ();
    z4();
});
import { Stream as R$8 } from "node:stream";
var _$8 = (A, Q)=>{
    let B = T$8(Q), G = {
        stdout: process.stdout,
        stdin: process.stdin,
        stderr: process.stderr,
        debug: !1,
        exitOnCtrlC: !0,
        patchConsole: !0,
        ...B,
        theme: B.theme ?? v1().theme,
        ink2: B.ink2 ?? nE()
    }, Z = P$8(G.stdout, ()=>new ysA(G));
    return (Z.render(A), {
        rerender: Z.render,
        unmount () {
            Z.unmount();
        },
        waitUntilExit: Z.waitUntilExit,
        cleanup: ()=>IT.delete(G.stdout)
    });
}, j$8 = async (A, Q)=>{
    return (await w2B(), _$8(A, Q));
}, p3, T$8 = (A = {})=>{
    if (A instanceof R$8) return {
        stdout: A,
        stdin: process.stdin
    };
    return A;
}, P$8 = (A, Q)=>{
    let B = IT.get(A);
    if (!B) ((B = Q()), IT.set(A, B));
    return B;
};
