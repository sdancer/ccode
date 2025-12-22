// Module: S49
// Type: L
// Lines: 476081-476105
//
var preload = L(()=>{
    cV();
    mX();
    pushStartInstance();
    $2();
    PfA = l(React runtime(), 1);
});
function x49() {
    let { addNotification: A } = z5();
    y49.useEffect(()=>{
        let B = v1().sonnet45MigrationTimestamp;
        if (B) {
            if (Date.now() - B < 3000) A({
                key: "sonnet-4.5-update",
                text: "Model updated to Sonnet 4.5",
                color: "suggestion",
                priority: "high",
                timeoutMs: 3000
            });
        }
    }, [
        A
    ]);
}
var y49;
