// Module: sLQ
// Type: U
// Lines: 104756-104775
//
var createRenderState = U((BR6)=>{
    var xv1 = rLQ();
    function QR6(A) {
        let Q = [];
        for (let B of Object.keys(A).sort()){
            let G = A[B];
            if (((B = xv1.escapeUri(B)), Array.isArray(G))) for(let Z = 0, Y = G.length; Z < Y; Z++)Q.push(`${B}=${xv1.escapeUri(G[Z])}`);
            else {
                let Z = B;
                if (G || typeof G === "string") Z += `=${xv1.escapeUri(G)}`;
                Q.push(Z);
            }
        }
        return Q.join("&");
    }
    BR6.buildQueryString = QR6;
});
