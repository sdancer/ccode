// Module: DL0
// Type: L
// Lines: 490088-490275
//
var trackPostpone = L(()=>{
    bA();
    ((j59 = l(React runtime(), 1)), (lfA = [
        " ",
        "▏",
        "▎",
        "▍",
        "▌",
        "▋",
        "▊",
        "▉",
        "█"
    ]));
});
function T59({ title: A, limit: Q, maxWidth: B, showTimeInReset: G = !0, extraSubtext: Z }) {
    let { utilization: Y, resets_at: J } = Q;
    if (Y === null) return null;
    let X = `${Math.floor(Y)}% used`, I;
    if (J) I = `Resets ${pAB(J, !0, G)}`;
    if (Z) if (I) I = `${Z} · ${I}`;
    else I = Z;
    let W = 50;
    if (B >= W + 12) return dB.createElement(T, {
        flexDirection: "column"
    }, dB.createElement(C, {
        bold: !0
    }, A), dB.createElement(T, {
        flexDirection: "row",
        gap: 1
    }, dB.createElement(ifA, {
        ratio: Y / 100,
        width: W,
        fillColor: "rate_limit_fill",
        emptyColor: "rate_limit_empty"
    }), dB.createElement(C, null, X)), I && dB.createElement(C, {
        dimColor: !0
    }, I));
    else return dB.createElement(T, {
        flexDirection: "column"
    }, dB.createElement(C, null, dB.createElement(C, {
        bold: !0
    }, A), I && dB.createElement(dB.Fragment, null, dB.createElement(C, null, " "), dB.createElement(C, {
        dimColor: !0
    }, "· ", I))), dB.createElement(ifA, {
        ratio: Y / 100,
        width: B,
        fillColor: "rate_limit_fill",
        emptyColor: "rate_limit_empty"
    }), dB.createElement(C, null, X));
}
function P59() {
    let [A, Q] = tDA.useState(null), [B, G] = tDA.useState(null), [Z, Y] = tDA.useState(!0), { columns: J } = HB(), X = J - 2, I = Math.min(X, 80), W = dB.useCallback(async ()=>{
        (Y(!0), G(null));
        try {
            let V = await VL0();
            Q(V);
        } catch (V) {
            t(V);
            let H = V, D = H.response?.data ? JSON.stringify(H.response.data) : void 0;
            G(D ? `Failed to load usage data: ${D}` : "Failed to load usage data");
        } finally{
            Y(!1);
        }
    }, []);
    if ((tDA.useEffect(()=>{
        W();
    }, [
        W
    ]), _1((V)=>{
        if (V === "r" && B && !Z) W();
    }), B)) return dB.createElement(T, {
        flexDirection: "column",
        marginTop: 1,
        gap: 1
    }, dB.createElement(C, {
        color: "error"
    }, "Error: ", B), dB.createElement(C, {
        dimColor: !0
    }, dB.createElement(YB, null, dB.createElement(I0, {
        shortcut: "r",
        action: "retry"
    }), dB.createElement(I0, {
        shortcut: "Esc",
        action: "cancel"
    }))));
    if (!A) return dB.createElement(T, {
        flexDirection: "column",
        marginTop: 1,
        gap: 1
    }, dB.createElement(C, {
        dimColor: !0
    }, "Loading usage data…"), dB.createElement(C, {
        dimColor: !0
    }, dB.createElement(I0, {
        shortcut: "Esc",
        action: "cancel"
    })));
    let K = [
        {
            title: "Current session",
            limit: A.five_hour
        },
        {
            title: "Current week (all models)",
            limit: A.seven_day
        },
        {
            title: "Current week (Sonnet only)",
            limit: A.seven_day_sonnet
        }
    ];
    return dB.createElement(T, {
        flexDirection: "column",
        marginTop: 1,
        gap: 1,
        width: "100%"
    }, K.some(({ limit: V })=>V) || dB.createElement(C, {
        dimColor: !0
    }, "/usage is only available for subscription plans."), K.map(({ title: V, limit: H })=>H && dB.createElement(T59, {
            key: V,
            title: V,
            limit: H,
            maxWidth: I
        })), A.extra_usage && dB.createElement(K67, {
        extraUsage: A.extra_usage,
        maxWidth: I
    }), dB.createElement(C, {
        dimColor: !0
    }, dB.createElement(I0, {
        shortcut: "Esc",
        action: "cancel"
    })));
}
function K67({ extraUsage: A, maxWidth: Q }) {
    let B = S6();
    if (!(B === "pro" || B === "max")) return !1;
    if (!A.is_enabled) {
        if (xd.isEnabled()) return dB.createElement(T, {
            flexDirection: "column"
        }, dB.createElement(C, {
            bold: !0
        }, FL0), dB.createElement(C, {
            dimColor: !0
        }, "Extra usage not enabled • /extra-usage to enable"));
        return null;
    }
    if (A.monthly_limit === null) return dB.createElement(T, {
        flexDirection: "column"
    }, dB.createElement(C, {
        bold: !0
    }, FL0), dB.createElement(C, {
        dimColor: !0
    }, "Unlimited"));
    if (typeof A.used_credits !== "number" || typeof A.utilization !== "number") return null;
    let Z = awA(A.used_credits / 100, 2), Y = awA(A.monthly_limit / 100, 2), J = new Date(), X = new Date(J.getFullYear(), J.getMonth() + 1, 1);
    return dB.createElement(T59, {
        title: FL0,
        limit: {
            utilization: A.utilization,
            resets_at: X.toISOString()
        },
        showTimeInReset: !1,
        extraSubtext: `${Z} / ${Y} spent`,
        maxWidth: Q
    });
}
var dB, tDA, FL0 = "Extra usage";
