// Module: hr0
// Type: U
// Lines: 40704-40720
//
var hr0 = U((Jy7, br0)=>{
    function Bs9(A) {
        return {
            name: "Shell Session",
            aliases: [
                "console"
            ],
            contains: [
                {
                    className: "meta",
                    begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
                    starts: {
                        end: /[^\\](?=\s*$)/,
                        subLanguage: "bash"
                    }
                }
            ]
        };
    }
    br0.exports = Bs9;
});
