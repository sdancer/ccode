// Module: hi0
// Type: U
// Lines: 24672-24691
//
var hi0 = U((HP7, bi0)=>{
    function Ga9(A) {
        return {
            name: "ERB",
            subLanguage: "xml",
            contains: [
                A.COMMENT("<%#", "%>"),
                {
                    begin: "<%[%=-]?",
                    end: "[%-]?%>",
                    subLanguage: "ruby",
                    excludeBegin: !0,
                    excludeEnd: !0
                }
            ]
        };
    }
    bi0.exports = Ga9;
});
