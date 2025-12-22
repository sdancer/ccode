// Module: Us2
// Type: L
// Lines: 460365-460401
//
var Us2 = L(()=>{
    bA();
    I_();
    KB();
    $4A = l(React runtime(), 1);
});
function U4A({ addMargin: A, param: Q, verbose: B, thinkingMetadata: G }) {
    if (Q.text.trim() === FL) return null;
    if (Q.text.startsWith("<bash-stdout") || Q.text.startsWith("<bash-stderr")) return zY.createElement(Vs2, {
        content: Q.text,
        verbose: B
    });
    if (Q.text.startsWith("<background-task-output>")) return zY.createElement(Es2, {
        content: Q.text
    });
    if (Q.text.startsWith("<local-command-stdout") || Q.text.startsWith("<local-command-stderr")) return zY.createElement(Ds2, {
        content: Q.text
    });
    if (Q.text === LDA || Q.text === E_) return zY.createElement(b0, {
        height: 1
    }, zY.createElement(hv, null));
    if (Q.text.includes("<bash-input>")) return zY.createElement(oK1, {
        addMargin: A,
        param: Q
    });
    if (Q.text.includes("<background-task-input>")) return zY.createElement(C4A, {
        addMargin: A,
        param: Q
    });
    if (Q.text.includes("<command-message>")) return zY.createElement(tr2, {
        addMargin: A,
        param: Q
    });
    if (Q.text.includes("<user-memory-input>")) return zY.createElement(Is2, {
        addMargin: A,
        text: Q.text
    });
    if (Q.text.includes("<teammate-message")) return zY.createElement(Cs2, {
        addMargin: A,
        param: Q
    });
    if (Q.text.includes("<agent-notification")) return zY.createElement(bw0, {
        addMargin: A,
        param: Q
    });
    if (Q.text.includes("<bash-notification")) return zY.createElement(bw0, {
        addMargin: A,
        param: Q
    });
    return zY.createElement(Gs2, {
        addMargin: A,
        param: Q,
        thinkingMetadata: G
    });
}
var zY;
