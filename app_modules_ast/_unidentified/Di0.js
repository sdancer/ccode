// Module: Di0
// Type: U
// Lines: 23902-23938
//
var toJSON = U((AP7, Hi0)=>{
    function cn9(A) {
        return {
            name: "Diff",
            aliases: [
                "patch"
            ],
            contains: [
                {
                    className: "meta",
                    relevance: 10,
                    variants: [
                        {
                            begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
                        },
                        {
                            begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
                        },
                        {
                            begin: /^--- +\d+,\d+ +----$/
                        }
                    ]
                },
                {
                    className: "comment",
                    variants: [
                        {
                            begin: /Index: /,
                            end: /$/
                        },
                        {
                            begin: /^index/,
                            end: /$/
                        },
                        {
                            begin: /={3,}/,
                            end: /$/
                        },
                        {
                            begin: /^-{3}/,
                            end: /$/
                        },
                        {
                            begin: /^\*{3} /,
                            end: /$/
                        },
                        {
                            begin: /^\+{3}/,
                            end: /$/
                        },
                        {
                            begin: /^\*{15}$/
                        },
                        {
                            begin: /^diff --git/,
                            end: /$/
                        }
                    ]
                },
                {
                    className: "addition",
                    begin: /^\+/,
                    end: /$/
                },
                {
                    className: "deletion",
                    begin: /^-/,
                    end: /$/
                },
                {
                    className: "addition",
                    begin: /^!/,
                    end: /$/
                }
            ]
        };
    }
    Hi0.exports = cn9;
});
