// Module: hg2
// Type: U
// Lines: 436978-437008
//
var hg2 = U((bg2, Bs)=>{
    Object.defineProperty(bg2, "__esModule", {
        value: !0
    });
    var l9A = FQ(), Kb5 = [
        ()=>{
            return new (l9A.dynamicRequire(Bs, "./apollo").Apollo)();
        },
        ()=>{
            return new (l9A.dynamicRequire(Bs, "./apollo").Apollo)({
                useNestjs: !0
            });
        },
        ()=>{
            return new (l9A.dynamicRequire(Bs, "./graphql").GraphQL)();
        },
        ()=>{
            return new (l9A.dynamicRequire(Bs, "./mongo").Mongo)();
        },
        ()=>{
            return new (l9A.dynamicRequire(Bs, "./mongo").Mongo)({
                mongoose: !0
            });
        },
        ()=>{
            return new (l9A.dynamicRequire(Bs, "./mysql").Mysql)();
        },
        ()=>{
            return new (l9A.dynamicRequire(Bs, "./postgres").Postgres)();
        }
    ];
    bg2.lazyLoadedNodePerformanceMonitoringIntegrations = Kb5;
});
