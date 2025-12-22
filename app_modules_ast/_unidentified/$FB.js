// Module: $FB
// Type: U
// Lines: 211761-211789
//
var renderElement = U((rg8)=>{
    var CFB = J11(), F11 = I11();
    rg8.convert = (A, Q, { context: B = "The provided value" } = {})=>{
        if (typeof Q !== "function") throw new A.TypeError(B + " is not a function");
        function G(...Z) {
            let Y = F11.tryWrapperForImpl(this), J;
            for(let X = 0; X < Z.length; X++)Z[X] = F11.tryWrapperForImpl(Z[X]);
            return ((J = Reflect.apply(Q, Y, Z)), (J = CFB.any(J, {
                context: B,
                globals: A
            })), J);
        }
        return ((G.construct = (...Z)=>{
            for(let J = 0; J < Z.length; J++)Z[J] = F11.tryWrapperForImpl(Z[J]);
            let Y = Reflect.construct(Q, Z);
            return ((Y = CFB.any(Y, {
                context: B,
                globals: A
            })), Y);
        }), (G[F11.wrapperSymbol] = Q), (G.objectReference = Q), G);
    };
});
