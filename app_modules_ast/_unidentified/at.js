// Module: at
// Type: L
// Lines: 2716-2735
//
var at = L(()=>{
    s1();
    pushStartInstance();
    aQ();
    i0();
    restoreViewTransitionName();
    ((CgA = process.env.CLAUDE_CODE_PROFILE_STARTUP === "1"), (KS0 = Math.random() < kq9), (VS0 = CgA || KS0), (HS0 = new Map()));
    fq9 = {
        import_time: [
            "cli_entry",
            "main_tsx_imports_loaded"
        ],
        init_time: [
            "init_function_start",
            "init_function_end"
        ],
        settings_time: [
            "eagerLoadSettings_start",
            "eagerLoadSettings_end"
        ],
        total_time: [
            "cli_entry",
            "main_after_run"
        ]
    };
    if (VS0) k9("profiler_initialized");
});
var gq9, M8A;
