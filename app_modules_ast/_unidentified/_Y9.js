// Module: _Y9
// Type: U
// Lines: 500070-500078
//
var _Y9 = U((N77)=>{
    var w77 = useActionState(), q77 = useActionState();
    N77.render = function(A, Q, B) {
        if (Q && Q.small) return q77.render(A, Q, B);
        return w77.render(A, Q, B);
    };
});
