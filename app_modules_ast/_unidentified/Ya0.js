// Module: Ya0
// Type: U
// Lines: 28190-28207
//
var Ya0 = U((nP7, Za0)=>{
    function Do9(A) {
        return {
            name: "Julia REPL",
            contains: [
                {
                    className: "meta",
                    begin: /^julia>/,
                    relevance: 10,
                    starts: {
                        end: /^(?![ ]{6})/,
                        subLanguage: "julia"
                    },
                    aliases: [
                        "jldoctest"
                    ]
                }
            ]
        };
    }
    Za0.exports = Do9;
});
