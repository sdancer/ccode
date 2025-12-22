// Module: zv2
// Type: U
// Lines: 429600-429615
//
var zv2 = U((Ev2)=>{
    Object.defineProperty(Ev2, "__esModule", {
        value: !0
    });
    var zU5 = sz0(), Fv2 = renderChildrenArray();
    function CU5() {
        return typeof window < "u" && (!zU5.isNodeEnv() || $U5());
    }
    function $U5() {
        return (Fv2.GLOBAL_OBJ.process !== void 0 && Fv2.GLOBAL_OBJ.process.type === "renderer");
    }
    Ev2.isBrowser = CU5;
});
