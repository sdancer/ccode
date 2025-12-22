// Module: VY9
// Type: U
// Lines: 499588-499662
//
var VY9 = U((L0J, KY9)=>{
    var IY9 = !0, WY9 = qA("zlib"), y57 = ZY9();
    if (!WY9.deflateSync) IY9 = !1;
    var x57 = SO0(), v57 = XY9(), k57 = RO0(), f57 = _O0(), b57 = jO0();
    KY9.exports = function(A, Q) {
        if (!IY9) throw Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");
        let B;
        function G(M) {
            B = M;
        }
        let Z;
        function Y(M) {
            Z = M;
        }
        function J(M) {
            Z.transColor = M;
        }
        function X(M) {
            Z.palette = M;
        }
        function I() {
            Z.alpha = !0;
        }
        let W;
        function K(M) {
            W = M;
        }
        let V = [];
        function H(M) {
            V.push(M);
        }
        let D = new x57(A);
        if ((new k57(Q, {
            read: D.read.bind(D),
            error: G,
            metadata: Y,
            gamma: K,
            palette: X,
            transColor: J,
            inflateData: H,
            simpleTransparency: I
        }).start(), D.process(), B)) throw B;
        let E = Buffer.concat(V);
        V.length = 0;
        let z;
        if (Z.interlace) z = WY9.inflateSync(E);
        else {
            let R = (((Z.width * Z.bpp * Z.depth + 7) >> 3) + 1) * Z.height;
            z = y57(E, {
                chunkSize: R,
                maxLength: R
            });
        }
        if (((E = null), !z || !z.length)) throw Error("bad png - invalid inflate data response");
        let $ = v57.process(z, Z);
        E = null;
        let O = f57.dataToBitMap($, Z);
        $ = null;
        let N = b57(O, Z);
        return ((Z.data = N), (Z.gamma = W || 0), Z);
    };
});
