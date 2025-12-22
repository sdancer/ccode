// Module: $k2
// Type: U
// Lines: 430677-430714
//
var $k2 = U((Ck2)=>{
    Object.defineProperty(Ck2, "__esModule", {
        value: !0
    });
    function lq5(A) {
        let Q = [], B = {};
        return {
            add (G, Z) {
                while(Q.length >= A){
                    let Y = Q.shift();
                    if (Y !== void 0) delete B[Y];
                }
                if (B[G]) this.delete(G);
                (Q.push(G), (B[G] = Z));
            },
            clear () {
                ((B = {}), (Q = []));
            },
            get (G) {
                return B[G];
            },
            size () {
                return Q.length;
            },
            delete (G) {
                if (!B[G]) return !1;
                delete B[G];
                for(let Z = 0; Z < Q.length; Z++)if (Q[Z] === G) {
                    Q.splice(Z, 1);
                    break;
                }
                return !0;
            }
        };
    }
    Ck2.makeFifoCache = lq5;
});
