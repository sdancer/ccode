// Module: tJB
// Type: U
// Lines: 194226-194274
//
var tJB = U((rJB)=>{
    Object.defineProperty(rJB, "__esModule", {
        value: !0
    });
    rJB.toUtf8 = rJB.fromUtf8 = void 0;
    var ZT8 = (A)=>{
        let Q = [];
        for(let B = 0, G = A.length; B < G; B++){
            let Z = A.charCodeAt(B);
            if (Z < 128) Q.push(Z);
            else if (Z < 2048) Q.push((Z >> 6) | 192, (Z & 63) | 128);
            else if (B + 1 < A.length && (Z & 64512) === 55296 && (A.charCodeAt(B + 1) & 64512) === 56320) {
                let Y = 65536 + ((Z & 1023) << 10) + (A.charCodeAt(++B) & 1023);
                Q.push((Y >> 18) | 240, ((Y >> 12) & 63) | 128, ((Y >> 6) & 63) | 128, (Y & 63) | 128);
            } else Q.push((Z >> 12) | 224, ((Z >> 6) & 63) | 128, (Z & 63) | 128);
        }
        return Uint8Array.from(Q);
    };
    rJB.fromUtf8 = ZT8;
    var YT8 = (A)=>{
        let Q = "";
        for(let B = 0, G = A.length; B < G; B++){
            let Z = A[B];
            if (Z < 128) Q += String.fromCharCode(Z);
            else if (192 <= Z && Z < 224) {
                let Y = A[++B];
                Q += String.fromCharCode(((Z & 31) << 6) | (Y & 63));
            } else if (240 <= Z && Z < 365) {
                let J = "%" + [
                    Z,
                    A[++B],
                    A[++B],
                    A[++B]
                ].map((X)=>X.toString(16)).join("%");
                Q += decodeURIComponent(J);
            } else Q += String.fromCharCode(((Z & 15) << 12) | ((A[++B] & 63) << 6) | (A[++B] & 63));
        }
        return Q;
    };
    rJB.toUtf8 = YT8;
});
