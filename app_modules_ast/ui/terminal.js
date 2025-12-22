// Module: tN0
// Type: L
// Lines: 485112-485919
//
var createRenderState = L(()=>{
    Aq();
    lD();
    parsePattern();
    vD0();
    L3();
    ((R39 = /^-[a-zA-Z0-9_-]/), (yH1 = {
        "--all": "none",
        "--branches": "none",
        "--tags": "none",
        "--remotes": "none"
    }), (aN0 = {
        "--since": "string",
        "--after": "string",
        "--until": "string",
        "--before": "string"
    }), (xH1 = {
        "--oneline": "none",
        "--graph": "none",
        "--decorate": "none",
        "--no-decorate": "none",
        "--date": "string",
        "--relative-date": "none"
    }), (oN0 = {
        "--max-count": "number",
        "-n": "number"
    }), (rN0 = {
        "--stat": "none",
        "--numstat": "none",
        "--shortstat": "none",
        "--name-only": "none",
        "--name-status": "none"
    }), (sN0 = {
        "--color": "none",
        "--no-color": "none"
    }), (_39 = {
        "--patch": "none",
        "-p": "none",
        "--no-patch": "none",
        "--no-ext-diff": "none",
        "-s": "none"
    }), (j39 = {
        "--author": "string",
        "--committer": "string",
        "--grep": "string"
    }), (T39 = {
        xargs: {
            safeFlags: {
                "-I": "{}",
                "-i": "none",
                "-n": "number",
                "-P": "number",
                "-L": "number",
                "-s": "number",
                "-E": "EOF",
                "-e": "EOF",
                "-0": "none",
                "-t": "none",
                "-r": "none",
                "-x": "none",
                "-d": "char"
            }
        },
        "git diff": {
            safeFlags: {
                ...rN0,
                ...sN0,
                "--dirstat": "none",
                "--summary": "none",
                "--patch-with-stat": "none",
                "--word-diff": "none",
                "--word-diff-regex": "string",
                "--color-words": "none",
                "--no-renames": "none",
                "--no-ext-diff": "none",
                "--check": "none",
                "--ws-error-highlight": "string",
                "--full-index": "none",
                "--binary": "none",
                "--abbrev": "number",
                "--break-rewrites": "none",
                "--find-renames": "none",
                "--find-copies": "none",
                "--find-copies-harder": "none",
                "--irreversible-delete": "none",
                "--diff-algorithm": "string",
                "--histogram": "none",
                "--patience": "none",
                "--minimal": "none",
                "--ignore-space-at-eol": "none",
                "--ignore-space-change": "none",
                "--ignore-all-space": "none",
                "--ignore-blank-lines": "none",
                "--inter-hunk-context": "number",
                "--function-context": "none",
                "--exit-code": "none",
                "--quiet": "none",
                "--cached": "none",
                "--staged": "none",
                "--pickaxe-regex": "none",
                "--pickaxe-all": "none",
                "--no-index": "none",
                "--relative": "string",
                "--diff-filter": "string",
                "-p": "none",
                "-u": "none",
                "-s": "none",
                "-M": "none",
                "-C": "none",
                "-B": "none",
                "-D": "none",
                "-l": "none",
                "-S": "none",
                "-G": "none",
                "-O": "none",
                "-R": "none"
            }
        },
        "git log": {
            safeFlags: {
                ...xH1,
                ...yH1,
                ...aN0,
                ...oN0,
                ...rN0,
                ...sN0,
                ..._39,
                ...j39,
                "--abbrev-commit": "none",
                "--full-history": "none",
                "--dense": "none",
                "--sparse": "none",
                "--simplify-merges": "none",
                "--ancestry-path": "none",
                "--source": "none",
                "--first-parent": "none",
                "--merges": "none",
                "--no-merges": "none",
                "--reverse": "none",
                "--walk-reflogs": "none",
                "--skip": "number",
                "--max-age": "number",
                "--min-age": "number",
                "--no-min-parents": "none",
                "--no-max-parents": "none",
                "--follow": "none",
                "--pretty": "string",
                "--format": "string",
                "--diff-filter": "string",
                "-S": "string",
                "-G": "string",
                "--pickaxe-regex": "none",
                "--pickaxe-all": "none"
            }
        },
        "git show": {
            safeFlags: {
                ...xH1,
                ...rN0,
                ...sN0,
                ..._39,
                "--abbrev-commit": "none",
                "--word-diff": "none",
                "--word-diff-regex": "string",
                "--color-words": "none",
                "--pretty": "string",
                "--first-parent": "none",
                "--diff-filter": "string",
                "-m": "none",
                "--quiet": "none"
            }
        },
        "git shortlog": {
            safeFlags: {
                ...yH1,
                ...aN0,
                "-s": "none",
                "--summary": "none",
                "-n": "none",
                "--numbered": "none",
                "-e": "none",
                "--email": "none",
                "-c": "none",
                "--committer": "none",
                "--group": "string",
                "--format": "string",
                "--no-merges": "none",
                "--author": "string"
            }
        },
        "git reflog": {
            safeFlags: {
                ...xH1,
                ...yH1,
                ...aN0,
                ...oN0,
                ...j39
            }
        },
        "git stash list": {
            safeFlags: {
                ...xH1,
                ...yH1,
                ...oN0
            }
        },
        "git ls-remote": {
            safeFlags: {
                "--branches": "none",
                "-b": "none",
                "--tags": "none",
                "-t": "none",
                "--heads": "none",
                "-h": "none",
                "--refs": "none",
                "--quiet": "none",
                "-q": "none",
                "--exit-code": "none",
                "--get-url": "none",
                "--symref": "none",
                "--sort": "string",
                "--server-option": "string",
                "-o": "string"
            }
        },
        file: {
            safeFlags: {
                "--brief": "none",
                "-b": "none",
                "--mime": "none",
                "-i": "none",
                "--mime-type": "none",
                "--mime-encoding": "none",
                "--apple": "none",
                "--check-encoding": "none",
                "-c": "none",
                "--exclude": "string",
                "--exclude-quiet": "string",
                "--print0": "none",
                "-0": "none",
                "-f": "string",
                "-F": "string",
                "--separator": "string",
                "--help": "none",
                "--version": "none",
                "-v": "none",
                "--no-dereference": "none",
                "-h": "none",
                "--dereference": "none",
                "-L": "none",
                "--magic-file": "string",
                "-m": "string",
                "--keep-going": "none",
                "-k": "none",
                "--list": "none",
                "-l": "none",
                "--no-buffer": "none",
                "-n": "none",
                "--preserve-date": "none",
                "-p": "none",
                "--raw": "none",
                "-r": "none",
                "-s": "none",
                "--special-files": "none",
                "--uncompress": "none",
                "-z": "none"
            }
        },
        sed: {
            safeFlags: {
                "--expression": "string",
                "-e": "string",
                "--quiet": "none",
                "--silent": "none",
                "-n": "none",
                "--regexp-extended": "none",
                "-r": "none",
                "--posix": "none",
                "-E": "none",
                "--line-length": "number",
                "-l": "number",
                "--zero-terminated": "none",
                "-z": "none",
                "--separate": "none",
                "-s": "none",
                "--unbuffered": "none",
                "-u": "none",
                "--debug": "none",
                "--help": "none",
                "--version": "none"
            },
            additionalCommandIsDangerousCallback: (A)=>!xD0(A)
        },
        "pip list": {
            safeFlags: {
                "--outdated": "none",
                "-o": "none",
                "--uptodate": "none",
                "-u": "none",
                "--editable": "none",
                "-e": "none",
                "--local": "none",
                "-l": "none",
                "--user": "none",
                "--pre": "none",
                "--format": "string",
                "--not-required": "none",
                "--exclude-editable": "none",
                "--include-editable": "none",
                "--exclude": "string",
                "--help": "none",
                "-h": "none",
                "--version": "none",
                "-V": "none",
                "--verbose": "none",
                "-v": "none",
                "--quiet": "none",
                "-q": "none",
                "--no-color": "none",
                "--no-input": "none",
                "--disable-pip-version-check": "none",
                "--no-python-version-warning": "none"
            }
        },
        sort: {
            safeFlags: {
                "--ignore-leading-blanks": "none",
                "-b": "none",
                "--dictionary-order": "none",
                "-d": "none",
                "--ignore-case": "none",
                "-f": "none",
                "--general-numeric-sort": "none",
                "-g": "none",
                "--human-numeric-sort": "none",
                "-h": "none",
                "--ignore-nonprinting": "none",
                "-i": "none",
                "--month-sort": "none",
                "-M": "none",
                "--numeric-sort": "none",
                "-n": "none",
                "--random-sort": "none",
                "-R": "none",
                "--reverse": "none",
                "-r": "none",
                "--sort": "string",
                "--stable": "none",
                "-s": "none",
                "--unique": "none",
                "-u": "none",
                "--version-sort": "none",
                "-V": "none",
                "--zero-terminated": "none",
                "-z": "none",
                "--key": "string",
                "-k": "string",
                "--field-separator": "string",
                "-t": "string",
                "--check": "none",
                "-c": "none",
                "--check-char-order": "none",
                "-C": "none",
                "--merge": "none",
                "-m": "none",
                "--buffer-size": "string",
                "-S": "string",
                "--parallel": "number",
                "--batch-size": "number",
                "--help": "none",
                "--version": "none"
            }
        },
        man: {
            safeFlags: {
                "-a": "none",
                "--all": "none",
                "-d": "none",
                "-f": "none",
                "--whatis": "none",
                "-h": "none",
                "-k": "none",
                "--apropos": "none",
                "-l": "string",
                "-w": "none",
                "-S": "string",
                "-s": "string"
            }
        },
        help: {
            safeFlags: {
                "-d": "none",
                "-m": "none",
                "-s": "none"
            }
        },
        "npm list": {
            safeFlags: {
                "--all": "none",
                "-a": "none",
                "--json": "none",
                "--long": "none",
                "-l": "none",
                "--global": "none",
                "-g": "none",
                "--depth": "number",
                "--omit": "string",
                "--include": "string",
                "--link": "none",
                "--workspace": "string",
                "-w": "string",
                "--workspaces": "none",
                "-ws": "none"
            }
        },
        "mcp-cli servers": {
            safeFlags: {
                "--json": "none"
            }
        },
        "mcp-cli tools": {
            safeFlags: {
                "--json": "none"
            }
        },
        "mcp-cli info": {
            safeFlags: {
                "--json": "none"
            }
        },
        "mcp-cli grep": {
            safeFlags: {
                "--json": "none",
                "-i": "none",
                "--ignore-case": "none"
            }
        },
        "mcp-cli resources": {
            safeFlags: {
                "--json": "none"
            }
        },
        "mcp-cli read": {
            safeFlags: {
                "--json": "none"
            }
        },
        netstat: {
            safeFlags: {
                "-a": "none",
                "-L": "none",
                "-l": "none",
                "-n": "none",
                "-f": "string",
                "-g": "none",
                "-i": "none",
                "-I": "string",
                "-s": "none",
                "-r": "none",
                "-m": "none",
                "-v": "none"
            }
        },
        ps: {
            safeFlags: {
                "-e": "none",
                "-A": "none",
                "-a": "none",
                "-d": "none",
                "-N": "none",
                "--deselect": "none",
                "-f": "none",
                "-F": "none",
                "-l": "none",
                "-j": "none",
                "-y": "none",
                "-w": "none",
                "-ww": "none",
                "--width": "number",
                "-c": "none",
                "-H": "none",
                "--forest": "none",
                "--headers": "none",
                "--no-headers": "none",
                "-n": "string",
                "--sort": "string",
                "-L": "none",
                "-T": "none",
                "-m": "none",
                "-C": "string",
                "-G": "string",
                "-g": "string",
                "-p": "string",
                "--pid": "string",
                "-q": "string",
                "--quick-pid": "string",
                "-s": "string",
                "--sid": "string",
                "-t": "string",
                "--tty": "string",
                "-U": "string",
                "-u": "string",
                "--user": "string",
                "--help": "none",
                "--info": "none",
                "-V": "none",
                "--version": "none"
            },
            additionalCommandIsDangerousCallback: (A)=>{
                return /\s[a-zA-Z]*e[a-zA-Z]*(?:\s|$)/.test(A);
            }
        },
        base64: {
            safeFlags: {
                "-d": "none",
                "-D": "none",
                "--decode": "none",
                "-b": "number",
                "--break": "number",
                "-w": "number",
                "--wrap": "number",
                "-i": "string",
                "--input": "string",
                "--ignore-garbage": "none",
                "-h": "none",
                "--help": "none",
                "--version": "none"
            }
        },
        grep: {
            safeFlags: {
                "-e": "string",
                "--regexp": "string",
                "-f": "string",
                "--file": "string",
                "-F": "none",
                "--fixed-strings": "none",
                "-G": "none",
                "--basic-regexp": "none",
                "-E": "none",
                "--extended-regexp": "none",
                "-P": "none",
                "--perl-regexp": "none",
                "-i": "none",
                "--ignore-case": "none",
                "--no-ignore-case": "none",
                "-v": "none",
                "--invert-match": "none",
                "-w": "none",
                "--word-regexp": "none",
                "-x": "none",
                "--line-regexp": "none",
                "-c": "none",
                "--count": "none",
                "--color": "string",
                "--colour": "string",
                "-L": "none",
                "--files-without-match": "none",
                "-l": "none",
                "--files-with-matches": "none",
                "-m": "number",
                "--max-count": "number",
                "-o": "none",
                "--only-matching": "none",
                "-q": "none",
                "--quiet": "none",
                "--silent": "none",
                "-s": "none",
                "--no-messages": "none",
                "-b": "none",
                "--byte-offset": "none",
                "-H": "none",
                "--with-filename": "none",
                "-h": "none",
                "--no-filename": "none",
                "--label": "string",
                "-n": "none",
                "--line-number": "none",
                "-T": "none",
                "--initial-tab": "none",
                "-u": "none",
                "--unix-byte-offsets": "none",
                "-Z": "none",
                "--null": "none",
                "-z": "none",
                "--null-data": "none",
                "-A": "number",
                "--after-context": "number",
                "-B": "number",
                "--before-context": "number",
                "-C": "number",
                "--context": "number",
                "--group-separator": "string",
                "--no-group-separator": "none",
                "-a": "none",
                "--text": "none",
                "--binary-files": "string",
                "-D": "string",
                "--devices": "string",
                "-d": "string",
                "--directories": "string",
                "--exclude": "string",
                "--exclude-from": "string",
                "--exclude-dir": "string",
                "--include": "string",
                "-r": "none",
                "--recursive": "none",
                "-R": "none",
                "--dereference-recursive": "none",
                "--line-buffered": "none",
                "-U": "none",
                "--binary": "none",
                "--help": "none",
                "-V": "none",
                "--version": "none"
            }
        },
        rg: {
            safeFlags: {
                "-e": "string",
                "--regexp": "string",
                "-f": "string",
                "-i": "none",
                "--ignore-case": "none",
                "-S": "none",
                "--smart-case": "none",
                "-F": "none",
                "--fixed-strings": "none",
                "-w": "none",
                "--word-regexp": "none",
                "-v": "none",
                "--invert-match": "none",
                "-c": "none",
                "--count": "none",
                "-l": "none",
                "--files-with-matches": "none",
                "--files-without-match": "none",
                "-n": "none",
                "--line-number": "none",
                "-o": "none",
                "--only-matching": "none",
                "-A": "number",
                "--after-context": "number",
                "-B": "number",
                "--before-context": "number",
                "-C": "number",
                "--context": "number",
                "-H": "none",
                "-h": "none",
                "--heading": "none",
                "--no-heading": "none",
                "-q": "none",
                "--quiet": "none",
                "--column": "none",
                "-g": "string",
                "--glob": "string",
                "-t": "string",
                "--type": "string",
                "-T": "string",
                "--type-not": "string",
                "--type-list": "none",
                "--hidden": "none",
                "--no-ignore": "none",
                "-u": "none",
                "-m": "number",
                "--max-count": "number",
                "-d": "number",
                "--max-depth": "number",
                "-a": "none",
                "--text": "none",
                "-z": "none",
                "-L": "none",
                "--follow": "none",
                "--color": "string",
                "--json": "none",
                "--stats": "none",
                "--help": "none",
                "--version": "none",
                "--debug": "none",
                "--": "none"
            }
        },
        sha256sum: {
            safeFlags: {
                "-b": "none",
                "--binary": "none",
                "-t": "none",
                "--text": "none",
                "-c": "none",
                "--check": "none",
                "--ignore-missing": "none",
                "--quiet": "none",
                "--status": "none",
                "--strict": "none",
                "-w": "none",
                "--warn": "none",
                "--tag": "none",
                "-z": "none",
                "--zero": "none",
                "--help": "none",
                "--version": "none"
            }
        },
        sha1sum: {
            safeFlags: {
                "-b": "none",
                "--binary": "none",
                "-t": "none",
                "--text": "none",
                "-c": "none",
                "--check": "none",
                "--ignore-missing": "none",
                "--quiet": "none",
                "--status": "none",
                "--strict": "none",
                "-w": "none",
                "--warn": "none",
                "--tag": "none",
                "-z": "none",
                "--zero": "none",
                "--help": "none",
                "--version": "none"
            }
        },
        md5sum: {
            safeFlags: {
                "-b": "none",
                "--binary": "none",
                "-t": "none",
                "--text": "none",
                "-c": "none",
                "--check": "none",
                "--ignore-missing": "none",
                "--quiet": "none",
                "--status": "none",
                "--strict": "none",
                "-w": "none",
                "--warn": "none",
                "--tag": "none",
                "-z": "none",
                "--zero": "none",
                "--help": "none",
                "--version": "none"
            }
        }
    }), (D47 = [
        "echo",
        "printf",
        "wc",
        "grep",
        "head",
        "tail"
    ]));
    ((z47 = [
        "date",
        "cal",
        "uptime",
        "head",
        "tail",
        "wc",
        "stat",
        "strings",
        "hexdump",
        "od",
        "nl",
        "id",
        "uname",
        "free",
        "df",
        "du",
        "locale",
        "hostname",
        "groups",
        "nproc",
        "docker ps",
        "docker images",
        "info",
        "basename",
        "dirname",
        "realpath",
        "cut",
        "tr",
        "column",
        "diff",
        "true",
        "false",
        "sleep",
        "which",
        "type"
    ]), (C47 = new Set([
        ...z47.map(E47),
        /^echo(?:\s+(?:'[^']*'|"[^"$<>\n\r]*"|[^|;&`$(){}><#\\!"'\s]+))*(?:\s+2>&1)?\s*$/,
        /^claude -h$/,
        /^claude --help$/,
        /^git status(?:\s|$)[^<>()$`|{}&;\n\r]*$/,
        /^git blame(?:\s|$)[^<>()$`|{}&;\n\r]*$/,
        /^git ls-files(?:\s|$)[^<>()$`|{}&;\n\r]*$/,
        /^git config --get[^<>()$`|{}&;\n\r]*$/,
        /^git remote -v$/,
        /^git remote show\s+[a-zA-Z0-9_-]+$/,
        /^git tag$/,
        /^git tag -l[^<>()$`|{}&;\n\r]*$/,
        /^git branch$/,
        /^git branch (?:-v|-vv|--verbose)$/,
        /^git branch (?:-a|--all)$/,
        /^git branch (?:-r|--remotes)$/,
        /^git branch (?:-l|--list)(?:\s+".*"|'[^']*')?$/,
        /^git branch (?:--color|--no-color|--column|--no-column)$/,
        /^git branch --sort=\S+$/,
        /^git branch --show-current$/,
        /^git branch (?:--contains|--no-contains)\s+\S+$/,
        /^git branch (?:--merged|--no-merged)(?:\s+\S+)?$/,
        /^uniq(?:\s+(?:-[a-zA-Z]+|--[a-zA-Z-]+(?:=\S+)?|-[fsw]\s+\d+))*(?:\s|$)\s*$/,
        /^pwd$/,
        /^whoami$/,
        /^node -v$/,
        /^npm -v$/,
        /^python --version$/,
        /^python3 --version$/,
        /^tree$/,
        /^history(?:\s+\d+)?\s*$/,
        /^alias$/,
        /^arch(?:\s+(?:--help|-h))?\s*$/,
        /^ip addr$/,
        /^ifconfig(?:\s+[a-zA-Z][a-zA-Z0-9_-]*)?\s*$/,
        /^jq(?!\s+.*(?:-f\b|--from-file|--rawfile|--slurpfile|--run-tests|-L\b|--library-path))(?:\s+(?:-[a-zA-Z]+|--[a-zA-Z-]+(?:=\S+)?))*(?:\s+'[^'`]*'|\s+"[^"`]*"|\s+[^-\s'"][^\s]*)+\s*$/,
        /^cd(?:\s+(?:'[^']*'|"[^"]*"|[^\s;|&`$(){}><#\\]+))?$/,
        /^ls(?:\s+[^<>()$`|{}&;\n\r]*)?$/,
        /^find(?:\s+(?:\\[()]|(?!-delete\b|-exec\b|-execdir\b|-ok\b|-okdir\b|-fprint0?\b|-fls\b|-fprintf\b)[^<>()$`|{}&;\n\r\s]|\s)+)?$/
    ])));
});
function N47(A) {
    let Q = O47(A), B = q47.get(Q);
    return B !== void 0 ? B : w47;
}
function L47(A) {
    return A.trim().split(/\s+/)[0] || "";
}
function O47(A) {
    let Q = hV(A), B = Q[Q.length - 1] || A;
    return L47(B);
}
function y39(A, Q, B, G) {
    let Y = N47(A)(Q, B, G);
    return {
        isError: Y.isError,
        message: Y.message
    };
}
var w47 = (A, Q, B)=>({
        isError: A !== 0,
        message: A !== 0 ? `Command failed with exit code ${A}` : void 0
    }), q47;
