// Module: b2A
// Type: U
// Lines: 346619-346669
//
var createRenderState = U((kZ2)=>{
    var WSA = kZ2, Yo3 = BD(), Jo3 = [
        "double",
        "float",
        "int32",
        "uint32",
        "sint32",
        "fixed32",
        "sfixed32",
        "int64",
        "uint64",
        "sint64",
        "fixed64",
        "sfixed64",
        "bool",
        "string",
        "bytes"
    ];
    function KSA(A, Q) {
        var B = 0, G = {};
        Q |= 0;
        while(B < A.length)G[Jo3[B + Q]] = A[B++];
        return G;
    }
    WSA.basic = KSA([
        1,
        5,
        0,
        0,
        0,
        5,
        5,
        0,
        0,
        0,
        1,
        1,
        0,
        2,
        2
    ]);
    WSA.defaults = KSA([
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        !1,
        "",
        Yo3.emptyArray,
        null
    ]);
    WSA.long = KSA([
        0,
        0,
        0,
        1,
        1
    ], 7);
    WSA.mapKey = KSA([
        0,
        0,
        0,
        5,
        5,
        0,
        0,
        0,
        1,
        1,
        0,
        2
    ], 2);
    WSA.packed = KSA([
        1,
        5,
        0,
        0,
        0,
        5,
        5,
        0,
        0,
        0,
        1,
        1,
        0
    ]);
});
