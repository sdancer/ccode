// Module: KC0
// Type: U
// Lines: 430449-430590
//
var createRenderState = U((Yk2)=>{
    Object.defineProperty(Yk2, "__esModule", {
        value: !0
    });
    var Iq5 = Lz0(), Wq5 = MvA(), Gk2 = L_();
    function Kq5(A, Q = []) {
        return [
            A,
            Q
        ];
    }
    function Vq5(A, Q) {
        let [B, G] = A;
        return [
            B,
            [
                ...G,
                Q
            ]
        ];
    }
    function Zk2(A, Q) {
        let B = A[1];
        for (let G of B){
            let Z = G[0].type;
            if (Q(G, Z)) return !0;
        }
        return !1;
    }
    function Hq5(A, Q) {
        return Zk2(A, (B, G)=>Q.includes(G));
    }
    function WC0(A, Q) {
        return (Q || new TextEncoder()).encode(A);
    }
    function Dq5(A, Q) {
        let [B, G] = A, Z = JSON.stringify(B);
        function Y(J) {
            if (typeof Z === "string") Z = typeof J === "string" ? Z + J : [
                WC0(Z, Q),
                J
            ];
            else Z.push(typeof J === "string" ? WC0(J, Q) : J);
        }
        for (let J of G){
            let [X, I] = J;
            if ((Y(`
${JSON.stringify(X)}
`), typeof I === "string" || I instanceof Uint8Array)) Y(I);
            else {
                let W;
                try {
                    W = JSON.stringify(I);
                } catch (K) {
                    W = JSON.stringify(Wq5.normalize(I));
                }
                Y(W);
            }
        }
        return typeof Z === "string" ? Z : Fq5(Z);
    }
    function Fq5(A) {
        let Q = A.reduce((Z, Y)=>Z + Y.length, 0), B = new Uint8Array(Q), G = 0;
        for (let Z of A)(B.set(Z, G), (G += Z.length));
        return B;
    }
    function Eq5(A, Q, B) {
        let G = typeof A === "string" ? Q.encode(A) : A;
        function Z(I) {
            let W = G.subarray(0, I);
            return ((G = G.subarray(I + 1)), W);
        }
        function Y() {
            let I = G.indexOf(10);
            if (I < 0) I = G.length;
            return JSON.parse(B.decode(Z(I)));
        }
        let J = Y(), X = [];
        while(G.length){
            let I = Y(), W = typeof I.length === "number" ? I.length : void 0;
            X.push([
                I,
                W ? Z(W) : Y()
            ]);
        }
        return [
            J,
            X
        ];
    }
    function zq5(A, Q) {
        let B = typeof A.data === "string" ? WC0(A.data, Q) : A.data;
        return [
            Gk2.dropUndefinedKeys({
                type: "attachment",
                length: B.length,
                filename: A.filename,
                content_type: A.contentType,
                attachment_type: A.attachmentType
            }),
            B
        ];
    }
    var Cq5 = {
        session: "session",
        sessions: "session",
        attachment: "attachment",
        transaction: "transaction",
        event: "error",
        client_report: "internal",
        user_report: "default",
        profile: "profile",
        replay_event: "replay",
        replay_recording: "replay",
        check_in: "monitor",
        feedback: "feedback",
        span: "span",
        statsd: "metric_bucket"
    };
    function $q5(A) {
        return Cq5[A];
    }
    function Uq5(A) {
        if (!A || !A.sdk) return;
        let { name: Q, version: B } = A.sdk;
        return {
            name: Q,
            version: B
        };
    }
    function wq5(A, Q, B, G) {
        let Z = A.sdkProcessingMetadata && A.sdkProcessingMetadata.dynamicSamplingContext;
        return {
            event_id: A.event_id,
            sent_at: new Date().toISOString(),
            ...(Q && {
                sdk: Q
            }),
            ...(!!B && G && {
                dsn: Iq5.dsnToString(G)
            }),
            ...(Z && {
                trace: Gk2.dropUndefinedKeys({
                    ...Z
                })
            })
        };
    }
    Yk2.addItemToEnvelope = Vq5;
    Yk2.createAttachmentEnvelopeItem = zq5;
    Yk2.createEnvelope = Kq5;
    Yk2.createEventEnvelopeHeaders = wq5;
    Yk2.envelopeContainsItemType = Hq5;
    Yk2.envelopeItemTypeToDataCategory = $q5;
    Yk2.forEachEnvelopeItem = Zk2;
    Yk2.getSdkMetadataForEnvelopeHeader = Uq5;
    Yk2.parseEnvelope = Eq5;
    Yk2.serializeEnvelope = Dq5;
});
