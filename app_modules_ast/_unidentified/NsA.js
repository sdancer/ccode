// Module: NsA
// Type: L
// Lines: 168668-169101
//
var NsA = L(()=>{
    getViewTransitionClassName();
    aB();
    zB();
    wsA = [
        {
            id: "quick-wins",
            name: "Quick Wins",
            description: "Try these in 30 seconds",
            order: 1
        },
        {
            id: "speed",
            name: "10x Your Speed",
            description: "Efficiency boosters",
            order: 2
        },
        {
            id: "code",
            name: "Level Up Your Code",
            description: "Dev workflows",
            order: 3
        },
        {
            id: "collaborate",
            name: "Share & Collaborate",
            description: "Work with your team",
            order: 4
        },
        {
            id: "customize",
            name: "Make It Yours",
            description: "Personalize Claude",
            order: 5
        },
        {
            id: "power-user",
            name: "Power User",
            description: "Advanced features",
            order: 6
        }
    ];
    qsA = [
        {
            id: "image-paste",
            name: "Paste Images",
            description: "Paste screenshots for Claude to analyze",
            categoryId: "quick-wins",
            tryItPrompt: "Press Ctrl+V to paste an image from clipboard",
            hasBeenUsed: async ()=>q7("image-paste")
        },
        {
            id: "resume",
            name: "Resume Conversations",
            description: "Pick up where you left off",
            categoryId: "quick-wins",
            tryItPrompt: "Type /resume to continue a past conversation",
            hasBeenUsed: async ()=>q7("resume")
        },
        {
            id: "cost",
            name: "Track Costs",
            description: "See your session spending",
            categoryId: "quick-wins",
            tryItPrompt: "Type /cost to see session cost",
            hasBeenUsed: async ()=>q7("cost")
        },
        {
            id: "external-editor",
            name: "External Editor",
            description: "Edit prompts in VS Code or vim",
            categoryId: "quick-wins",
            tryItPrompt: "Press Ctrl+G to open your editor",
            hasBeenUsed: async ()=>q7("external-editor")
        },
        {
            id: "slash-commands",
            name: "Slash Commands",
            description: "Quick actions with /commands",
            categoryId: "quick-wins",
            tryItPrompt: "Type / to see available commands",
            hasBeenUsed: async ()=>q7("slash-commands")
        },
        {
            id: "at-mentions",
            name: "@-mentions",
            description: "Reference files with @filename",
            categoryId: "quick-wins",
            tryItPrompt: "Type @ followed by a filename",
            hasBeenUsed: async ()=>q7("at-mentions")
        },
        {
            id: "clear",
            name: "Fresh Start",
            description: "Clear and start over",
            categoryId: "quick-wins",
            tryItPrompt: "Type /clear for a fresh conversation",
            hasBeenUsed: async ()=>q7("clear")
        },
        {
            id: "rewind",
            name: "Undo Changes",
            description: "Go back to a previous point",
            categoryId: "quick-wins",
            tryItPrompt: "Type /rewind to undo",
            hasBeenUsed: async ()=>q7("rewind")
        },
        {
            id: "ctrl-underscore",
            name: "Quick Undo",
            description: "Undo with keyboard shortcut",
            categoryId: "quick-wins",
            tryItPrompt: "Press Ctrl+_ to undo",
            hasBeenUsed: async ()=>q7("ctrl-underscore")
        },
        {
            id: "double-escape",
            name: "Clear Input",
            description: "Double-tap Escape to clear",
            categoryId: "quick-wins",
            tryItPrompt: "Press Escape twice to clear input",
            hasBeenUsed: async ()=>q7("double-escape")
        },
        {
            id: "prompt-stash",
            name: "Stash Prompt",
            description: "Save prompt for later",
            categoryId: "quick-wins",
            tryItPrompt: "Press Ctrl+S to stash, Ctrl+S again to restore",
            hasBeenUsed: async ()=>q7("prompt-stash")
        },
        {
            id: "vim-mode",
            name: "Vim Mode",
            description: "Vim keybindings in the prompt",
            categoryId: "speed",
            tryItPrompt: "Type /vim to toggle Vim mode",
            hasBeenUsed: async ()=>q7("vim-mode")
        },
        {
            id: "history-search",
            name: "History Search",
            description: "Search past prompts like bash",
            categoryId: "speed",
            tryItPrompt: "Press Ctrl+R to search history",
            hasBeenUsed: async ()=>q7("history-search")
        },
        {
            id: "tab-completion",
            name: "Tab Completion",
            description: "Autocomplete file paths",
            categoryId: "speed",
            tryItPrompt: "Start typing a path and press Tab",
            hasBeenUsed: async ()=>q7("tab-completion")
        },
        {
            id: "prompt-queue",
            name: "Prompt Queue",
            description: "Type while Claude works",
            categoryId: "speed",
            tryItPrompt: "Type your next prompt while Claude is responding",
            hasBeenUsed: async ()=>{
                return v1().promptQueueUseCount > 0;
            }
        },
        {
            id: "teleport",
            name: "Teleport",
            description: "Jump to any GitHub repo instantly",
            categoryId: "speed",
            tryItPrompt: "Type /teleport owner/repo to jump there",
            hasBeenUsed: async ()=>q7("teleport")
        },
        {
            id: "plan-mode",
            name: "Plan Mode",
            description: "Think before you code",
            categoryId: "speed",
            tryItPrompt: "Press Shift+Tab twice for Plan Mode",
            hasBeenUsed: async ()=>{
                return v1().lastPlanModeUse !== void 0;
            }
        },
        {
            id: "bash-mode",
            name: "Bash Mode",
            description: "Run shell commands with ! prefix",
            categoryId: "speed",
            tryItPrompt: "Type !ls to list files",
            hasBeenUsed: async ()=>q7("bash-mode")
        },
        {
            id: "compact",
            name: "Compact Context",
            description: "Summarize to free up space",
            categoryId: "speed",
            tryItPrompt: "Type /compact to summarize",
            hasBeenUsed: async ()=>q7("compact")
        },
        {
            id: "memory-mode",
            name: "Quick Memory",
            description: "Save notes with # prefix",
            categoryId: "speed",
            tryItPrompt: "Press # to add to memory",
            hasBeenUsed: async ()=>{
                return v1().memoryUsageCount > 0;
            }
        },
        {
            id: "auto-accept-mode",
            name: "Auto-Accept Edits",
            description: "Skip confirmations",
            categoryId: "speed",
            tryItPrompt: "Press Shift+Tab once for Auto-Accept",
            hasBeenUsed: async ()=>q7("auto-accept-mode")
        },
        {
            id: "context",
            name: "Context Viewer",
            description: "See what Claude sees",
            categoryId: "speed",
            tryItPrompt: "Type /context to visualize usage",
            hasBeenUsed: async ()=>q7("context")
        },
        {
            id: "backslash-return",
            name: "Multi-line Input",
            description: "Type longer prompts",
            categoryId: "speed",
            tryItPrompt: "Type \\ then Enter for a new line",
            hasBeenUsed: async ()=>{
                return v1().hasUsedBackslashReturn === !0;
            }
        },
        {
            id: "review",
            name: "Code Review",
            description: "AI-powered code review",
            categoryId: "code",
            tryItPrompt: "Type /review to review a PR",
            hasBeenUsed: async ()=>q7("review")
        },
        {
            id: "security-review",
            name: "Security Review",
            description: "Find vulnerabilities",
            categoryId: "code",
            tryItPrompt: "Ask Claude to do a security review",
            hasBeenUsed: async ()=>q7("security-review")
        },
        {
            id: "git-commits",
            name: "Git Commits",
            description: "Claude-assisted commits",
            categoryId: "code",
            tryItPrompt: "Ask Claude to commit your changes",
            hasBeenUsed: async ()=>q7("git-commits")
        },
        {
            id: "pr-creation",
            name: "PR Creation",
            description: "Create PRs with Claude",
            categoryId: "code",
            tryItPrompt: "Ask Claude to create a pull request",
            hasBeenUsed: async ()=>q7("pr-creation")
        },
        {
            id: "branch-management",
            name: "Branch Management",
            description: "Git branch operations",
            categoryId: "code",
            tryItPrompt: "Ask Claude to create a branch",
            hasBeenUsed: async ()=>q7("branch-management")
        },
        {
            id: "share",
            name: "Share Conversations",
            description: "Share a link to your session",
            categoryId: "collaborate",
            tryItPrompt: "Type /share to get a shareable link",
            hasBeenUsed: async ()=>q7("share")
        },
        {
            id: "export",
            name: "Export",
            description: "Save as markdown",
            categoryId: "collaborate",
            tryItPrompt: "Type /export to save conversation",
            hasBeenUsed: async ()=>q7("export")
        },
        {
            id: "github-app",
            name: "GitHub Integration",
            description: "Connect to GitHub Actions",
            categoryId: "collaborate",
            tryItPrompt: "Type /install-github-app to set up",
            hasBeenUsed: async ()=>q7("github-app")
        },
        {
            id: "slack-app",
            name: "Slack Notifications",
            description: "Get notified in Slack",
            categoryId: "collaborate",
            tryItPrompt: "Type /install-slack-app to connect",
            hasBeenUsed: async ()=>q7("slack-app")
        },
        {
            id: "custom-commands",
            name: "Custom Commands",
            description: "Create your own /commands",
            categoryId: "customize",
            tryItPrompt: "Create .claude/commands/mycommand.md",
            hasBeenUsed: async ()=>{
                let A = i1(), Q = UsA(A, ".claude", "commands"), B = UsA(h4B(), ".claude", "commands");
                return $sA(Q) || $sA(B);
            }
        },
        {
            id: "hooks",
            name: "Hooks",
            description: "Auto-run scripts on events",
            categoryId: "customize",
            tryItPrompt: "Add hooks to .claude/settings.json",
            hasBeenUsed: async ()=>{
                let A = HQ();
                return Object.keys(A.hooks ?? {}).length > 0;
            }
        },
        {
            id: "theme",
            name: "Themes",
            description: "Customize colors",
            categoryId: "customize",
            tryItPrompt: "Type /config to change theme",
            hasBeenUsed: async ()=>q7("theme")
        },
        {
            id: "claude-md-project",
            name: "Project Instructions",
            description: "CLAUDE.md for your project",
            categoryId: "customize",
            tryItPrompt: "Create CLAUDE.md in your project root",
            hasBeenUsed: async ()=>{
                let A = i1(), Q = UsA(A, "CLAUDE.md");
                return $sA(Q);
            }
        },
        {
            id: "claude-md-user",
            name: "Personal Instructions",
            description: "Your global CLAUDE.md",
            categoryId: "customize",
            tryItPrompt: "Create ~/.claude/CLAUDE.md",
            hasBeenUsed: async ()=>{
                let A = UsA(h4B(), ".claude", "CLAUDE.md");
                return $sA(A);
            }
        },
        {
            id: "mcp-servers",
            name: "MCP Servers",
            description: "Connect external tools",
            categoryId: "power-user",
            tryItPrompt: "Type /mcp to manage servers",
            hasBeenUsed: async ()=>{
                let A = v1();
                return Object.keys(A.mcpServers ?? {}).length > 0;
            }
        },
        {
            id: "ide-integration",
            name: "IDE Integration",
            description: "Connect to VS Code",
            categoryId: "power-user",
            tryItPrompt: "Type /ide to configure",
            hasBeenUsed: async ()=>q7("ide-integration")
        },
        {
            id: "subagents",
            name: "Subagents",
            description: "Claude spawns helper agents",
            categoryId: "power-user",
            tryItPrompt: "Ask Claude to explore the codebase",
            hasBeenUsed: async ()=>q7("subagents")
        },
        {
            id: "plugins",
            name: "Plugins",
            description: "Extend with plugins",
            categoryId: "power-user",
            tryItPrompt: "Type /plugin to manage plugins",
            hasBeenUsed: async ()=>q7("plugins")
        },
        {
            id: "multi-directory",
            name: "Multi-Directory",
            description: "Work across projects",
            categoryId: "power-user",
            tryItPrompt: "Type /add-dir to add another directory",
            hasBeenUsed: async ()=>q7("multi-directory")
        }
    ];
});
function LsA() {
    return !1;
}
function b9(A) {
    if (!LsA()) return;
    let G = (v1().featureUsage ?? {})[A], Z = {
        firstUsedAt: G?.firstUsedAt ?? Date.now(),
        usageCount: (G?.usageCount ?? 0) + 1
    };
    if (!G || G.usageCount !== Z.usageCount) n0((Y)=>({
            ...Y,
            featureUsage: {
                ...Y.featureUsage,
                [A]: Z
            }
        }));
}
async function d4B() {
    let A = qsA.map(async (Z)=>({
            id: Z.id,
            categoryId: Z.categoryId,
            used: await Z.hasBeenUsed()
        })), Q = await Promise.all(A), B = m4B(), G = 0;
    for (let Z of Q)if ((B[Z.categoryId].total++, Z.used)) (B[Z.categoryId].explored++, G++);
    return {
        explored: G,
        total: qsA.length,
        byCategory: B
    };
}
