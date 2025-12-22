// Module: DQ
// Type: L
// Lines: 524031-524158
//
var getViewTransitionClassName = L(()=>{
    JdA();
    n2();
    I5();
    aQ();
    aB();
    eI();
    GJ();
    uJ();
    i0();
    restoreViewTransitionName();
    A4();
    A2();
    s1();
    g1();
    pushStartInstance();
    pushStartInstance();
    zB();
    HS();
    z4();
    ((HV9 = l(renderElement(), 1)), (bbA = {
        allowedTools: [],
        mcpContextUris: [],
        mcpServers: {},
        enabledMcpjsonServers: [],
        disabledMcpjsonServers: [],
        hasTrustDialogAccepted: !1,
        projectOnboardingSeenCount: 0,
        hasClaudeMdExternalIncludesApproved: !1,
        hasClaudeMdExternalIncludesWarningShown: !1
    }), (fL = {
        numStartups: 0,
        installMethod: void 0,
        autoUpdates: void 0,
        theme: "dark",
        preferredNotifChannel: "auto",
        verbose: !1,
        editorMode: "normal",
        autoCompactEnabled: !0,
        hasSeenTasksHint: !1,
        hasUsedStash: !1,
        queuedCommandUpHintCount: 0,
        diffTool: "auto",
        customApiKeyResponses: {
            approved: [],
            rejected: []
        },
        env: {},
        tipsHistory: {},
        memoryUsageCount: 0,
        promptQueueUseCount: 0,
        todoFeatureEnabled: !0,
        showExpandedTodos: !1,
        messageIdleNotifThresholdMs: 60000,
        autoConnectIde: !1,
        autoInstallIdeExtension: !0,
        checkpointingShadowRepos: [],
        fileCheckpointingEnabled: !0,
        terminalProgressBarEnabled: !0,
        cachedStatsigGates: {},
        cachedDynamicConfigs: {},
        cachedGrowthBookFeatures: {},
        respectGitignore: !0
    }));
    ((tEJ = {
        ...fL,
        autoUpdates: !1
    }), (eEJ = {
        ...bbA
    }));
    Gc = {
        config: null,
        mtime: 0
    };
    X3(async ()=>{
        UX7();
    });
    qR0 = Y0(()=>{
        let A = uQ();
        try {
            let Q = $X7("git rev-parse --show-toplevel", {
                cwd: A,
                encoding: "utf8",
                stdio: [
                    "pipe",
                    "pipe",
                    "ignore"
                ]
            }).trim();
            return mzA(Q);
        } catch  {
            return mzA(KV9(A));
        }
    });
});
async function zV9() {
    if (QF1 === null && !AF1) ((AF1 = qX7()), (QF1 = await AF1), (AF1 = null), C1A.cache.clear?.());
}
function Es(A) {
    let Q = C1A(A);
    return {
        customIDs: {
            sessionId: Q.sessionId,
            organizationUUID: Q.organizationUuid,
            accountUUID: Q.accountUuid
        },
        userID: Q.deviceId,
        appVersion: Q.appVersion,
        email: Q.email,
        custom: {
            userType: Q.userType,
            organizationUuid: Q.organizationUuid,
            accountUuid: Q.accountUuid,
            subscriptionType: Q.subscriptionType ?? "",
            firstTokenTime: Q.firstTokenTime ?? 0,
            ...(Q.githubActionsMetadata && {
                githubActor: Q.githubActionsMetadata.actor,
                githubActorId: Q.githubActionsMetadata.actorId,
                githubRepository: Q.githubActionsMetadata.repository,
                githubRepositoryId: Q.githubActionsMetadata.repositoryId,
                githubRepositoryOwner: Q.githubActionsMetadata.repositoryOwner,
                githubRepositoryOwnerId: Q.githubActionsMetadata.repositoryOwnerId
            })
        }
    };
}
function LQB() {
    return C1A(!0);
}
function wX7() {
    if (QF1 !== null) return QF1;
    return;
}
async function qX7() {
    return;
}
var QF1 = null, AF1 = null, C1A;
