// Module: iMA
// Type: U
// Lines: 235004-235026
//
var iMA = U((IkG, uMB)=>{
    var _t8 = Number.MAX_SAFE_INTEGER || 9007199254740991, jt8 = [
        "major",
        "premajor",
        "minor",
        "preminor",
        "patch",
        "prepatch",
        "prerelease"
    ];
    uMB.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: 16,
        MAX_SAFE_BUILD_LENGTH: 250,
        MAX_SAFE_INTEGER: _t8,
        RELEASE_TYPES: jt8,
        SEMVER_SPEC_VERSION: "2.0.0",
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
