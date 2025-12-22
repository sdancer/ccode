// Module: mV0
// Type: U
// Lines: 382191-382249
//
var mV0 = U((eSZ, Rw2)=>{
    var b55 = Ez(), Ow2 = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"), Mw2 = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
    function h55(A) {
        if (A === null) return !1;
        if (Ow2.exec(A) !== null) return !0;
        if (Mw2.exec(A) !== null) return !0;
        return !1;
    }
    function g55(A) {
        var Q, B, G, Z, Y, J, X, I = 0, W = null, K, V, H;
        if (((Q = Ow2.exec(A)), Q === null)) Q = Mw2.exec(A);
        if (Q === null) throw Error("Date resolve error");
        if (((B = +Q[1]), (G = +Q[2] - 1), (Z = +Q[3]), !Q[4])) return new Date(Date.UTC(B, G, Z));
        if (((Y = +Q[4]), (J = +Q[5]), (X = +Q[6]), Q[7])) {
            I = Q[7].slice(0, 3);
            while(I.length < 3)I += "0";
            I = +I;
        }
        if (Q[9]) {
            if (((K = +Q[10]), (V = +(Q[11] || 0)), (W = (K * 60 + V) * 60000), Q[9] === "-")) W = -W;
        }
        if (((H = new Date(Date.UTC(B, G, Z, Y, J, X, I))), W)) H.setTime(H.getTime() - W);
        return H;
    }
    function u55(A) {
        return A.toISOString();
    }
    Rw2.exports = new b55("tag:yaml.org,2002:timestamp", {
        kind: "scalar",
        resolve: h55,
        construct: g55,
        instanceOf: Date,
        represent: u55
    });
});
