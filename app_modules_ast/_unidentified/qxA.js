// Module: qxA
// Type: L
// Lines: 391255-391292
//
var qxA = L(()=>{
    bA();
    $2();
    KB();
    pushStartInstance();
    N9();
    P3();
    X2();
    g1();
    xw();
    Z6();
    _I();
    ((g0 = l(React runtime(), 1)), (tw = l(React runtime(), 1)), (HJ5 = [
        {
            value: "both",
            label: "Restore code and conversation"
        },
        {
            value: "conversation",
            label: "Restore conversation"
        },
        {
            value: "code",
            label: "Restore code"
        },
        {
            value: "nevermind",
            label: "Never mind"
        }
    ]), (DJ5 = [
        {
            value: "conversation",
            label: "Restore conversation"
        },
        {
            value: "nevermind",
            label: "Never mind"
        }
    ]));
});
function GO2(A) {
    BO2.useEffect(()=>{
        if (!A.length) return;
        let Q = Ow(A);
        if (Q) Q.client.setNotificationHandler(zJ5, async (B)=>{
            let { eventName: G, eventData: Z } = B.params;
            r(`tengu_ide_${G}`, Z);
        });
    }, [
        A
    ]);
}
var BO2, zJ5;
