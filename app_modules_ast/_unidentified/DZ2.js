// Module: DZ2
// Type: U
// Lines: 344934-344961
//
var DZ2 = U((HZ2)=>{
    var VJ0 = HZ2, VZ2 = (VJ0.isAbsolute = function(Q) {
        return /^(?:\/|\w+:)/.test(Q);
    }), KJ0 = (VJ0.normalize = function(Q) {
        Q = Q.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
        var B = Q.split("/"), G = VZ2(Q), Z = "";
        if (G) Z = B.shift() + "/";
        for(var Y = 0; Y < B.length;)if (B[Y] === "..") if (Y > 0 && B[Y - 1] !== "..") B.splice(--Y, 2);
        else if (G) B.splice(Y, 1);
        else ++Y;
        else if (B[Y] === ".") B.splice(Y, 1);
        else ++Y;
        return Z + B.join("/");
    });
    VJ0.resolve = function(Q, B, G) {
        if (!G) B = KJ0(B);
        if (VZ2(B)) return B;
        if (!G) Q = KJ0(Q);
        return (Q = Q.replace(/(?:\/|^)[^/]+$/, "")).length ? KJ0(Q + "/" + B) : B;
    };
});
