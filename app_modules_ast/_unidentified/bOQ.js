// Module: bOQ
// Type: U
// Lines: 106286-106329
//
var renderElement = U((Oj6)=>{
    var wj6 = escapeTextForBrowser(), qj6 = qA("stream");
    async function* Nj6(A) {
        let Q = !1, B = !1, G = [];
        (A.on("error", (Z)=>{
            if (!Q) Q = !0;
            if (Z) throw Z;
        }), A.on("data", (Z)=>{
            G.push(Z);
        }), A.on("end", ()=>{
            Q = !0;
        }));
        while(!B){
            let Z = await new Promise((Y)=>setTimeout(()=>Y(G.shift()), 0));
            if (Z) yield Z;
            B = Q && G.length === 0;
        }
    }
    class Bk1 {
        universalMarshaller;
        constructor({ utf8Encoder: A, utf8Decoder: Q }){
            this.universalMarshaller = new wj6.EventStreamMarshaller({
                utf8Decoder: Q,
                utf8Encoder: A
            });
        }
        deserialize(A, Q) {
            let B = typeof A[Symbol.asyncIterator] === "function" ? A : Nj6(A);
            return this.universalMarshaller.deserialize(B, Q);
        }
        serialize(A, Q) {
            return qj6.Readable.from(this.universalMarshaller.serialize(A, Q));
        }
    }
    var Lj6 = (A)=>new Bk1(A);
    Oj6.EventStreamMarshaller = Bk1;
    Oj6.eventStreamSerdeProvider = Lj6;
});
