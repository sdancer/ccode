// Module: xzA
// Type: U
// Lines: 55585-55597
//
var xzA = U((l0Q)=>{
    Object.defineProperty(l0Q, "__esModule", {
        value: !0
    });
    l0Q.StatsigMetadataProvider = l0Q.SDK_VERSION = void 0;
    l0Q.SDK_VERSION = "3.12.1";
    var xq1 = {
        sdkVersion: l0Q.SDK_VERSION,
        sdkType: "js-mono"
    };
    l0Q.StatsigMetadataProvider = {
        get: ()=>xq1,
        add: (A)=>{
            xq1 = Object.assign(Object.assign({}, xq1), A);
        }
    };
});
