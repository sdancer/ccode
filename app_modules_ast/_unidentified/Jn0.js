// Module: Jn0
// Type: U
// Lines: 25408-25432
//
var createRenderState = U((LP7, Yn0)=>{
    function Ua9(A) {
        return {
            name: "Gherkin",
            aliases: [
                "feature"
            ],
            keywords: "Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",
            contains: [
                {
                    className: "symbol",
                    begin: "\\*",
                    relevance: 0
                },
                {
                    className: "meta",
                    begin: "@[^@\\s]+"
                },
                {
                    begin: "\\|",
                    end: "\\|\\w*$",
                    contains: [
                        {
                            className: "string",
                            begin: "[^|]+"
                        }
                    ]
                },
                {
                    className: "variable",
                    begin: "<",
                    end: ">"
                },
                A.HASH_COMMENT_MODE,
                {
                    className: "string",
                    begin: '"""',
                    end: '"""'
                },
                A.QUOTE_STRING_MODE
            ]
        };
    }
    Yn0.exports = Ua9;
});
