// Module: hHB
// Type: L
// Lines: 200166-200201
//
var describeNativeComponentFrame = L(()=>{
    rpcCall();
    kHB = {
        off: 0,
        error: 200,
        warn: 300,
        info: 400,
        debug: 500
    };
    ((Ab8 = {
        error: fLA,
        warn: fLA,
        info: fLA,
        debug: fLA
    }), (fHB = new WeakMap()));
});
function Bb8(A) {
    return (typeof A === "object" && A !== null && (("name" in A && A.name === "AbortError") || ("message" in A && String(A.message).includes("FetchRequestCanceledException"))));
}
var uHB, sA1, mHB, bn1 = (A)=>new TextDecoder("utf-8").decode(A), gHB = (A)=>new TextEncoder().encode(A), Qb8 = ()=>{
    let A = new uHB.EventStreamMarshaller({
        utf8Encoder: bn1,
        utf8Decoder: gHB
    });
    return {
        base64Decoder: sA1.fromBase64,
        base64Encoder: sA1.toBase64,
        utf8Decoder: gHB,
        utf8Encoder: bn1,
        eventStreamMarshaller: A,
        streamCollector: mHB.streamCollector
    };
}, tA1;
