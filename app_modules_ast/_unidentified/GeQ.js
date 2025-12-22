// Module: GeQ
// Type: U
// Lines: 132013-132030
//
var GeQ = U((QeQ)=>{
    Object.defineProperty(QeQ, "__esModule", {
        value: !0
    });
    QeQ.getMachineId = void 0;
    var PK8 = qA("fs"), SK8 = f9();
    async function yK8() {
        let A = [
            "/etc/machine-id",
            "/var/lib/dbus/machine-id"
        ];
        for (let Q of A)try {
            return (await PK8.promises.readFile(Q, {
                encoding: "utf8"
            })).trim();
        } catch (B) {
            SK8.diag.debug(`error reading machine id: ${B}`);
        }
        return;
    }
    QeQ.getMachineId = yK8;
});
