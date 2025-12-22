// Module: eg1
// Type: U
// Lines: 128080-128133
//
var createRenderState = U((jdQ)=>{
    Object.defineProperty(jdQ, "__esModule", {
        value: !0
    });
    jdQ.parseKeyPairsIntoRecord = jdQ.parsePairKeyValue = jdQ.getKeyPairs = jdQ.serializeKeyPairs = void 0;
    var w98 = f9(), aAA = tg1();
    function q98(A) {
        return A.reduce((Q, B)=>{
            let G = `${Q}${Q !== "" ? aAA.BAGGAGE_ITEMS_SEPARATOR : ""}${B}`;
            return G.length > aAA.BAGGAGE_MAX_TOTAL_LENGTH ? Q : G;
        }, "");
    }
    jdQ.serializeKeyPairs = q98;
    function N98(A) {
        return A.getAllEntries().map(([Q, B])=>{
            let G = `${encodeURIComponent(Q)}=${encodeURIComponent(B.value)}`;
            if (B.metadata !== void 0) G += aAA.BAGGAGE_PROPERTIES_SEPARATOR + B.metadata.toString();
            return G;
        });
    }
    jdQ.getKeyPairs = N98;
    function _dQ(A) {
        let Q = A.split(aAA.BAGGAGE_PROPERTIES_SEPARATOR);
        if (Q.length <= 0) return;
        let B = Q.shift();
        if (!B) return;
        let G = B.indexOf(aAA.BAGGAGE_KEY_PAIR_SEPARATOR);
        if (G <= 0) return;
        let Z = decodeURIComponent(B.substring(0, G).trim()), Y = decodeURIComponent(B.substring(G + 1).trim()), J;
        if (Q.length > 0) J = (0, w98.baggageEntryMetadataFromString)(Q.join(aAA.BAGGAGE_PROPERTIES_SEPARATOR));
        return {
            key: Z,
            value: Y,
            metadata: J
        };
    }
    jdQ.parsePairKeyValue = _dQ;
    function L98(A) {
        let Q = {};
        if (typeof A === "string" && A.length > 0) A.split(aAA.BAGGAGE_ITEMS_SEPARATOR).forEach((B)=>{
            let G = _dQ(B);
            if (G !== void 0 && G.value.length > 0) Q[G.key] = G.value;
        });
        return Q;
    }
    jdQ.parseKeyPairsIntoRecord = L98;
});
