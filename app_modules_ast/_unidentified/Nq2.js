// Module: Nq2
// Type: U
// Lines: 384090-384104
//
var Nq2 = U((IyZ, qq2)=>{
    var bG5 = /\.(jpeg|jpg|gif|png|bmp|ico)$/i;
    qq2.exports = {
        order: 400,
        allowEmpty: !0,
        canParse (A) {
            return Buffer.isBuffer(A.data) && bG5.test(A.url);
        },
        parse (A) {
            if (Buffer.isBuffer(A.data)) return A.data;
            else return Buffer.from(A.data);
        }
    };
});
