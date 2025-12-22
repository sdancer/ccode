// Module: Jr0
// Type: U
// Lines: 39167-39182
//
var Jr0 = U((pS7, Yr0)=>{
    function Pr9(A) {
        return {
            aliases: [
                "pycon"
            ],
            contains: [
                {
                    className: "meta",
                    starts: {
                        end: / |$/,
                        starts: {
                            end: "$",
                            subLanguage: "python"
                        }
                    },
                    variants: [
                        {
                            begin: /^>>>(?=[ ]|$)/
                        },
                        {
                            begin: /^\.\.\.(?=[ ]|$)/
                        }
                    ]
                }
            ]
        };
    }
    Yr0.exports = Pr9;
});
