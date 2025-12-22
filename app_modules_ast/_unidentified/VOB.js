// Module: VOB
// Type: U
// Lines: 233602-233609
//
var VOB = U((WOB)=>{
    Object.defineProperty(WOB, "__esModule", {
        value: !0
    });
    WOB.default = void 0;
    var hr8 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    WOB.default = hr8;
});
