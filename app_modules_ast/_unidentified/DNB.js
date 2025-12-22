// Module: DNB
// Type: L
// Lines: 225239-225275
//
var DNB = L(()=>{
    ((HNB = l(VNB(), 1)), (N01 = HNB.state));
});
function ha8() {
    return {
        end: ()=>{},
        isRecording: ()=>!1,
        recordException: ()=>{},
        setAttribute: ()=>{},
        setStatus: ()=>{},
        addEvent: ()=>{}
    };
}
function ga8() {
    return {
        createRequestHeaders: ()=>{
            return {};
        },
        parseTraceparentHeader: ()=>{
            return;
        },
        startSpan: (A, Q)=>{
            return {
                span: ha8(),
                tracingContext: INB({
                    parentContext: Q.tracingContext
                })
            };
        },
        withContext (A, Q, ...B) {
            return Q(...B);
        }
    };
}
function wOA() {
    if (!N01.instrumenterImplementation) N01.instrumenterImplementation = ga8();
    return N01.instrumenterImplementation;
}
