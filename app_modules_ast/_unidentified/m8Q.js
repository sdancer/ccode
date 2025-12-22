// Module: m8Q
// Type: U
// Lines: 67575-67583
//
var renderElement = U((u8Q)=>{
    Object.defineProperty(u8Q, "__esModule", {
        value: !0
    });
    u8Q.splitStream = BY4;
    async function BY4(A) {
        if (typeof A.stream === "function") A = A.stream();
        return A.tee();
    }
});
