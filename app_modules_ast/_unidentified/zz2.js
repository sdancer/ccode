// Module: zz2
// Type: U
// Lines: 374207-374277
//
var createRenderState = U((G45)=>{
    var Fz2 = pa1(), e95 = Dz2();
    G45.build = B45;
    function A45(A) {
        function Q(B) {
            return B < 10 ? "0" + B : B;
        }
        return (A.getUTCFullYear() + "-" + Q(A.getUTCMonth() + 1) + "-" + Q(A.getUTCDate()) + "T" + Q(A.getUTCHours()) + ":" + Q(A.getUTCMinutes()) + ":" + Q(A.getUTCSeconds()) + "Z");
    }
    var Q45 = Object.prototype.toString;
    function Ez2(A) {
        var Q = Q45.call(A).match(/\[object (.*)\]/);
        return Q ? Q[1] : Q;
    }
    function B45(A, Q) {
        var B = {
            version: "1.0",
            encoding: "UTF-8"
        }, G = {
            pubid: "-//Apple//DTD PLIST 1.0//EN",
            sysid: "http://www.apple.com/DTDs/PropertyList-1.0.dtd"
        }, Z = e95.create("plist");
        if ((Z.dec(B.version, B.encoding, B.standalone), Z.dtd(G.pubid, G.sysid), Z.att("version", "1.0"), sW0(A, Z), !Q)) Q = {};
        return ((Q.pretty = Q.pretty !== !1), Z.end(Q));
    }
    function sW0(A, Q) {
        var B, G, Z, Y = Ez2(A);
        if (Y == "Undefined") return;
        else if (Array.isArray(A)) {
            Q = Q.ele("array");
            for(G = 0; G < A.length; G++)sW0(A[G], Q);
        } else if (Buffer.isBuffer(A)) Q.ele("data").raw(A.toString("base64"));
        else if (Y == "Object") {
            Q = Q.ele("dict");
            for(Z in A)if (A.hasOwnProperty(Z)) (Q.ele("key").txt(Z), sW0(A[Z], Q));
        } else if (Y == "Number") ((B = A % 1 === 0 ? "integer" : "real"), Q.ele(B).txt(A.toString()));
        else if (Y == "BigInt") Q.ele("integer").txt(A);
        else if (Y == "Date") Q.ele("date").txt(A45(new Date(A)));
        else if (Y == "Boolean") Q.ele(A ? "true" : "false");
        else if (Y == "String") Q.ele("string").txt(A);
        else if (Y == "ArrayBuffer") Q.ele("data").raw(Fz2.fromByteArray(A));
        else if (A && A.buffer && Ez2(A.buffer) == "ArrayBuffer") Q.ele("data").raw(Fz2.fromByteArray(new Uint8Array(A.buffer), Q));
        else if (Y === "Null") Q.ele("null").txt("");
    }
});
