// Module: ZH0
// Type: U
// Lines: 384006-384049
//
var ZH0 = U((CG5, R$)=>{
    var zq2 = aw2(), zG5 = renderElement();
    function GH0(A, Q) {
        return function() {
            throw Error("Function yaml." + A + " is removed in js-yaml 4. Use yaml." + Q + " instead, which is now safe by default.");
        };
    }
    CG5.Type = Ez();
    CG5.Schema = yV0();
    CG5.FAILSAFE_SCHEMA = fV0();
    CG5.JSON_SCHEMA = FY1();
    CG5.CORE_SCHEMA = FY1();
    CG5.DEFAULT_SCHEMA = EY1();
    CG5.load = zq2.load;
    CG5.loadAll = zq2.loadAll;
    CG5.dump = zG5.dump;
    CG5.YAMLException = cVA();
    CG5.types = {
        binary: pV0(),
        float: uV0(),
        map: kV0(),
        null: bV0(),
        pairs: iV0(),
        set: nV0(),
        timestamp: mV0(),
        bool: updateValueIfChanged(),
        int: gV0(),
        merge: dV0(),
        omap: retryNode(),
        seq: vV0(),
        str: xV0()
    };
    CG5.safeLoad = GH0("safeLoad", "load");
    CG5.safeLoadAll = GH0("safeLoadAll", "loadAll");
    CG5.safeDump = GH0("safeDump", "dump");
});
