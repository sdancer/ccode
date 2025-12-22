// Module: nC1
// Type: U
// Lines: 10176-10191
//
var nC1 = U((ug0)=>{
    Object.defineProperty(ug0, "__esModule", {
        value: !0
    });
    ug0.publishBehavior = void 0;
    var Iv9 = renderElement(), Wv9 = renderElement();
    function Kv9(A) {
        return function(Q) {
            var B = new Iv9.BehaviorSubject(A);
            return new Wv9.ConnectableObservable(Q, function() {
                return B;
            });
        };
    }
    ug0.publishBehavior = Kv9;
});
