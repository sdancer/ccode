// Module: ka1
// Type: U
// Lines: 216915-216965
//
var ka1 = U((jzB)=>{
    Object.defineProperty(jzB, "__esModule", {
        value: !0
    });
    jzB.GCE_LINUX_BIOS_PATHS = void 0;
    jzB.isGoogleCloudServerless = OzB;
    jzB.isGoogleComputeEngineLinux = MzB;
    jzB.isGoogleComputeEngineMACAddress = RzB;
    jzB.isGoogleComputeEngine = _zB;
    jzB.detectGCPResidency = ad8;
    var NzB = qA("fs"), LzB = qA("os");
    jzB.GCE_LINUX_BIOS_PATHS = {
        BIOS_DATE: "/sys/class/dmi/id/bios_date",
        BIOS_VENDOR: "/sys/class/dmi/id/bios_vendor"
    };
    var nd8 = /^42:01/;
    function OzB() {
        return !!(process.env.CLOUD_RUN_JOB || process.env.FUNCTION_NAME || process.env.K_SERVICE);
    }
    function MzB() {
        if ((0, LzB.platform)() !== "linux") return !1;
        try {
            (0, NzB.statSync)(jzB.GCE_LINUX_BIOS_PATHS.BIOS_DATE);
            let A = (0, NzB.readFileSync)(jzB.GCE_LINUX_BIOS_PATHS.BIOS_VENDOR, "utf8");
            return /Google/.test(A);
        } catch (A) {
            return !1;
        }
    }
    function RzB() {
        let A = (0, LzB.networkInterfaces)();
        for (let Q of Object.values(A)){
            if (!Q) continue;
            for (let { mac: B } of Q)if (nd8.test(B)) return !0;
        }
        return !1;
    }
    function _zB() {
        return MzB() || RzB();
    }
    function ad8() {
        return OzB() || _zB();
    }
});
