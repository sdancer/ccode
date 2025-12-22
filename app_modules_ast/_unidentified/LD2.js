// Module: LD2
// Type: L
// Lines: 364792-364814
//
var LD2 = L(()=>{
    v2();
    ((JUZ = u.object({
        checksum: u.string(),
        version: u.string().optional()
    })), (ND2 = u.object({
        uuid: u.string(),
        checksum: u.string(),
        settings: u.record(u.unknown())
    })));
});
function HVA({ title: A, subtitle: Q, color: B = "permission" }) {
    return hm.createElement(T, {
        flexDirection: "column"
    }, hm.createElement(T, {
        flexDirection: "row",
        gap: 1
    }, hm.createElement(C, {
        bold: !0,
        color: B
    }, A), Q !== void 0 && hm.createElement(C, {
        wrap: "truncate-start"
    }, Q)));
}
var hm;
