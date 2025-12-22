// Module: wq2
// Type: U
// Lines: 384070-384090
//
var createRenderState = U((XyZ, Uq2)=>{
    var { ParserError: kG5 } = describeNativeComponentFrame(), fG5 = /\.(txt|htm|html|md|xml|js|min|map|css|scss|less|svg)$/i;
    Uq2.exports = {
        order: 300,
        allowEmpty: !0,
        encoding: "utf8",
        canParse (A) {
            return ((typeof A.data === "string" || Buffer.isBuffer(A.data)) && fG5.test(A.url));
        },
        parse (A) {
            if (typeof A.data === "string") return A.data;
            else if (Buffer.isBuffer(A.data)) return A.data.toString(this.encoding);
            else throw new kG5("data is not text", A.url);
        }
    };
});
