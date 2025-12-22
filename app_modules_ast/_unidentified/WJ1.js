// Module: WJ1
// Type: L
// Lines: 390381-390438
//
var WJ1 = L(()=>{
    EyA();
    n2();
    i0();
    getViewTransitionClassName();
    WD0 = l(React runtime(), 1);
    IJ5 = Y0(()=>process.stdin.on("data", NEA));
});
function VJ1({ file_path: A, edits: Q }) {
    let { columns: B } = HB(), G = KJ1.useMemo(()=>(vA().existsSync(A) ? WF(A) : ""), [
        A
    ]), Z = KJ1.useMemo(()=>Q.map((X)=>{
            let I = z2A(G, X.old_string) || X.old_string;
            return {
                ...X,
                old_string: I
            };
        }), [
        G,
        Q
    ]), Y = KJ1.useMemo(()=>QL({
            filePath: A,
            fileContents: G,
            edits: Z
        }), [
        A,
        G,
        Z
    ]), J = G.split(`
`)[0] ?? null;
    return Qd.createElement(T, {
        flexDirection: "column"
    }, Qd.createElement(T, {
        borderDimColor: !0,
        borderColor: "subtle",
        borderStyle: "dashed",
        flexDirection: "column",
        borderLeft: !1,
        borderRight: !1
    }, HL(Y.map((X)=>Qd.createElement(DL, {
            key: X.newStart,
            patch: X,
            dim: !1,
            filePath: A,
            firstLine: J,
            width: B
        })), (X)=>Qd.createElement(C, {
            dimColor: !0,
            key: `ellipsis-${X}`
        }, "..."))));
}
var Qd, KJ1;
