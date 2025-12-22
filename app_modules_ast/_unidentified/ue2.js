// Module: ue2
// Type: L
// Lines: 465660-465726
//
var trackUsedThenable = L(()=>{
    X2();
    bA();
    MDA();
    KB();
    ((JfA = l(React runtime(), 1)), (Vq0 = new Set()));
});
function WQ7(A) {
    if (!A) return JQ7;
    return `ansi:${A}`;
}
function KQ7(A, Q, B) {
    let G = A.split(`
`), Z = 0, Y = [];
    for (let J of G){
        let X = Math.max(1, Math.ceil(J.length / B));
        if (Z + X > Q) {
            let I = Q - Z;
            if (I > 0) {
                let W = I * B;
                Y.push(J.slice(0, W) + "...");
            }
            break;
        }
        (Y.push(J), (Z += X));
    }
    return Y.join(`
`);
}
function me2() {
    let { columns: A } = HB(), [{ inbox: Q }] = IQ(), B = Q.messages.filter((J)=>J.status === "pending");
    if (B.length === 0) return null;
    let G = B.slice(0, IQ7), Z = B.length - G.length, Y = Math.max(20, A - 4 - 2 - 4);
    return TS.createElement(T, {
        marginTop: 1,
        paddingLeft: 2,
        flexDirection: "column",
        width: A - 4
    }, TS.createElement(C, {
        dimColor: !0
    }, "Queued teammate ", B.length === 1 ? "message" : "messages", ":"), G.map((J, X)=>TS.createElement(C, {
            key: X,
            color: WQ7(J.color),
            wrap: "wrap"
        }, "● ", TS.createElement(C, {
            bold: !0
        }, J.from, ":"), " ", KQ7(ExA(J.text), XQ7, Y))), Z > 0 && TS.createElement(C, {
        dimColor: !0
    }, "(...", Z, " more)"));
}
var TS, JQ7 = "ansi:cyan", XQ7 = 3, IQ7 = 2;
