// Module: tz0
// Type: U
// Lines: 429615-429641
//
var renderElement = U((Cv2)=>{
    Object.defineProperty(Cv2, "__esModule", {
        value: !0
    });
    function wU5() {
        let A = typeof WeakSet === "function", Q = A ? new WeakSet() : [];
        function B(Z) {
            if (A) {
                if (Q.has(Z)) return !0;
                return (Q.add(Z), !1);
            }
            for(let Y = 0; Y < Q.length; Y++)if (Q[Y] === Z) return !0;
            return (Q.push(Z), !1);
        }
        function G(Z) {
            if (A) Q.delete(Z);
            else for(let Y = 0; Y < Q.length; Y++)if (Q[Y] === Z) {
                Q.splice(Y, 1);
                break;
            }
        }
        return [
            B,
            G
        ];
    }
    Cv2.memoBuilder = wU5;
});
