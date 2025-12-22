// Module: vgA
// Type: U
// Lines: 4811-4821
//
var vgA = U((Dx0)=>{
    Object.defineProperty(Dx0, "__esModule", {
        value: !0
    });
    Dx0.dateTimestampProvider = void 0;
    Dx0.dateTimestampProvider = {
        now: function() {
            return (Dx0.dateTimestampProvider.delegate || Date).now();
        },
        delegate: void 0
    };
});
