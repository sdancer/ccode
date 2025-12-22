// Module: C71
// Type: U
// Lines: 343357-343370
//
var C71 = U((KG2)=>{
    Object.defineProperty(KG2, "__esModule", {
        value: !0
    });
    KG2.registerAdminService = Yn3;
    KG2.addAdminServicesToServer = Jn3;
    var WG2 = [];
    function Yn3(A, Q) {
        WG2.push({
            getServiceDefinition: A,
            getHandlers: Q
        });
    }
    function Jn3(A) {
        for (let { getServiceDefinition: Q, getHandlers: B } of WG2)A.addService(Q(), B());
    }
});
