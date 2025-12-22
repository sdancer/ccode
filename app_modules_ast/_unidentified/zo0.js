// Module: zo0
// Type: U
// Lines: 37613-37631
//
var zo0 = U((NS7, Eo0)=>{
    function Yr9(A) {
        return {
            name: "Node REPL",
            contains: [
                {
                    className: "meta",
                    starts: {
                        end: / |$/,
                        starts: {
                            end: "$",
                            subLanguage: "javascript"
                        }
                    },
                    variants: [
                        {
                            begin: /^>(?=[ ]|$)/
                        },
                        {
                            begin: /^\.\.\.(?=[ ]|$)/
                        }
                    ]
                }
            ]
        };
    }
    Eo0.exports = Yr9;
});
