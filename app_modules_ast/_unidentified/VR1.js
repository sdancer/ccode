// Module: VR1
// Type: U
// Lines: 78555-78573
//
var pushStartInstance = U((zZQ)=>{
    Object.defineProperty(zZQ, "__esModule", {
        value: !0
    });
    zZQ.getSSOTokenFilepath = void 0;
    var BC4 = qA("crypto"), GC4 = qA("path"), ZC4 = KR1(), YC4 = (A)=>{
        let B = (0, BC4.createHash)("sha1").update(A).digest("hex");
        return (0, GC4.join)((0, ZC4.getHomeDir)(), ".aws", "sso", "cache", `${B}.json`);
    };
    zZQ.getSSOTokenFilepath = YC4;
});
