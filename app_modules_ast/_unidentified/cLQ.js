// Module: cLQ
// Type: U
// Lines: 104552-104571
//
var createRenderState = U((PM6)=>{
    var Pv1 = dLQ();
    function TM6(A) {
        let Q = [];
        for (let B of Object.keys(A).sort()){
            let G = A[B];
            if (((B = Pv1.escapeUri(B)), Array.isArray(G))) for(let Z = 0, Y = G.length; Z < Y; Z++)Q.push(`${B}=${Pv1.escapeUri(G[Z])}`);
            else {
                let Z = B;
                if (G || typeof G === "string") Z += `=${Pv1.escapeUri(G)}`;
                Q.push(Z);
            }
        }
        return Q.join("&");
    }
    PM6.buildQueryString = TM6;
});
