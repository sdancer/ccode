// Module: uNB
// Type: L
// Lines: 226115-226138
//
var createRenderState = L(()=>{
    eg();
    J01();
    renderNode();
    ((ta8 = [
        "application/json",
        "text/json"
    ]), (ea8 = [
        "application/xml",
        "application/atom+xml"
    ]));
});
function mNB(A) {
    let Q = new Set();
    for(let B in A.responses){
        let G = A.responses[B];
        if (G.bodyMapper && G.bodyMapper.type.name === sg.Stream) Q.add(Number(B));
    }
    return Q;
}
function Rv(A) {
    let { parameterPath: Q, mapper: B } = A, G;
    if (typeof Q === "string") G = Q;
    else if (Array.isArray(Q)) G = Q.join(".");
    else G = B.serializedName;
    return G;
}
