// Module: Fb0
// Type: U
// Lines: 8181-8202
//
var Fb0 = U((Hb0)=>{
    Object.defineProperty(Hb0, "__esModule", {
        value: !0
    });
    Hb0.using = void 0;
    var _T9 = zZ(), jT9 = renderElement(), TT9 = wj();
    function PT9(A, Q) {
        return new _T9.Observable(function(B) {
            var G = A(), Z = Q(G), Y = Z ? jT9.innerFrom(Z) : TT9.EMPTY;
            return (Y.subscribe(B), function() {
                if (G) G.unsubscribe();
            });
        });
    }
    Hb0.using = PT9;
});
