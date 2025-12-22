// Module: Da0
// Type: U
// Lines: 28682-28709
//
var Da0 = U((sP7, Ha0)=>{
    function wo9(A) {
        return {
            name: "LDIF",
            contains: [
                {
                    className: "attribute",
                    begin: "^dn",
                    end: ": ",
                    excludeEnd: !0,
                    starts: {
                        end: "$",
                        relevance: 0
                    },
                    relevance: 10
                },
                {
                    className: "attribute",
                    begin: "^\\w",
                    end: ": ",
                    excludeEnd: !0,
                    starts: {
                        end: "$",
                        relevance: 0
                    }
                },
                {
                    className: "literal",
                    begin: "^-",
                    end: "$"
                },
                A.HASH_COMMENT_MODE
            ]
        };
    }
    Ha0.exports = wo9;
});
