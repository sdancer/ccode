// Module: COQ
// Type: U
// Lines: 105326-105331
//
var COQ = U((tR6)=>{
    var sR6 = (A)=>Object.assign(A, {
            eventStreamMarshaller: A.eventStreamSerdeProvider(A)
        });
    tR6.resolveEventStreamSerdeConfig = sR6;
});
