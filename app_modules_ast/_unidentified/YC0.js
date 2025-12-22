// Module: YC0
// Type: U
// Lines: 430263-430311
//
var pushViewTransitionAttributes = U((av2)=>{
    Object.defineProperty(av2, "__esModule", {
        value: !0
    });
    var pv2 = renderChildrenArray(), lv2 = 1000;
    function iv2() {
        return Date.now() / lv2;
    }
    function vw5() {
        let { performance: A } = pv2.GLOBAL_OBJ;
        if (!A || !A.now) return iv2;
        let Q = Date.now() - A.now(), B = A.timeOrigin == null ? Q : A.timeOrigin;
        return ()=>{
            return (B + A.now()) / lv2;
        };
    }
    var nv2 = vw5(), kw5 = nv2;
    av2._browserPerformanceTimeOriginMode = void 0;
    var fw5 = (()=>{
        let { performance: A } = pv2.GLOBAL_OBJ;
        if (!A || !A.now) {
            av2._browserPerformanceTimeOriginMode = "none";
            return;
        }
        let Q = 3600000, B = A.now(), G = Date.now(), Z = A.timeOrigin ? Math.abs(A.timeOrigin + B - G) : Q, Y = Z < Q, J = A.timing && A.timing.navigationStart, I = typeof J === "number" ? Math.abs(J + B - G) : Q, W = I < Q;
        if (Y || W) if (Z <= I) return ((av2._browserPerformanceTimeOriginMode = "timeOrigin"), A.timeOrigin);
        else return ((av2._browserPerformanceTimeOriginMode = "navigationStart"), J);
        return ((av2._browserPerformanceTimeOriginMode = "dateNow"), G);
    })();
    av2.browserPerformanceTimeOrigin = fw5;
    av2.dateTimestampInSeconds = iv2;
    av2.timestampInSeconds = nv2;
    av2.timestampWithMs = kw5;
});
