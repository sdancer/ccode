// Module: Ir2
// Type: U
// Lines: 453632-453644
//
var Ir2 = U((Jr2)=>{
    Object.defineProperty(Jr2, "__esModule", {
        value: !0
    });
    Jr2.NodeEventFactory = void 0;
    var rA7 = Fs(), sA7 = Zr2();
    class Yr2 extends rA7.EventFactory {
        constructor(){
            super({
                createMessageId: sA7.createMessageId
            });
        }
    }
    Jr2.NodeEventFactory = Yr2;
});
