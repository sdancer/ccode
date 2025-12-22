// Module: sC2
// Type: L
// Lines: 378383-378408
//
var sC2 = L(()=>{
    pushStartInstance();
    rC2 = `Performs exact string replacements in files. 

Usage:
- You must use your \`${y8}\` tool at least once in the conversation before editing. This tool will error if you attempt an edit without reading the file. 
- When editing text from Read tool output, ensure you preserve the exact indentation (tabs/spaces) as it appears AFTER the line number prefix. The line number prefix format is: spaces + line number + tab. Everything after that tab is the actual file content to match. Never include any part of the line number prefix in the old_string or new_string.
- ALWAYS prefer editing existing files in the codebase. NEVER write new files unless explicitly required.
- Only use emojis if the user explicitly requests it. Avoid adding emojis to files unless asked.
- The edit will FAIL if \`old_string\` is not unique in the file. Either provide a larger string with more surrounding context to make it unique or use \`replace_all\` to change every instance of \`old_string\`. 
- Use \`replace_all\` for replacing and renaming strings across the file. This parameter is useful if you want to rename a variable for instance.`;
});
function tC2(A) {
    let Q = i65.find((G)=>G.matches(A));
    if (!Q) return null;
    let B = {
        ...Q.tip
    };
    if (A.code === "invalid_enum_value" && A.enumValues && !B.suggestion) B.suggestion = `Valid values: ${A.enumValues.map((G)=>`"${G}"`).join(", ")}`;
    if (!B.docLink && A.path) {
        let G = A.path.split(".")[0];
        if (G) B.docLink = n65[G];
    }
    return B;
}
var i65, n65;
