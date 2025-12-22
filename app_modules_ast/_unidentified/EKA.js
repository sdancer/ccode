// Module: EKA
// Type: L
// Lines: 323607-323639
//
var EKA = L(()=>{
    R5();
    pE();
    g1();
    BJ();
    s1();
    A2();
    n2();
    Lo = Y0(async ()=>{
        try {
            let A = JJ();
            if (A.error) return (k(`Failed to get auth headers: ${A.error}`), null);
            let Q = await PQ.get(`${w9().BASE_API_URL}/api/claude_code_grove`, {
                headers: {
                    ...A.headers,
                    "User-Agent": Qi()
                }
            }), { grove_enabled: B, domain_excluded: G, notice_is_grace_period: Z, notice_reminder_frequency: Y } = Q.data;
            return {
                grove_enabled: B,
                domain_excluded: G ?? !1,
                notice_is_grace_period: Z ?? !0,
                notice_reminder_frequency: Y
            };
        } catch (A) {
            return (k(`Failed to fetch Grove notice config: ${A}`), null);
        }
    });
});
