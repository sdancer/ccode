// Module: Mq2
// Type: U
// Lines: 384104-384134
//
var Mq2 = U((WyZ, Oq2)=>{
    var hG5 = qA("fs"), { ono: YH0 } = renderChildrenArray(), Lq2 = V_(), { ResolverError: JH0 } = describeNativeComponentFrame();
    Oq2.exports = {
        order: 100,
        canRead (A) {
            return Lq2.isFileSystemPath(A.url);
        },
        read (A) {
            return new Promise((Q, B)=>{
                let G;
                try {
                    G = Lq2.toFileSystemPath(A.url);
                } catch (Z) {
                    B(new JH0(YH0.uri(Z, `Malformed URI: ${A.url}`), A.url));
                }
                try {
                    hG5.readFile(G, (Z, Y)=>{
                        if (Z) B(new JH0(YH0(Z, `Error opening file "${G}"`), G));
                        else Q(Y);
                    });
                } catch (Z) {
                    B(new JH0(YH0(Z, `Error opening file "${G}"`), G));
                }
            });
        }
    };
});
