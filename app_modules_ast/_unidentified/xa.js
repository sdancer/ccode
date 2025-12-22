// Module: xa
// Type: U
// Lines: 281514-281524
//
var xa = U((J9Z, RiB)=>{
    var Lq3 = renderElement().fromPromise, MiB = renderElement();
    function Oq3(A) {
        return MiB.access(A).then(()=>!0).catch(()=>!1);
    }
    RiB.exports = {
        pathExists: Lq3(Oq3),
        pathExistsSync: MiB.existsSync
    };
});
