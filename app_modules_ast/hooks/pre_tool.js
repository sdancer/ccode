// Module: pJ9
// Type: L
// Lines: 503363-503514
//
var pJ9 = L(()=>{
    UD1();
    EKA();
    pushStartInstance();
    A2();
    ((DbA = l(React runtime(), 1)), (aG7 = {
        type: "local-jsx",
        name: "privacy-settings",
        description: "View and update your privacy settings",
        isEnabled: ()=>{
            return PaA();
        },
        isHidden: !1,
        async call (A) {
            if (!(await FKA())) return (A(dJ9), null);
            let [B, G] = await Promise.all([
                DKA(),
                Lo()
            ]);
            if (B === null) return (A(dJ9), null);
            async function Z(J) {
                if (J === "escape" || J === "defer") {
                    A("Privacy settings dialog dismissed", {
                        display: "system"
                    });
                    return;
                }
                await Y();
            }
            async function Y() {
                let J = await DKA();
                if (J === null) {
                    A("Unable to retrieve updated privacy settings", {
                        display: "system"
                    });
                    return;
                }
                let X = J.grove_enabled ? "true" : "false";
                if ((A(`"Help improve Claude" set to ${X}.`), B !== null && B.grove_enabled !== null && B.grove_enabled !== J.grove_enabled)) r("tengu_grove_policy_toggled", {
                    state: J.grove_enabled,
                    location: "settings"
                });
            }
            if (B.grove_enabled !== null) return DbA.createElement(uJ9, {
                settings: B,
                domainExcluded: G?.domain_excluded,
                onDone: Y
            });
            return DbA.createElement($D1, {
                showIfAlreadyViewed: !0,
                onDone: Z,
                location: "settings"
            });
        },
        userFacingName () {
            return "privacy-settings";
        }
    }), (cJ9 = aG7));
});
function lJ9({ event: A, eventSummary: Q, config: B, matcher: G, onSuccess: Z, onCancel: Y }) {
    let [J, X] = GM0.useState(!1), [I, W] = GM0.useState(null), K = VFA.map(ZM0), V = async (H)=>{
        (X(!0), W(null));
        try {
            (await nJ9(A, B, G, H), Z());
        } catch (D) {
            (W(D instanceof Error ? D.message : "Failed to add hook"), X(!1));
        }
    };
    if (J) return T7.createElement(T, {
        flexDirection: "column",
        gap: 1
    }, T7.createElement(T, {
        flexDirection: "row",
        gap: 1
    }, T7.createElement(R9, null), T7.createElement(C, null, "Adding hook configuration...")));
    if (I) return T7.createElement(T, {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "error"
    }, T7.createElement(C, {
        bold: !0,
        color: "error"
    }, "Failed to add hook"), T7.createElement(C, null, I), T7.createElement(T0, {
        options: [
            {
                label: "OK",
                value: "ok"
            }
        ],
        onChange: Y,
        onCancel: Y
    }));
    return T7.createElement(T, {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "success"
    }, T7.createElement(C, {
        bold: !0,
        color: "success"
    }, "Save hook configuration"), T7.createElement(T, {
        flexDirection: "column",
        marginX: 2
    }, T7.createElement(C, null, "Event: ", A, " - ", Q), T7.createElement(C, null, "Matcher: ", G), T7.createElement(C, null, B.type === "command" ? "Command" : "Prompt", ":", " ", c$(B))), T7.createElement(C, null, "Where should this hook be saved?"), T7.createElement(T0, {
        options: K,
        onChange: (H)=>V(H),
        onCancel: Y,
        visibleOptionCount: 3
    }));
}
var T7, GM0;
