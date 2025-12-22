// Module: K11
// Type: U
// Lines: 210803-210904
//
var K11 = U((jUG, oDB)=>{
    var { isASCIIHex: cDB } = en1(), { utf8Encode: pDB } = read_string_buffer();
    function T5(A) {
        return A.codePointAt(0);
    }
    function oh8(A) {
        let Q = A.toString(16).toUpperCase();
        if (Q.length === 1) Q = `0${Q}`;
        return `%${Q}`;
    }
    function lDB(A) {
        let Q = new Uint8Array(A.byteLength), B = 0;
        for(let G = 0; G < A.byteLength; ++G){
            let Z = A[G];
            if (Z !== 37) Q[B++] = Z;
            else if (Z === 37 && (!cDB(A[G + 1]) || !cDB(A[G + 2]))) Q[B++] = Z;
            else {
                let Y = parseInt(String.fromCodePoint(A[G + 1], A[G + 2]), 16);
                ((Q[B++] = Y), (G += 2));
            }
        }
        return Q.slice(0, B);
    }
    function rh8(A) {
        let Q = pDB(A);
        return lDB(Q);
    }
    function Aa1(A) {
        return A <= 31 || A > 126;
    }
    var sh8 = new Set([
        T5(" "),
        T5('"'),
        T5("<"),
        T5(">"),
        T5("`")
    ]);
    function th8(A) {
        return Aa1(A) || sh8.has(A);
    }
    var eh8 = new Set([
        T5(" "),
        T5('"'),
        T5("#"),
        T5("<"),
        T5(">")
    ]);
    function Qa1(A) {
        return Aa1(A) || eh8.has(A);
    }
    function Ag8(A) {
        return Qa1(A) || A === T5("'");
    }
    var Qg8 = new Set([
        T5("?"),
        T5("`"),
        T5("{"),
        T5("}"),
        T5("^")
    ]);
    function iDB(A) {
        return Qa1(A) || Qg8.has(A);
    }
    var Bg8 = new Set([
        T5("/"),
        T5(":"),
        T5(";"),
        T5("="),
        T5("@"),
        T5("["),
        T5("\\"),
        T5("]"),
        T5("|")
    ]);
    function nDB(A) {
        return iDB(A) || Bg8.has(A);
    }
    var Gg8 = new Set([
        T5("$"),
        T5("%"),
        T5("&"),
        T5("+"),
        T5(",")
    ]);
    function Zg8(A) {
        return nDB(A) || Gg8.has(A);
    }
    var Yg8 = new Set([
        T5("!"),
        T5("'"),
        T5("("),
        T5(")"),
        T5("~")
    ]);
    function Jg8(A) {
        return Zg8(A) || Yg8.has(A);
    }
    function aDB(A, Q) {
        let B = pDB(A), G = "";
        for (let Z of B)if (!Q(Z)) G += String.fromCharCode(Z);
        else G += oh8(Z);
        return G;
    }
    function Xg8(A, Q) {
        return aDB(String.fromCodePoint(A), Q);
    }
    function Ig8(A, Q, B = !1) {
        let G = "";
        for (let Z of A)if (B && Z === " ") G += "+";
        else G += aDB(Z, Q);
        return G;
    }
    oDB.exports = {
        isC0ControlPercentEncode: Aa1,
        isFragmentPercentEncode: th8,
        isQueryPercentEncode: Qa1,
        isSpecialQueryPercentEncode: Ag8,
        isPathPercentEncode: iDB,
        isUserinfoPercentEncode: nDB,
        isURLEncodedPercentEncode: Jg8,
        percentDecodeString: rh8,
        percentDecodeBytes: lDB,
        utf8PercentEncodeString: Ig8,
        utf8PercentEncodeCodePoint: Xg8
    };
});
