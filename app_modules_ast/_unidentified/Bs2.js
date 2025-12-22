// Module: Bs2
// Type: L
// Lines: 454745-454763
//
var Bs2 = L(()=>{
    bA();
    Z6();
    samplingCallback();
    As2();
    sL = l(React runtime(), 1);
});
function Gs2({ addMargin: A, param: { text: Q }, thinkingMetadata: B }) {
    let { columns: G } = HB();
    if (!Q) return (t(Error("No content found in user prompt message")), null);
    let Z = Q.trim();
    return vw0.default.createElement(T, {
        flexDirection: "column",
        marginTop: A ? 1 : 0,
        width: G - 4
    }, vw0.default.createElement(Qs2, {
        text: Z,
        thinkingMetadata: B
    }));
}
var vw0;
