// Module: sz0
// Type: U
// Lines: 429572-429600
//
var sz0 = U((Dv2, TI1)=>{
    Object.defineProperty(Dv2, "__esModule", {
        value: !0
    });
    var KU5 = rz0();
    function VU5() {
        return (!KU5.isBrowserBundle() && Object.prototype.toString.call(typeof process < "u" ? process : 0) === "[object process]");
    }
    function jI1(A, Q) {
        return A.require(Q);
    }
    function HU5(A) {
        let Q;
        try {
            Q = jI1(TI1, A);
        } catch (B) {}
        try {
            let { cwd: B } = jI1(TI1, "process");
            Q = jI1(TI1, `${B()}/node_modules/${A}`);
        } catch (B) {}
        return Q;
    }
    Dv2.dynamicRequire = jI1;
    Dv2.isNodeEnv = VU5;
    Dv2.loadModule = HU5;
});
