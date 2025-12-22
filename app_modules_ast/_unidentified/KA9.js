// Module: KA9
// Type: L
// Lines: 467041-467057
//
var KA9 = L(()=>{
    TZ();
    A2();
    WfA = l(React runtime(), 1);
});
function HA9(A) {
    let [Q, B] = IQ();
    _1((G, Z)=>{
        if (Z.ctrl && G === "t") (r("tengu_toggle_todos", {
            is_expanded: Q.showExpandedTodos,
            has_todos: A && A.length > 0
        }), B((Y)=>({
                ...Y,
                showExpandedTodos: !Y.showExpandedTodos
            })));
    });
}
