// Module: _y0
// Type: U
// Lines: 3714-3737
//
var _y0 = U((My0)=>{
    Object.defineProperty(My0, "__esModule", {
        value: !0
    });
    My0.createNotification = My0.nextNotification = My0.errorNotification = My0.COMPLETE_NOTIFICATION = void 0;
    My0.COMPLETE_NOTIFICATION = (function() {
        return PgA("C", void 0, void 0);
    })();
    function rN9(A) {
        return PgA("E", void 0, A);
    }
    My0.errorNotification = rN9;
    function sN9(A) {
        return PgA("N", A, void 0);
    }
    My0.nextNotification = sN9;
    function PgA(A, Q, B) {
        return {
            kind: A,
            value: Q,
            error: B
        };
    }
    My0.createNotification = PgA;
});
