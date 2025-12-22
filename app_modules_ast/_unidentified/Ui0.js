// Module: Ui0
// Type: U
// Lines: 24014-24037
//
var Ui0 = U((GP7, $i0)=>{
    function in9(A) {
        return {
            name: "Dockerfile",
            aliases: [
                "docker"
            ],
            case_insensitive: !0,
            keywords: "from maintainer expose env arg user onbuild stopsignal",
            contains: [
                A.HASH_COMMENT_MODE,
                A.APOS_STRING_MODE,
                A.QUOTE_STRING_MODE,
                A.NUMBER_MODE,
                {
                    beginKeywords: "run cmd entrypoint volume add copy workdir label healthcheck shell",
                    starts: {
                        end: /[^\\]$/,
                        subLanguage: "bash"
                    }
                }
            ],
            illegal: "</"
        };
    }
    $i0.exports = in9;
});
