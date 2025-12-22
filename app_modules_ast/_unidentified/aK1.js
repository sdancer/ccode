// Module: aK1
// Type: L
// Lines: 454250-454276
//
var aK1 = L(()=>{
    zyA();
    N9();
    bA();
    A2();
    trackUsedThenable();
    z4();
    i0();
    Sw0();
    A2();
    FVA();
    vz = l(React runtime(), 1);
});
async function pr2(A) {
    let { accessToken: Q, orgUUID: B } = await FP(), G = {
        ...PV(Q),
        "x-organization-uuid": B
    }, Z = `${w9().BASE_API_URL}/api/oauth/organizations/${B}/admin_requests`;
    return (await PQ.post(Z, A, {
        headers: G
    })).data;
}
async function lr2(A, Q) {
    let { accessToken: B, orgUUID: G } = await FP(), Z = {
        ...PV(B),
        "x-organization-uuid": G
    }, Y = `${w9().BASE_API_URL}/api/oauth/organizations/${G}/admin_requests/me?request_type=${A}`;
    for (let X of Q)Y += `&statuses=${X}`;
    return (await PQ.get(Y, {
        headers: Z
    })).data;
}
