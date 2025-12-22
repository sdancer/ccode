// Module: ql0
// Type: U
// Lines: 20989-21012
//
var createRenderState = U((ST7, wl0)=>{
    function oi9(A) {
        let Q = {
            className: "literal",
            begin: /[+-]/,
            relevance: 0
        };
        return {
            name: "Brainfuck",
            aliases: [
                "bf"
            ],
            contains: [
                A.COMMENT(`[^\\[\\]\\.,\\+\\-<> \r
]`, `[\\[\\]\\.,\\+\\-<> \r
]`, {
                    returnEnd: !0,
                    relevance: 0
                }),
                {
                    className: "title",
                    begin: "[\\[\\]]",
                    relevance: 0
                },
                {
                    className: "string",
                    begin: "[\\.,]",
                    relevance: 0
                },
                {
                    begin: /(?:\+\+|--)/,
                    contains: [
                        Q
                    ]
                },
                Q
            ]
        };
    }
    wl0.exports = oi9;
});
