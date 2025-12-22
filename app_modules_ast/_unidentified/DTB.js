// Module: DTB
// Type: L
// Lines: 240421-240428
//
var DTB = L(()=>{
    jB3 = RB3(_B3);
});
async function WA0(A) {
    return HTB(`tell application "Finder" to set app_path to application file id "${A}" as string
tell application "System Events" to get value of property list item "CFBundleName" of property list file (app_path & ":Contents:Info.plist")`);
}
