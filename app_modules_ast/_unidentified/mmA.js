// Module: mmA
// Type: U
// Lines: 55600-55624
//
var renderElement = U((r0Q)=>{
    Object.defineProperty(r0Q, "__esModule", {
        value: !0
    });
    r0Q.getUUID = void 0;
    function JB4() {
        if (typeof crypto < "u" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
        let A = new Date().getTime(), Q = (typeof performance < "u" && performance.now && performance.now() * 1000) || 0;
        return `xxxxxxxx-xxxx-4xxx-${"89ab"[Math.floor(Math.random() * 4)]}xxx-xxxxxxxxxxxx`.replace(/[xy]/g, (G)=>{
            let Z = Math.random() * 16;
            if (A > 0) ((Z = ((A + Z) % 16) | 0), (A = Math.floor(A / 16)));
            else ((Z = ((Q + Z) % 16) | 0), (Q = Math.floor(Q / 16)));
            return (G === "x" ? Z : (Z & 7) | 8).toString(16);
        });
    }
    r0Q.getUUID = JB4;
});
