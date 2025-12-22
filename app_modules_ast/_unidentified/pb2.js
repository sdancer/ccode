// Module: pb2
// Type: U
// Lines: 435207-435221
//
var pushStartInstance = U((cb2)=>{
    Object.defineProperty(cb2, "__esModule", {
        value: !0
    });
    var db2 = FQ();
    function _y5(A, Q) {
        let B = {
            sent_at: new Date().toISOString()
        };
        if (Q) B.dsn = db2.dsnToString(Q);
        let G = A.map(jy5);
        return db2.createEnvelope(B, G);
    }
    function jy5(A) {
        return [
            {
                type: "span"
            },
            A
        ];
    }
    cb2.createSpanEnvelope = _y5;
});
