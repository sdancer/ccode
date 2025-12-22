// Module: Ax0
// Type: U
// Lines: 4374-4384
//
var Ax0 = U((ey0)=>{
    Object.defineProperty(ey0, "__esModule", {
        value: !0
    });
    ey0.performanceTimestampProvider = void 0;
    ey0.performanceTimestampProvider = {
        now: function() {
            return (ey0.performanceTimestampProvider.delegate || performance).now();
        },
        delegate: void 0
    };
});
