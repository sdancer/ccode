// Module: wY9
// Type: U
// Lines: 499898-499945
//
var rpcCallback = U((B77)=>{
    var A77 = qA("fs"), Q77 = prepareToHydrateHostInstance().PNG, xO0 = createRenderState();
    B77.render = function(Q, B) {
        let G = xO0.getOptions(B), Z = G.rendererOpts, Y = xO0.getImageWidth(Q.modules.size, G);
        ((Z.width = Y), (Z.height = Y));
        let J = new Q77(Z);
        return (xO0.qrToImageData(J.data, Q, G), J);
    };
    B77.renderToDataURL = function(Q, B, G) {
        if (typeof G > "u") ((G = B), (B = void 0));
        B77.renderToBuffer(Q, B, function(Z, Y) {
            if (Z) G(Z);
            let J = "data:image/png;base64,";
            ((J += Y.toString("base64")), G(null, J));
        });
    };
    B77.renderToBuffer = function(Q, B, G) {
        if (typeof G > "u") ((G = B), (B = void 0));
        let Z = B77.render(Q, B), Y = [];
        (Z.on("error", G), Z.on("data", function(J) {
            Y.push(J);
        }), Z.on("end", function() {
            G(null, Buffer.concat(Y));
        }), Z.pack());
    };
    B77.renderToFile = function(Q, B, G, Z) {
        if (typeof Z > "u") ((Z = G), (G = void 0));
        let Y = !1, J = (...I)=>{
            if (Y) return;
            ((Y = !0), Z.apply(null, I));
        }, X = A77.createWriteStream(Q);
        (X.on("error", J), X.on("close", J), B77.renderToFileStream(X, B, G));
    };
    B77.renderToFileStream = function(Q, B, G) {
        B77.render(B, G).pack().pipe(Q);
    };
});
