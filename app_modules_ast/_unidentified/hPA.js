// Module: hPA
// Type: U
// Lines: 325251-325301
//
var hPA = U((q92)=>{
    Object.defineProperty(q92, "__esModule", {
        value: !0
    });
    q92.isValidName = q92.isDescriptorCompatibleWith = q92.createInstrumentDescriptorWithView = q92.createInstrumentDescriptor = void 0;
    var U92 = f9(), Sg3 = hP();
    function yg3(A, Q, B) {
        if (!w92(A)) U92.diag.warn(`Invalid metric name: "${A}". The metric name should be a ASCII string with a length no greater than 255 characters.`);
        return {
            name: A,
            type: Q,
            description: B?.description ?? "",
            unit: B?.unit ?? "",
            valueType: B?.valueType ?? U92.ValueType.DOUBLE,
            advice: B?.advice ?? {}
        };
    }
    q92.createInstrumentDescriptor = yg3;
    function xg3(A, Q) {
        return {
            name: A.name ?? Q.name,
            description: A.description ?? Q.description,
            type: Q.type,
            unit: Q.unit,
            valueType: Q.valueType,
            advice: Q.advice
        };
    }
    q92.createInstrumentDescriptorWithView = xg3;
    function vg3(A, Q) {
        return ((0, Sg3.equalsCaseInsensitive)(A.name, Q.name) && A.unit === Q.unit && A.type === Q.type && A.valueType === Q.valueType);
    }
    q92.isDescriptorCompatibleWith = vg3;
    var kg3 = /^[a-z][a-z0-9_.\-/]{0,254}$/i;
    function w92(A) {
        return A.match(kg3) != null;
    }
    q92.isValidName = w92;
});
