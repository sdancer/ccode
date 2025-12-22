// Module: bl0
// Type: U
// Lines: 21728-21743
//
var bl0 = U((gT7, fl0)=>{
    function In9(A) {
        return {
            name: "Clojure REPL",
            contains: [
                {
                    className: "meta",
                    begin: /^([\w.-]+|\s*#_)?=>/,
                    starts: {
                        end: /$/,
                        subLanguage: "clojure"
                    }
                }
            ]
        };
    }
    fl0.exports = In9;
});
