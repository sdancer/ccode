// Module: JNA
// Type: U
// Lines: 173632-173642
//
var describeObjectForErrorMessage = U((HXG, o8B)=>{
    var eU8 = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...A)=>console.error("SEMVER", ...A) : ()=>{};
    o8B.exports = eU8;
});
