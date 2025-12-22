// Module: YGB
// Type: L
// Lines: 181219-181686
//
var createRenderState = L(()=>{
    pushStartInstance();
    a7B();
    /*! chokidar - MIT License (c) 2012 Paul Miller (paulmillr.com) */ ((aO8 = /\\/g), (o7B = /\/\//), (oO8 = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/), (rO8 = /^\.[/\\]/));
    QM8 = Object.freeze(new Set());
    fp1 = class fp1 extends pO8 {
        constructor(A = {}){
            super();
            ((this.closed = !1), (this._closers = new Map()), (this._ignoredPaths = new Set()), (this._throttled = new Map()), (this._streams = new Set()), (this._symlinkPaths = new Map()), (this._watched = new Map()), (this._pendingWrites = new Map()), (this._pendingUnlinks = new Map()), (this._readyCount = 0), (this._readyEmitted = !1));
            let Q = A.awaitWriteFinish, B = {
                stabilityThreshold: 2000,
                pollInterval: 100
            }, G = {
                persistent: !0,
                ignoreInitial: !1,
                ignorePermissionErrors: !1,
                interval: 100,
                binaryInterval: 300,
                followSymlinks: !0,
                usePolling: !1,
                atomic: !0,
                ...A,
                ignored: A.ignored ? gtA(A.ignored) : gtA([]),
                awaitWriteFinish: Q === !0 ? B : typeof Q === "object" ? {
                    ...B,
                    ...Q
                } : !1
            };
            if (i7B) G.usePolling = !0;
            if (G.atomic === void 0) G.atomic = !G.usePolling;
            let Z = process.env.CHOKIDAR_USEPOLLING;
            if (Z !== void 0) {
                let X = Z.toLowerCase();
                if (X === "false" || X === "0") G.usePolling = !1;
                else if (X === "true" || X === "1") G.usePolling = !0;
                else G.usePolling = !!X;
            }
            let Y = process.env.CHOKIDAR_INTERVAL;
            if (Y) G.interval = Number.parseInt(Y, 10);
            let J = 0;
            ((this._emitReady = ()=>{
                if ((J++, J >= this._readyCount)) ((this._emitReady = btA), (this._readyEmitted = !0), process.nextTick(()=>this.emit(IJ.READY)));
            }), (this._emitRaw = (...X)=>this.emit(IJ.RAW, ...X)), (this._boundRemove = this._remove.bind(this)), (this.options = G), (this._nodeFsHandler = new xp1(this)), Object.freeze(G));
        }
        _addIgnoredPath(A) {
            if (kp1(A)) {
                for (let Q of this._ignoredPaths)if (kp1(Q) && Q.path === A.path && Q.recursive === A.recursive) return;
            }
            this._ignoredPaths.add(A);
        }
        _removeIgnoredPath(A) {
            if ((this._ignoredPaths.delete(A), typeof A === "string")) {
                for (let Q of this._ignoredPaths)if (kp1(Q) && Q.path === A) this._ignoredPaths.delete(Q);
            }
        }
        add(A, Q, B) {
            let { cwd: G } = this.options;
            ((this.closed = !1), (this._closePromise = void 0));
            let Z = s7B(A);
            if (G) Z = Z.map((Y)=>{
                return AM8(Y, G);
            });
            if ((Z.forEach((Y)=>{
                this._removeIgnoredPath(Y);
            }), (this._userIgnored = void 0), !this._readyCount)) this._readyCount = 0;
            return ((this._readyCount += Z.length), Promise.all(Z.map(async (Y)=>{
                let J = await this._nodeFsHandler._addToNodeFs(Y, !B, void 0, 0, Q);
                if (J) this._emitReady();
                return J;
            })).then((Y)=>{
                if (this.closed) return;
                Y.forEach((J)=>{
                    if (J) this.add(l3.dirname(J), l3.basename(Q || J));
                });
            }), this);
        }
        unwatch(A) {
            if (this.closed) return this;
            let Q = s7B(A), { cwd: B } = this.options;
            return (Q.forEach((G)=>{
                if (!l3.isAbsolute(G) && !this._closers.has(G)) {
                    if (B) G = l3.join(B, G);
                    G = l3.resolve(G);
                }
                if ((this._closePath(G), this._addIgnoredPath(G), this._watched.has(G))) this._addIgnoredPath({
                    path: G,
                    recursive: !0
                });
                this._userIgnored = void 0;
            }), this);
        }
        close() {
            if (this._closePromise) return this._closePromise;
            ((this.closed = !0), this.removeAllListeners());
            let A = [];
            return (this._closers.forEach((Q)=>Q.forEach((B)=>{
                    let G = B();
                    if (G instanceof Promise) A.push(G);
                })), this._streams.forEach((Q)=>Q.destroy()), (this._userIgnored = void 0), (this._readyCount = 0), (this._readyEmitted = !1), this._watched.forEach((Q)=>Q.dispose()), this._closers.clear(), this._watched.clear(), this._streams.clear(), this._symlinkPaths.clear(), this._throttled.clear(), (this._closePromise = A.length ? Promise.all(A).then(()=>{
                return;
            }) : Promise.resolve()), this._closePromise);
        }
        getWatched() {
            let A = {};
            return (this._watched.forEach((Q, B)=>{
                let Z = (this.options.cwd ? l3.relative(this.options.cwd, B) : B) || AGB;
                A[Z] = Q.getChildren().sort();
            }), A);
        }
        emitWithAll(A, Q) {
            if ((this.emit(A, ...Q), A !== IJ.ERROR)) this.emit(IJ.ALL, A, ...Q);
        }
        async _emit(A, Q, B) {
            if (this.closed) return;
            let G = this.options;
            if (yp1) Q = l3.normalize(Q);
            if (G.cwd) Q = l3.relative(G.cwd, Q);
            let Z = [
                Q
            ];
            if (B != null) Z.push(B);
            let Y = G.awaitWriteFinish, J;
            if (Y && (J = this._pendingWrites.get(Q))) return ((J.lastChange = new Date()), this);
            if (G.atomic) {
                if (A === IJ.UNLINK) return (this._pendingUnlinks.set(Q, [
                    A,
                    ...Z
                ]), setTimeout(()=>{
                    this._pendingUnlinks.forEach((X, I)=>{
                        (this.emit(...X), this.emit(IJ.ALL, ...X), this._pendingUnlinks.delete(I));
                    });
                }, typeof G.atomic === "number" ? G.atomic : 100), this);
                if (A === IJ.ADD && this._pendingUnlinks.has(Q)) ((A = IJ.CHANGE), this._pendingUnlinks.delete(Q));
            }
            if (Y && (A === IJ.ADD || A === IJ.CHANGE) && this._readyEmitted) {
                let X = (I, W)=>{
                    if (I) ((A = IJ.ERROR), (Z[0] = I), this.emitWithAll(A, Z));
                    else if (W) {
                        if (Z.length > 1) Z[1] = W;
                        else Z.push(W);
                        this.emitWithAll(A, Z);
                    }
                };
                return (this._awaitWriteFinish(Q, Y.stabilityThreshold, A, X), this);
            }
            if (A === IJ.CHANGE) {
                if (!this._throttle(IJ.CHANGE, Q, 50)) return this;
            }
            if (G.alwaysStat && B === void 0 && (A === IJ.ADD || A === IJ.ADD_DIR || A === IJ.CHANGE)) {
                let X = G.cwd ? l3.join(G.cwd, Q) : Q, I;
                try {
                    I = await dO8(X);
                } catch (W) {}
                if (!I || this.closed) return;
                Z.push(I);
            }
            return (this.emitWithAll(A, Z), this);
        }
        _handleError(A) {
            let Q = A && A.code;
            if (A && Q !== "ENOENT" && Q !== "ENOTDIR" && (!this.options.ignorePermissionErrors || (Q !== "EPERM" && Q !== "EACCES"))) this.emit(IJ.ERROR, A);
            return A || this.closed;
        }
        _throttle(A, Q, B) {
            if (!this._throttled.has(A)) this._throttled.set(A, new Map());
            let G = this._throttled.get(A);
            if (!G) throw Error("invalid throttle");
            let Z = G.get(Q);
            if (Z) return (Z.count++, !1);
            let Y, J = ()=>{
                let I = G.get(Q), W = I ? I.count : 0;
                if ((G.delete(Q), clearTimeout(Y), I)) clearTimeout(I.timeoutObject);
                return W;
            };
            Y = setTimeout(J, B);
            let X = {
                timeoutObject: Y,
                clear: J,
                count: 0
            };
            return (G.set(Q, X), X);
        }
        _incrReadyCount() {
            return this._readyCount++;
        }
        _awaitWriteFinish(A, Q, B, G) {
            let Z = this.options.awaitWriteFinish;
            if (typeof Z !== "object") return;
            let Y = Z.pollInterval, J, X = A;
            if (this.options.cwd && !l3.isAbsolute(A)) X = l3.join(this.options.cwd, A);
            let I = new Date(), W = this._pendingWrites;
            function K(V) {
                mO8(X, (H, D)=>{
                    if (H || !W.has(A)) {
                        if (H && H.code !== "ENOENT") G(H);
                        return;
                    }
                    let F = Number(new Date());
                    if (V && D.size !== V.size) W.get(A).lastChange = F;
                    let E = W.get(A);
                    if (F - E.lastChange >= Q) (W.delete(A), G(void 0, D));
                    else J = setTimeout(K, Y, D);
                });
            }
            if (!W.has(A)) (W.set(A, {
                lastChange: I,
                cancelWait: ()=>{
                    return (W.delete(A), clearTimeout(J), B);
                }
            }), (J = setTimeout(K, Y)));
        }
        _isIgnored(A, Q) {
            if (this.options.atomic && oO8.test(A)) return !0;
            if (!this._userIgnored) {
                let { cwd: B } = this.options, Z = (this.options.ignored || []).map(e7B(B)), J = [
                    ...[
                        ...this._ignoredPaths
                    ].map(e7B(B)),
                    ...Z
                ];
                this._userIgnored = eO8(J, void 0);
            }
            return this._userIgnored(A, Q);
        }
        _isntIgnored(A, Q) {
            return !this._isIgnored(A, Q);
        }
        _getWatchHelpers(A) {
            return new GGB(A, this.options.followSymlinks, this);
        }
        _getWatchedDir(A) {
            let Q = l3.resolve(A);
            if (!this._watched.has(Q)) this._watched.set(Q, new BGB(Q, this._boundRemove));
            return this._watched.get(Q);
        }
        _hasReadPermissions(A) {
            if (this.options.ignorePermissionErrors) return !0;
            return Boolean(Number(A.mode) & 256);
        }
        _remove(A, Q, B) {
            let G = l3.join(A, Q), Z = l3.resolve(G);
            if (((B = B != null ? B : this._watched.has(G) || this._watched.has(Z)), !this._throttle("remove", G, 100))) return;
            if (!B && this._watched.size === 1) this.add(A, Q, !0);
            this._getWatchedDir(G).getChildren().forEach((V)=>this._remove(G, V));
            let X = this._getWatchedDir(A), I = X.has(Q);
            if ((X.remove(Q), this._symlinkPaths.has(Z))) this._symlinkPaths.delete(Z);
            let W = G;
            if (this.options.cwd) W = l3.relative(this.options.cwd, G);
            if (this.options.awaitWriteFinish && this._pendingWrites.has(W)) {
                if (this._pendingWrites.get(W).cancelWait() === IJ.ADD) return;
            }
            (this._watched.delete(G), this._watched.delete(Z));
            let K = B ? IJ.UNLINK_DIR : IJ.UNLINK;
            if (I && !this._isIgnored(G)) this._emit(K, G);
            this._closePath(G);
        }
        _closePath(A) {
            this._closeFile(A);
            let Q = l3.dirname(A);
            this._getWatchedDir(Q).remove(l3.basename(A));
        }
        _closeFile(A) {
            let Q = this._closers.get(A);
            if (!Q) return;
            (Q.forEach((B)=>B()), this._closers.delete(A));
        }
        _addPathCloser(A, Q) {
            if (!Q) return;
            let B = this._closers.get(A);
            if (!B) ((B = []), this._closers.set(A, B));
            B.push(Q);
        }
        _readdirp(A, Q) {
            if (this.closed) return;
            let B = {
                type: IJ.ALL,
                alwaysStat: !0,
                lstat: !0,
                ...Q,
                depth: 0
            }, G = u7B(A, B);
            return (this._streams.add(G), G.once(l7B, ()=>{
                G = void 0;
            }), G.once(Sp1, ()=>{
                if (G) (this._streams.delete(G), (G = void 0));
            }), G);
        }
    };
    ZGB = {
        watch: ZM8,
        FSWatcher: fp1
    };
});
function xi(A) {
    switch(A){
        case "userSettings":
            return "user";
        case "projectSettings":
            return "project";
        case "localSettings":
            return "project, gitignored";
        case "flagSettings":
            return "cli flag";
        case "policySettings":
            return "managed";
    }
}
function utA(A) {
    switch(A){
        case "userSettings":
            return "user settings";
        case "projectSettings":
            return "shared project settings";
        case "localSettings":
            return "project local settings";
        case "flagSettings":
            return "command line arguments";
        case "policySettings":
            return "enterprise managed settings";
        case "cliArg":
            return "CLI argument";
        case "command":
            return "command configuration";
        case "session":
            return "current session";
    }
}
function JGB(A) {
    switch(A){
        case "userSettings":
            return "User settings";
        case "projectSettings":
            return "Shared project settings";
        case "localSettings":
            return "Project local settings";
        case "flagSettings":
            return "Command line arguments";
        case "policySettings":
            return "Enterprise managed settings";
        case "cliArg":
            return "CLI argument";
        case "command":
            return "Command configuration";
        case "session":
            return "Current session";
    }
}
function XGB(A) {
    if (A === "") return [];
    let Q = A.split(",").map((G)=>G.trim()), B = [];
    for (let G of Q)switch(G){
        case "user":
            B.push("userSettings");
            break;
        case "project":
            B.push("projectSettings");
            break;
        case "local":
            B.push("localSettings");
            break;
        default:
            throw Error(`Invalid setting source: ${G}. Valid options are: user, project, local`);
    }
    return B;
}
function m1A() {
    let A = pP0(), Q = new Set(A);
    return (Q.add("policySettings"), Q.add("flagSettings"), Array.from(Q));
}
function LV(A) {
    return m1A().includes(A);
}
var fN, IGB = "https://json.schemastore.org/claude-code-settings.json";
