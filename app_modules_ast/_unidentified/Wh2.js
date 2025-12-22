// Module: Wh2
// Type: U
// Lines: 435322-435354
//
var renderElement = U((Ih2)=>{
    Object.defineProperty(Ih2, "__esModule", {
        value: !0
    });
    var ly5 = FQ(), Yh2 = $d(), Zh2 = Gh2(), Jh2 = "ModuleMetadata", iy5 = ()=>{
        return {
            name: Jh2,
            setupOnce () {},
            setup (A) {
                if (typeof A.on !== "function") return;
                A.on("beforeEnvelope", (Q)=>{
                    ly5.forEachEnvelopeItem(Q, (B, G)=>{
                        if (G === "event") {
                            let Z = Array.isArray(B) ? B[1] : void 0;
                            if (Z) (Zh2.stripMetadataFromStackFrames(Z), (B[1] = Z));
                        }
                    });
                });
            },
            processEvent (A, Q, B) {
                let G = B.getOptions().stackParser;
                return (Zh2.addMetadataToStackFrames(G, A), A);
            }
        };
    }, Xh2 = Yh2.defineIntegration(iy5), ny5 = Yh2.convertIntegrationFnToClass(Jh2, Xh2);
    Ih2.ModuleMetadata = ny5;
    Ih2.moduleMetadataIntegration = Xh2;
});
