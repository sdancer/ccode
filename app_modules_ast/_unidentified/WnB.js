// Module: WnB
// Type: U
// Lines: 282176-282209
//
var pushStartInstance = U((F9Z, InB)=>{
    var zN3 = renderElement().fromPromise, ZnB = renderElement(), YnB = qA("path"), JnB = $P(), XnB = XTA(), BnB = zN3(async function(Q) {
        let B;
        try {
            B = await ZnB.readdir(Q);
        } catch  {
            return JnB.mkdirs(Q);
        }
        return Promise.all(B.map((G)=>XnB.remove(YnB.join(Q, G))));
    });
    function GnB(A) {
        let Q;
        try {
            Q = ZnB.readdirSync(A);
        } catch  {
            return JnB.mkdirsSync(A);
        }
        Q.forEach((B)=>{
            ((B = YnB.join(A, B)), XnB.removeSync(B));
        });
    }
    InB.exports = {
        emptyDirSync: GnB,
        emptydirSync: GnB,
        emptyDir: BnB,
        emptydir: BnB
    };
});
