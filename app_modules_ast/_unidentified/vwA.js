// Module: vwA
// Type: U
// Lines: 126768-126792
//
var vwA = U((vgQ)=>{
    Object.defineProperty(vgQ, "__esModule", {
        value: !0
    });
    vgQ.ROOT_CONTEXT = vgQ.createContextKey = void 0;
    function tQ8(A) {
        return Symbol.for(A);
    }
    vgQ.createContextKey = tQ8;
    class naA {
        constructor(A){
            let Q = this;
            ((Q._currentContext = A ? new Map(A) : new Map()), (Q.getValue = (B)=>Q._currentContext.get(B)), (Q.setValue = (B, G)=>{
                let Z = new naA(Q._currentContext);
                return (Z._currentContext.set(B, G), Z);
            }), (Q.deleteValue = (B)=>{
                let G = new naA(Q._currentContext);
                return (G._currentContext.delete(B), G);
            }));
        }
    }
    vgQ.ROOT_CONTEXT = new naA();
});
