// Module: lc1
// Type: L
// Lines: 173291-173356
//
var lc1 = L(()=>{
    trackPostpone();
    LZA();
    ((pc1 = new Intl.Segmenter(void 0, {
        granularity: "grapheme"
    })), (MU8 = new Intl.Segmenter(void 0, {
        granularity: "word"
    })));
});
var L8B = {};
M5(L8B, {
    sharp: ()=>N8B,
    default: ()=>RU8
});
function N8B(A) {
    let Q = null, B = [];
    async function G() {
        if (!Q) Q = (async ()=>{
            if (!asA) throw Error("Native image processor module not available");
            let { processImage: Y } = asA, J = await Y(A);
            for (let X of B)X(J);
            return J;
        })();
        return Q;
    }
    let Z = {
        async metadata () {
            return (await G()).metadata();
        },
        resize (Y, J, X) {
            return (B.push((I)=>{
                I.resize(Y, J, X);
            }), Z);
        },
        jpeg (Y) {
            return (B.push((J)=>{
                J.jpeg(Y?.quality);
            }), Z);
        },
        png (Y) {
            return (B.push((J)=>{
                J.png(Y);
            }), Z);
        },
        webp (Y) {
            return (B.push((J)=>{
                J.webp(Y?.quality);
            }), Z);
        },
        async toBuffer () {
            return (await G()).toBuffer();
        }
    };
    return Z;
}
var asA, RU8;
