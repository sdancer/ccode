// Module: U19
// Type: L
// Lines: 470451-470475
//
var preload = L(()=>{
    bA();
    $19();
    CfA = l(React runtime(), 1);
});
function q19() {
    let { addNotification: A } = z5();
    w19.useEffect(()=>{
        zf().then((Q)=>{
            Q.forEach((B, G)=>{
                let Z = "low";
                if (B.type === "error" || B.userActionRequired) Z = "high";
                else if (B.type === "path" || B.type === "alias") Z = "medium";
                A({
                    key: `install-message-${G}-${B.type}`,
                    text: B.message,
                    priority: Z,
                    color: B.type === "error" ? "error" : "warning"
                });
            });
        });
    }, [
        A
    ]);
}
var w19;
