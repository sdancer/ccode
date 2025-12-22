// Module: tsA
// Type: U
// Lines: 173642-173664
//
var tsA = U((DXG, r8B)=>{
    var Aw8 = Number.MAX_SAFE_INTEGER || 9007199254740991, Qw8 = [
        "major",
        "premajor",
        "minor",
        "preminor",
        "patch",
        "prepatch",
        "prerelease"
    ];
    r8B.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: 16,
        MAX_SAFE_BUILD_LENGTH: 250,
        MAX_SAFE_INTEGER: Aw8,
        RELEASE_TYPES: Qw8,
        SEMVER_SPEC_VERSION: "2.0.0",
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2
    };
});
