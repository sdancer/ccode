// Module: pE
// Type: L
// Lines: 133143-133173
//
var pE = L(()=>{
    A2();
    BJ();
});
function zoA(A) {
    try {
        let Q = String(A), B = process.platform === "win32" ? `powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \\"ProcessId=${Q}\\").ParentProcessId"` : `ps -o ppid= -p ${Q}`, G = lZ(B, {
            timeout: 1000
        });
        return G ? G.trim() : null;
    } catch  {
        return null;
    }
}
function CoA(A) {
    try {
        let Q = String(A), B = process.platform === "win32" ? `powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \\"ProcessId=${Q}\\").CommandLine"` : `ps -o command= -p ${Q}`, G = lZ(B, {
            timeout: 1000
        });
        return G ? G.trim() : null;
    } catch  {
        return null;
    }
}
