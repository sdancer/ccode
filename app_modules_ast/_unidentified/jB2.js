// Module: jB2
// Type: L
// Lines: 323535-323607
//
var jB2 = L(()=>{
    BJ();
    g1();
    pushStartInstance();
    BN();
});
import * as TPA from "crypto";
function KZ0(A) {
    return A.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function TB2() {
    return KZ0(TPA.randomBytes(32));
}
function PB2(A) {
    let Q = TPA.createHash("sha256");
    return (Q.update(A), KZ0(Q.digest()));
}
function SB2() {
    return KZ0(TPA.randomBytes(32));
}
var yB2 = ()=>{};
async function DKA() {
    try {
        let A = JJ();
        if (A.error) return (k(`Failed to get auth headers: ${A.error}`), null);
        return (await PQ.get(`${w9().BASE_API_URL}/api/oauth/account/settings`, {
            headers: {
                ...A.headers,
                "User-Agent": YW()
            }
        })).data;
    } catch (A) {
        return (t(A), null);
    }
}
async function VZ0() {
    try {
        let A = JJ();
        if (A.error) return;
        await PQ.post(`${w9().BASE_API_URL}/api/oauth/account/grove_notice_viewed`, {}, {
            headers: {
                ...A.headers,
                "User-Agent": YW()
            }
        });
    } catch (A) {
        t(A);
    }
}
async function j51(A) {
    try {
        let Q = JJ();
        if (Q.error) {
            k(`Failed to get auth headers: ${Q.error}`);
            return;
        }
        await PQ.patch(`${w9().BASE_API_URL}/api/oauth/account/settings`, {
            grove_enabled: A
        }, {
            headers: {
                ...Q.headers,
                "User-Agent": YW()
            }
        });
    } catch (Q) {
        t(Q);
    }
}
async function FKA() {
    if (!PaA()) return !1;
    let A = await Lo();
    return A !== null && A.grove_enabled;
}
var Lo;
