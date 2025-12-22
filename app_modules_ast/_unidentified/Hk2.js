// Module: Hk2
// Type: U
// Lines: 430603-430645
//
var Hk2 = U((Vk2)=>{
    Object.defineProperty(Vk2, "__esModule", {
        value: !0
    });
    var Ik2 = 60000;
    function Wk2(A, Q = Date.now()) {
        let B = parseInt(`${A}`, 10);
        if (!isNaN(B)) return B * 1000;
        let G = Date.parse(`${A}`);
        if (!isNaN(G)) return G - Q;
        return Ik2;
    }
    function Kk2(A, Q) {
        return A[Q] || A.all || 0;
    }
    function kq5(A, Q, B = Date.now()) {
        return Kk2(A, Q) > B;
    }
    function fq5(A, { statusCode: Q, headers: B }, G = Date.now()) {
        let Z = {
            ...A
        }, Y = B && B["x-sentry-rate-limits"], J = B && B["retry-after"];
        if (Y) for (let X of Y.trim().split(",")){
            let [I, W, , , K] = X.split(":", 5), V = parseInt(I, 10), H = (!isNaN(V) ? V : 60) * 1000;
            if (!W) Z.all = G + H;
            else for (let D of W.split(";"))if (D === "metric_bucket") {
                if (!K || K.split(";").includes("custom")) Z[D] = G + H;
            } else Z[D] = G + H;
        }
        else if (J) Z.all = G + Wk2(J, G);
        else if (Q === 429) Z.all = G + 60000;
        return Z;
    }
    Vk2.DEFAULT_RETRY_AFTER = Ik2;
    Vk2.disabledUntil = Kk2;
    Vk2.isRateLimited = kq5;
    Vk2.parseRetryAfterHeader = Wk2;
    Vk2.updateRateLimits = fq5;
});
