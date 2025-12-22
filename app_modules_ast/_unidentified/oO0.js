// Module: oO0
// Type: L
// Lines: 501776-501822
//
var samplingCallback = L(()=>{
    flushCompletedQueues();
    wZ();
    CD1 = KFA({
        name: "review",
        description: "Review a pull request",
        progressMessage: "reviewing pull request",
        pluginName: "code-review",
        pluginCommand: "code-review",
        async getPromptWhileMarketplaceIsPrivate (A) {
            return (b9("review"), [
                {
                    type: "text",
                    text: `
      You are an expert code reviewer. Follow these steps:

      1. If no PR number is provided in the args, use ${M9.name}("gh pr list") to show open PRs
      2. If a PR number is provided, use ${M9.name}("gh pr view <number>") to get PR details
      3. Use ${M9.name}("gh pr diff <number>") to get the diff
      4. Analyze the changes and provide a thorough code review that includes:
         - Overview of what the PR does
         - Analysis of code quality and style
         - Specific suggestions for improvements
         - Any potential issues or risks

      Keep your review concise but thorough. Focus on:
      - Code correctness
      - Following project conventions
      - Performance implications
      - Test coverage
      - Security considerations

      Format your review with clear sections and bullet points.

      PR number: ${A}
    `
                }
            ]);
        }
    });
});
var KJ9 = ()=>{};
var rO0, UG7, VJ9;
