// Module: xFB
// Type: U
// Lines: 212886-212909
//
var xFB = U((Ru8)=>{
    var { URL: Ou8, URLSearchParams: Mu8 } = SFB(), TT = createRenderState(), yFB = K11(), z11 = {
        Array,
        Object,
        Promise,
        String,
        TypeError
    };
    Ou8.install(z11, [
        "Window"
    ]);
    Mu8.install(z11, [
        "Window"
    ]);
    Ru8.URL = z11.URL;
    Ru8.URLSearchParams = z11.URLSearchParams;
    Ru8.parseURL = TT.parseURL;
    Ru8.basicURLParse = TT.basicURLParse;
    Ru8.serializeURL = TT.serializeURL;
    Ru8.serializePath = TT.serializePath;
    Ru8.serializeHost = TT.serializeHost;
    Ru8.serializeInteger = TT.serializeInteger;
    Ru8.serializeURLOrigin = TT.serializeURLOrigin;
    Ru8.setTheUsername = TT.setTheUsername;
    Ru8.setThePassword = TT.setThePassword;
    Ru8.cannotHaveAUsernamePasswordPort = TT.cannotHaveAUsernamePasswordPort;
    Ru8.hasAnOpaquePath = TT.hasAnOpaquePath;
    Ru8.percentDecodeString = yFB.percentDecodeString;
    Ru8.percentDecodeBytes = yFB.percentDecodeBytes;
});
