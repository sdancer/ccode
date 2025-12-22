// Module: Z02
// Type: U
// Lines: 315341-315355
//
var createRenderState = U((mv3)=>{
    var G02 = HTML parser(), uv3 = B02();
    mv3.parse = function(Q, B) {
        return new G02(B).parse(Q);
    };
    mv3.parseFragment = function(Q, B, G) {
        if (typeof Q === "string") ((G = B), (B = Q), (Q = null));
        return new G02(G).parseFragment(B, Q);
    };
    mv3.serialize = function(A, Q) {
        return new uv3(A, Q).serialize();
    };
});
