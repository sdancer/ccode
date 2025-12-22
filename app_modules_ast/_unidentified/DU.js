// Module: DU
// Type: U
// Lines: 5988-6009
//
var trackPostpone = U((Jv0)=>{
    Object.defineProperty(Jv0, "__esModule", {
        value: !0
    });
    Jv0.popNumber = Jv0.popScheduler = Jv0.popResultSelector = void 0;
    var AM9 = renderElement(), QM9 = hEA();
    function Rz1(A) {
        return A[A.length - 1];
    }
    function BM9(A) {
        return AM9.isFunction(Rz1(A)) ? A.pop() : void 0;
    }
    Jv0.popResultSelector = BM9;
    function GM9(A) {
        return QM9.isScheduler(Rz1(A)) ? A.pop() : void 0;
    }
    Jv0.popScheduler = GM9;
    function ZM9(A, Q) {
        return typeof Rz1(A) === "number" ? A.pop() : Q;
    }
    Jv0.popNumber = ZM9;
});
