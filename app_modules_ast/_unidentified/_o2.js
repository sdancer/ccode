// Module: _o2
// Type: U
// Lines: 453278-453294
//
var renderElement = U((Mo2)=>{
    Object.defineProperty(Mo2, "__esModule", {
        value: !0
    });
    Mo2.bindAll = void 0;
    function NA7(A) {
        var Q = A.constructor.prototype;
        for(var B = 0, G = Object.getOwnPropertyNames(Q); B < G.length; B++){
            var Z = G[B];
            if (Z !== "constructor") {
                var Y = Object.getOwnPropertyDescriptor(A.constructor.prototype, Z);
                if (!!Y && typeof Y.value === "function") A[Z] = A[Z].bind(A);
            }
        }
        return A;
    }
    Mo2.bindAll = NA7;
});
