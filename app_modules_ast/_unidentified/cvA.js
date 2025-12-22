// Module: cvA
// Type: U
// Lines: 434047-434118
//
var cvA = U((Jb2)=>{
    Object.defineProperty(Jb2, "__esModule", {
        value: !0
    });
    var lP5 = FQ();
    function iP5(A, Q, B, G) {
        let Z = Object.entries(lP5.dropUndefinedKeys(G)).sort((Y, J)=>Y[0].localeCompare(J[0]));
        return `${A}${Q}${B}${Z}`;
    }
    function nP5(A) {
        let Q = 0;
        for(let B = 0; B < A.length; B++){
            let G = A.charCodeAt(B);
            ((Q = (Q << 5) - Q + G), (Q &= Q));
        }
        return Q >>> 0;
    }
    function aP5(A) {
        let Q = "";
        for (let B of A){
            let G = Object.entries(B.tags), Z = G.length > 0 ? `|#${G.map(([Y, J])=>`${Y}:${J}`).join(",")}` : "";
            Q += `${B.name}@${B.unit}:${B.metric}|${B.metricType}${Z}|T${B.timestamp}
`;
        }
        return Q;
    }
    function oP5(A) {
        return A.replace(/[^\w]+/gi, "_");
    }
    function rP5(A) {
        return A.replace(/[^\w\-.]+/gi, "_");
    }
    function sP5(A) {
        return A.replace(/[^\w\-./]+/gi, "");
    }
    var tP5 = [
        [
            `
`,
            "\\n"
        ],
        [
            "\r",
            "\\r"
        ],
        [
            "\t",
            "\\t"
        ],
        [
            "\\",
            "\\\\"
        ],
        [
            "|",
            "\\u{7c}"
        ],
        [
            ",",
            "\\u{2c}"
        ]
    ];
    function eP5(A) {
        for (let [Q, B] of tP5)if (A === Q) return B;
        return A;
    }
    function AS5(A) {
        return [
            ...A
        ].reduce((Q, B)=>Q + eP5(B), "");
    }
    function QS5(A) {
        let Q = {};
        for(let B in A)if (Object.prototype.hasOwnProperty.call(A, B)) {
            let G = sP5(B);
            Q[G] = AS5(String(A[B]));
        }
        return Q;
    }
    Jb2.getBucketKey = iP5;
    Jb2.sanitizeMetricKey = rP5;
    Jb2.sanitizeTags = QS5;
    Jb2.sanitizeUnit = oP5;
    Jb2.serializeMetricBuckets = aP5;
    Jb2.simpleHash = nP5;
});
