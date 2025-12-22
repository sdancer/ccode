// Module: JCB
// Type: U
// Lines: 217978-217991
//
var JCB = U((NwG, YCB)=>{
    function na1(A) {
        var Q = ((A / 8) | 0) + (A % 8 === 0 ? 0 : 1);
        return Q;
    }
    var oc8 = {
        ES256: na1(256),
        ES384: na1(384),
        ES512: na1(521)
    };
    function rc8(A) {
        var Q = oc8[A];
        if (Q) return Q;
        throw Error('Unknown algorithm "' + A + '"');
    }
    YCB.exports = rc8;
});
