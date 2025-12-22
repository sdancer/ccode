// Module: uqB
// Type: L
// Lines: 225079-225097
//
var uqB = L(()=>{
    Is1();
});
function Ws1(A, Q) {
    let B, { abortSignal: G, abortErrorMsg: Z } = Q !== null && Q !== void 0 ? Q : {};
    return gqB((Y)=>{
        B = setTimeout(Y, A);
    }, {
        cleanupBeforeAbort: ()=>clearTimeout(B),
        abortSignal: G,
        abortErrorMsg: Z !== null && Z !== void 0 ? Z : ba8
    });
}
var ba8 = "The delay was aborted.";
