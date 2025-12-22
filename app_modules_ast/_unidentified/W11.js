// Module: W11
// Type: U
// Lines: 210792-210803
//
var read_string_buffer = U((_UG, dDB)=>{
    var lh8 = new TextEncoder(), ih8 = new TextDecoder("utf-8", {
        ignoreBOM: !0
    });
    function nh8(A) {
        return lh8.encode(A);
    }
    function ah8(A) {
        return ih8.decode(A);
    }
    dDB.exports = {
        utf8Encode: nh8,
        utf8DecodeWithoutBOM: ah8
    };
});
