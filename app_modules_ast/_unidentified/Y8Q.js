// Module: Y8Q
// Type: U
// Lines: 66354-66373
//
var createRenderState = U((bG4)=>{
    var pL1 = Z8Q();
    function fG4(A) {
        let Q = [];
        for (let B of Object.keys(A).sort()){
            let G = A[B];
            if (((B = pL1.escapeUri(B)), Array.isArray(G))) for(let Z = 0, Y = G.length; Z < Y; Z++)Q.push(`${B}=${pL1.escapeUri(G[Z])}`);
            else {
                let Z = B;
                if (G || typeof G === "string") Z += `=${pL1.escapeUri(G)}`;
                Q.push(Z);
            }
        }
        return Q.join("&");
    }
    bG4.buildQueryString = fG4;
});
