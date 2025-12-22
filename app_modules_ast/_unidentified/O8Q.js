// Module: O8Q
// Type: U
// Lines: 67253-67272
//
var createRenderState = U((TZ4)=>{
    var eL1 = L8Q();
    function jZ4(A) {
        let Q = [];
        for (let B of Object.keys(A).sort()){
            let G = A[B];
            if (((B = eL1.escapeUri(B)), Array.isArray(G))) for(let Z = 0, Y = G.length; Z < Y; Z++)Q.push(`${B}=${eL1.escapeUri(G[Z])}`);
            else {
                let Z = B;
                if (G || typeof G === "string") Z += `=${eL1.escapeUri(G)}`;
                Q.push(Z);
            }
        }
        return Q.join("&");
    }
    TZ4.buildQueryString = jZ4;
});
