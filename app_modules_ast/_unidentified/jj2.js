// Module: jj2
// Type: U
// Lines: 413543-413587
//
var jj2 = U((SV5)=>{
    var Oj2 = stopParsing(), Mj2 = HTML5 parser(), llZ = XE0(), Rj2 = JE0();
    SV5.createDOMImplementation = function() {
        return new Oj2(null);
    };
    SV5.createDocument = function(A, Q) {
        if (A || Q) {
            var B = new Mj2();
            return (B.parse(A || "", !0), B.document());
        }
        return new Oj2(null).createHTMLDocument("");
    };
    SV5.createIncrementalHTMLParser = function() {
        var A = new Mj2();
        return {
            write: function(Q) {
                if (Q.length > 0) A.parse(Q, !1, function() {
                    return !0;
                });
            },
            end: function(Q) {
                A.parse(Q || "", !0, function() {
                    return !0;
                });
            },
            process: function(Q) {
                return A.parse("", !1, Q);
            },
            document: function() {
                return A.document();
            }
        };
    };
    SV5.createWindow = function(A, Q) {
        var B = SV5.createDocument(A);
        if (Q !== void 0) B._address = Q;
        return new Rj2.Window(B);
    };
    SV5.impl = Rj2;
});
