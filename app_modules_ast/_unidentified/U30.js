// Module: U30
// Type: U
// Lines: 282724-282818
//
var U30 = U((zaB)=>{
    Object.defineProperty(zaB, "__esModule", {
        value: !0
    });
    zaB.childDepType = zaB.depTypeGreater = zaB.DepType = void 0;
    var f6;
    (function(A) {
        ((A[(A.PROD = 0)] = "PROD"), (A[(A.DEV = 1)] = "DEV"), (A[(A.OPTIONAL = 2)] = "OPTIONAL"), (A[(A.DEV_OPTIONAL = 3)] = "DEV_OPTIONAL"), (A[(A.ROOT = 4)] = "ROOT"));
    })((f6 = zaB.DepType || (zaB.DepType = {})));
    var UL3 = (A, Q)=>{
        switch(Q){
            case f6.DEV:
                switch(A){
                    case f6.OPTIONAL:
                    case f6.PROD:
                    case f6.ROOT:
                        return !0;
                    case f6.DEV:
                    case f6.DEV_OPTIONAL:
                    default:
                        return !1;
                }
            case f6.DEV_OPTIONAL:
                switch(A){
                    case f6.OPTIONAL:
                    case f6.PROD:
                    case f6.ROOT:
                    case f6.DEV:
                        return !0;
                    case f6.DEV_OPTIONAL:
                    default:
                        return !1;
                }
            case f6.OPTIONAL:
                switch(A){
                    case f6.PROD:
                    case f6.ROOT:
                        return !0;
                    case f6.OPTIONAL:
                    case f6.DEV:
                    case f6.DEV_OPTIONAL:
                    default:
                        return !1;
                }
            case f6.PROD:
                switch(A){
                    case f6.ROOT:
                        return !0;
                    case f6.PROD:
                    case f6.OPTIONAL:
                    case f6.DEV:
                    case f6.DEV_OPTIONAL:
                    default:
                        return !1;
                }
            case f6.ROOT:
                switch(A){
                    case f6.ROOT:
                    case f6.PROD:
                    case f6.OPTIONAL:
                    case f6.DEV:
                    case f6.DEV_OPTIONAL:
                    default:
                        return !1;
                }
            default:
                return !1;
        }
    };
    zaB.depTypeGreater = UL3;
    var wL3 = (A, Q)=>{
        if (Q === f6.ROOT) throw Error("Something went wrong, a child dependency can't be marked as the ROOT");
        switch(A){
            case f6.ROOT:
                return Q;
            case f6.PROD:
                if (Q === f6.OPTIONAL) return f6.OPTIONAL;
                return f6.PROD;
            case f6.OPTIONAL:
                return f6.OPTIONAL;
            case f6.DEV_OPTIONAL:
                return f6.DEV_OPTIONAL;
            case f6.DEV:
                if (Q === f6.OPTIONAL) return f6.DEV_OPTIONAL;
                return f6.DEV;
        }
    };
    zaB.childDepType = wL3;
});
