// Module: f5Q
// Type: U
// Lines: 71388-71403
//
var f5Q = U((TW4)=>{
    function jW4(A) {
        let Q = {};
        if (((A = A.replace(/^\?/, "")), A)) for (let B of A.split("&")){
            let [G, Z = null] = B.split("=");
            if (((G = decodeURIComponent(G)), Z)) Z = decodeURIComponent(Z);
            if (!(G in Q)) Q[G] = Z;
            else if (Array.isArray(Q[G])) Q[G].push(Z);
            else Q[G] = [
                Q[G],
                Z
            ];
        }
        return Q;
    }
    TW4.parseQueryString = jW4;
});
