// Module: EY9
// Type: U
// Lines: 499662-499688
//
var EY9 = U((O0J, FY9)=>{
    var HY9 = !0, DY9 = qA("zlib");
    if (!DY9.deflateSync) HY9 = !1;
    var h57 = IFA(), g57 = performWork();
    FY9.exports = function(A, Q) {
        if (!HY9) throw Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
        let G = new g57(Q || {}), Z = [];
        if ((Z.push(Buffer.from(h57.PNG_SIGNATURE)), Z.push(G.packIHDR(A.width, A.height)), A.gamma)) Z.push(G.packGAMA(A.gamma));
        let Y = G.filterData(A.data, A.width, A.height), J = DY9.deflateSync(Y, G.getDeflateOptions());
        if (((Y = null), !J || !J.length)) throw Error("bad png - invalid compressed data response");
        return (Z.push(G.packIDAT(J)), Z.push(G.packIEND()), Buffer.concat(Z));
    };
});
