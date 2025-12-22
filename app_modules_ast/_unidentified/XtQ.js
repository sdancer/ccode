// Module: XtQ
// Type: U
// Lines: 131143-131158
//
var createRenderState = U((YtQ)=>{
    Object.defineProperty(YtQ, "__esModule", {
        value: !0
    });
    YtQ.isUrlIgnored = YtQ.urlMatches = void 0;
    function ZtQ(A, Q) {
        if (typeof Q === "string") return A === Q;
        else return !!A.match(Q);
    }
    YtQ.urlMatches = ZtQ;
    function IW8(A, Q) {
        if (!Q) return !1;
        for (let B of Q)if (ZtQ(A, B)) return !0;
        return !1;
    }
    YtQ.isUrlIgnored = IW8;
});
