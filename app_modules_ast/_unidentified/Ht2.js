// Module: Ht2
// Type: L
// Lines: 463099-463120
//
var samplingCallback = L(()=>{
    bA();
    ow0 = l(React runtime(), 1);
});
function Dt2({ message: A, isTranscriptMode: Q }) {
    if (!(Q && A.type === "assistant" && A.message.model && A.message.content.some((G)=>G.type === "text"))) return null;
    return rw0.default.createElement(T, {
        marginTop: 1,
        marginLeft: 1,
        minWidth: A.message.model.length + 8
    }, rw0.default.createElement(C, {
        dimColor: !0
    }, A.message.model));
}
var rw0;
