// Module: CqB
// Type: L
// Lines: 224668-224726
//
var renderElement = L(()=>{
    createRenderState();
    ((FqB = l(createRenderState(), 1)), (EqB = l(createRenderState(), 1)), (VqB = []), (Da8 = new Map()));
});
function Qs1(A) {
    return {
        name: "agentPolicy",
        sendRequest: async (Q, B)=>{
            if (!Q.agent) Q.agent = A;
            return B(Q);
        }
    };
}
function Bs1(A) {
    return {
        name: "tlsPolicy",
        sendRequest: async (Q, B)=>{
            if (!Q.tlsSettings) Q.tlsSettings = A;
            return B(Q);
        }
    };
}
function D01(A) {
    return typeof A.stream === "function";
}
var $qB, fLG, bLG, hLG, gLG, uLG, mLG, dLG, cLG, pLG, lLG, iLG, nLG, aLG, oLG, rLG, sLG, tLG, eLG, AOG, R0A, Gs1, QOG, UqB, BOG, GOG, ZOG, YOG, JOG, XOG, IOG, WOG, KOG;
