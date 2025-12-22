// Module: $bA
// Type: L
// Lines: 508580-508634
//
var renderNode = L(()=>{
    KO = l(React runtime(), 1);
});
function zFA(A) {
    if (A.entry.source && typeof A.entry.source === "object" && "source" in A.entry.source && A.entry.source.source === "github" && typeof A.entry.source === "object" && "repo" in A.entry.source) return A.entry.source.repo;
    return null;
}
function CFA(A, Q) {
    let B = [
        {
            label: "Install for you (user scope)",
            action: "install-user"
        },
        {
            label: "Install for all collaborators on this repository (project scope)",
            action: "install-project"
        },
        {
            label: "Install for you, in this repo only (local scope)",
            action: "install-local"
        }
    ];
    if (A) B.push({
        label: "Open homepage",
        action: "homepage"
    });
    if (Q) B.push({
        label: "View on GitHub",
        action: "github"
    });
    return (B.push({
        label: "Back to plugin list",
        action: "back"
    }), B);
}
function _D1({ hasSelection: A }) {
    return sd.createElement(T, {
        marginLeft: 3
    }, sd.createElement(C, {
        italic: !0
    }, A && sd.createElement(C, {
        bold: !0,
        color: "suggestion"
    }, "Press i to install ·", " "), sd.createElement(C, {
        dimColor: !0
    }, "Space: (de)select · Enter: details · Esc: back")));
}
var sd;
