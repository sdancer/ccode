// Module: nZ2
// Type: U
// Lines: 347298-347335
//
var renderElement = U((bFZ, iZ2)=>{
    var Z7 = (iZ2.exports = YY0());
    Z7.build = "light";
    function Fo3(A, Q, B) {
        if (typeof Q === "function") ((B = Q), (Q = new Z7.Root()));
        else if (!Q) Q = new Z7.Root();
        return Q.load(A, B);
    }
    Z7.load = Fo3;
    function Eo3(A, Q) {
        if (!Q) Q = new Z7.Root();
        return Q.loadSync(A);
    }
    Z7.loadSync = Eo3;
    Z7.encoder = encoder();
    Z7.decoder = decoder();
    Z7.verifier = genVerifyKey();
    Z7.converter = toObject();
    Z7.ReflectionObject = _resolveFeatures();
    Z7.Namespace = toJSON();
    Z7.Root = describeNativeComponentFrame();
    Z7.Enum = toJSON();
    Z7.Type = S71();
    Z7.Field = toJSON();
    Z7.OneOf = f2A();
    Z7.MapField = memoize();
    Z7.Service = _71();
    Z7.Method = toJSON();
    Z7.Message = j71();
    Z7.wrappers = LJ0();
    Z7.types = createRenderState();
    Z7.util = BD();
    Z7.ReflectionObject._configure(Z7.Root);
    Z7.Namespace._configure(Z7.Type, Z7.Service, Z7.Enum);
    Z7.Root._configure(Z7.Type);
    Z7.Field._configure(Z7.Type);
});
