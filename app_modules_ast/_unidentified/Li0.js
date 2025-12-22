// Module: Li0
// Type: U
// Lines: 24075-24111
//
var createRenderState = U((YP7, Ni0)=>{
    function an9(A) {
        return {
            keywords: "dsconfig",
            contains: [
                {
                    className: "keyword",
                    begin: "^dsconfig",
                    end: /\s/,
                    excludeEnd: !0,
                    relevance: 10
                },
                {
                    className: "built_in",
                    begin: /(list|create|get|set|delete)-(\w+)/,
                    end: /\s/,
                    excludeEnd: !0,
                    illegal: "!@#$%^&*()",
                    relevance: 10
                },
                {
                    className: "built_in",
                    begin: /--(\w+)/,
                    end: /\s/,
                    excludeEnd: !0
                },
                {
                    className: "string",
                    begin: /"/,
                    end: /"/
                },
                {
                    className: "string",
                    begin: /'/,
                    end: /'/
                },
                {
                    className: "string",
                    begin: /[\w\-?]+:\w+/,
                    end: /\W/,
                    relevance: 0
                },
                {
                    className: "string",
                    begin: /\w+(\-\w+)*/,
                    end: /(?=\W)/,
                    relevance: 0
                },
                A.HASH_COMMENT_MODE
            ]
        };
    }
    Ni0.exports = an9;
});
