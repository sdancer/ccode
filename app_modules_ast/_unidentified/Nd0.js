// Module: Nd0
// Type: U
// Lines: 15229-15242
//
var Nd0 = U((pR7, b$1)=>{
    var qd0 = (A = {})=>{
        let Q = A.env || process.env;
        if ((A.platform || process.platform) !== "win32") return "PATH";
        return (Object.keys(Q).reverse().find((G)=>G.toUpperCase() === "PATH") || "Path");
    };
    b$1.exports = qd0;
    b$1.exports.default = qd0;
});
