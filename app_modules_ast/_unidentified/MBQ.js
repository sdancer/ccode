// Module: MBQ
// Type: U
// Lines: 57242-57261
//
var MBQ = U((LBQ)=>{
    Object.defineProperty(LBQ, "__esModule", {
        value: !0
    });
    LBQ.UPDATE_DETAIL_ERROR_MESSAGES = LBQ.createUpdateDetails = void 0;
    var k24 = (A, Q, B, G, Z, Y)=>{
        return {
            duration: B,
            source: Q,
            success: A,
            error: G,
            sourceUrl: Z,
            warnings: Y
        };
    };
    LBQ.createUpdateDetails = k24;
    LBQ.UPDATE_DETAIL_ERROR_MESSAGES = {
        NO_NETWORK_DATA: "No data was returned from the network. This may be due to a network timeout if a timeout value was specified in the options or ad blocker error."
    };
});
