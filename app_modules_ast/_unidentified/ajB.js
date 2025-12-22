// Module: ajB
// Type: L
// Lines: 239870-239904
//
var ajB = L(()=>{
    _G();
    et1();
    zXA();
    uMA();
    IB1();
    njB();
    describeObjectForErrorMessage();
    DJ();
    yQ1();
    /*! @azure/msal-node v3.8.1 2025-10-29 */ JB3 = [
        H6.SERVICE_FABRIC
    ];
});
class re1 {
    constructor(A, Q){
        ((this.client = A), (this.partitionManager = Q));
    }
    async beforeCacheAccess(A) {
        let Q = await this.partitionManager.getKey(), B = await this.client.get(Q);
        A.tokenCache.deserialize(B);
    }
    async afterCacheAccess(A) {
        if (A.cacheHasChanged) {
            let Q = A.tokenCache.getKVStore(), B = Object.values(Q).filter((Z)=>jK.isAccountEntity(Z)), G;
            if (B.length > 0) {
                let Z = B[0];
                G = await this.partitionManager.extractKey(Z);
            } else G = await this.partitionManager.getKey();
            await this.client.set(G, A.tokenCache.serialize());
        }
    }
}
