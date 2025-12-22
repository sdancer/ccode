// Module: iqB
// Type: L
// Lines: 225137-225154
//
var iqB = L(()=>{
    pqB = Symbol("rawContent");
});
function nqB() {
    let A = Ys1();
    return {
        name: Vs1,
        sendRequest: async (Q, B)=>{
            if (Q.multipartBody) {
                for (let G of Q.multipartBody.parts)if (Ks1(G.body)) G.body = lqB(G.body);
            }
            return A.sendRequest(Q, B);
        }
    };
}
var Vs1;
