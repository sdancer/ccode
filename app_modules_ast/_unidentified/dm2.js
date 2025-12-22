// Module: dm2
// Type: U
// Lines: 439598-439609
//
var dm2 = U((mm2)=>{
    Object.defineProperty(mm2, "__esModule", {
        value: !0
    });
    var rm5 = r9A(), sm5 = hm2(), tm5 = um2();
    function em5() {
        if (rm5.NODE_VERSION.major >= 14) tm5.setHooksAsyncContextStrategy();
        else sm5.setDomainAsyncContextStrategy();
    }
    mm2.setNodeAsyncContextStrategy = em5;
});
