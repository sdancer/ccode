// Module: C5A
// Type: L
// Lines: 62052-63014
//
var renderElement = L(()=>{
    ((E5A = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date), (h9Q = new Set()), (PN1 = typeof process === "object" && !!process ? process : {}), (OdA = globalThis.AbortController), (b9Q = globalThis.AbortSignal));
    if (typeof OdA > "u") {
        ((b9Q = class {
            onabort;
            _onabort = [];
            reason;
            aborted = !1;
            addEventListener(G, Z) {
                this._onabort.push(Z);
            }
        }), (OdA = class {
            constructor(){
                Q();
            }
            signal = new b9Q();
            abort(G) {
                if (this.signal.aborted) return;
                ((this.signal.reason = G), (this.signal.aborted = !0));
                for (let Z of this.signal._onabort)Z(G);
                this.signal.onabort?.(G);
            }
        }));
        let A = PN1.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1", Q = ()=>{
            if (!A) return;
            ((A = !1), g9Q("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", Q));
        };
    }
    Lm7 = Symbol("type");
    ozA = class ozA extends Array {
        constructor(A){
            super(A);
            this.fill(0);
        }
    };
    pO = class pO {
        #A;
        #Q;
        #B;
        #Z;
        #G;
        #X;
        ttl;
        ttlResolution;
        ttlAutopurge;
        updateAgeOnGet;
        updateAgeOnHas;
        allowStale;
        noDisposeOnSet;
        noUpdateTTL;
        maxEntrySize;
        sizeCalculation;
        noDeleteOnFetchRejection;
        noDeleteOnStaleGet;
        allowStaleOnFetchAbort;
        allowStaleOnFetchRejection;
        ignoreFetchAbort;
        #Y;
        #K;
        #V;
        #I;
        #J;
        #E;
        #C;
        #F;
        #H;
        #w;
        #D;
        #q;
        #N;
        #$;
        #L;
        #j;
        #z;
        static unsafeExposeInternals(A) {
            return {
                starts: A.#N,
                ttls: A.#$,
                sizes: A.#q,
                keyMap: A.#V,
                keyList: A.#I,
                valList: A.#J,
                next: A.#E,
                prev: A.#C,
                get head () {
                    return A.#F;
                },
                get tail () {
                    return A.#H;
                },
                free: A.#w,
                isBackgroundFetch: (Q)=>A.#W(Q),
                backgroundFetch: (Q, B, G, Z)=>A.#v(Q, B, G, Z),
                moveToTail: (Q)=>A.#S(Q),
                indexes: (Q)=>A.#O(Q),
                rindexes: (Q)=>A.#M(Q),
                isStale: (Q)=>A.#U(Q)
            };
        }
        get max() {
            return this.#A;
        }
        get maxSize() {
            return this.#Q;
        }
        get calculatedSize() {
            return this.#K;
        }
        get size() {
            return this.#Y;
        }
        get fetchMethod() {
            return this.#G;
        }
        get memoMethod() {
            return this.#X;
        }
        get dispose() {
            return this.#B;
        }
        get disposeAfter() {
            return this.#Z;
        }
        constructor(A){
            let { max: Q = 0, ttl: B, ttlResolution: G = 1, ttlAutopurge: Z, updateAgeOnGet: Y, updateAgeOnHas: J, allowStale: X, dispose: I, disposeAfter: W, noDisposeOnSet: K, noUpdateTTL: V, maxSize: H = 0, maxEntrySize: D = 0, sizeCalculation: F, fetchMethod: E, memoMethod: z, noDeleteOnFetchRejection: $, noDeleteOnStaleGet: O, allowStaleOnFetchRejection: N, allowStaleOnFetchAbort: M, ignoreFetchAbort: R } = A;
            if (Q !== 0 && !dp(Q)) throw TypeError("max option must be a nonnegative integer");
            let j = Q ? u9Q(Q) : Array;
            if (!j) throw Error("invalid max value: " + Q);
            if (((this.#A = Q), (this.#Q = H), (this.maxEntrySize = D || this.#Q), (this.sizeCalculation = F), this.sizeCalculation)) {
                if (!this.#Q && !this.maxEntrySize) throw TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
                if (typeof this.sizeCalculation !== "function") throw TypeError("sizeCalculation set to non-function");
            }
            if (z !== void 0 && typeof z !== "function") throw TypeError("memoMethod must be a function if defined");
            if (((this.#X = z), E !== void 0 && typeof E !== "function")) throw TypeError("fetchMethod must be a function if specified");
            if (((this.#G = E), (this.#j = !!E), (this.#V = new Map()), (this.#I = Array(Q).fill(void 0)), (this.#J = Array(Q).fill(void 0)), (this.#E = new j(Q)), (this.#C = new j(Q)), (this.#F = 0), (this.#H = 0), (this.#w = z5A.create(Q)), (this.#Y = 0), (this.#K = 0), typeof I === "function")) this.#B = I;
            if (typeof W === "function") ((this.#Z = W), (this.#D = []));
            else ((this.#Z = void 0), (this.#D = void 0));
            if (((this.#L = !!this.#B), (this.#z = !!this.#Z), (this.noDisposeOnSet = !!K), (this.noUpdateTTL = !!V), (this.noDeleteOnFetchRejection = !!$), (this.allowStaleOnFetchRejection = !!N), (this.allowStaleOnFetchAbort = !!M), (this.ignoreFetchAbort = !!R), this.maxEntrySize !== 0)) {
                if (this.#Q !== 0) {
                    if (!dp(this.#Q)) throw TypeError("maxSize must be a positive integer if specified");
                }
                if (!dp(this.maxEntrySize)) throw TypeError("maxEntrySize must be a positive integer if specified");
                this.#m();
            }
            if (((this.allowStale = !!X), (this.noDeleteOnStaleGet = !!O), (this.updateAgeOnGet = !!Y), (this.updateAgeOnHas = !!J), (this.ttlResolution = dp(G) || G === 0 ? G : 1), (this.ttlAutopurge = !!Z), (this.ttl = B || 0), this.ttl)) {
                if (!dp(this.ttl)) throw TypeError("ttl must be a positive integer if specified");
                this.#k();
            }
            if (this.#A === 0 && this.ttl === 0 && this.#Q === 0) throw TypeError("At least one of max, maxSize, or ttl is required");
            if (!this.ttlAutopurge && !this.#A && !this.#Q) {
                if (Z84("LRU_CACHE_UNBOUNDED")) (h9Q.add("LRU_CACHE_UNBOUNDED"), g9Q("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", "LRU_CACHE_UNBOUNDED", pO));
            }
        }
        getRemainingTTL(A) {
            return this.#V.has(A) ? 1 / 0 : 0;
        }
        #k() {
            let A = new ozA(this.#A), Q = new ozA(this.#A);
            ((this.#$ = A), (this.#N = Q), (this.#f = (Z, Y, J = E5A.now())=>{
                if (((Q[Z] = Y !== 0 ? J : 0), (A[Z] = Y), Y !== 0 && this.ttlAutopurge)) {
                    let X = setTimeout(()=>{
                        if (this.#U(Z)) this.#R(this.#I[Z], "expire");
                    }, Y + 1);
                    if (X.unref) X.unref();
                }
            }), (this.#T = (Z)=>{
                Q[Z] = A[Z] !== 0 ? E5A.now() : 0;
            }), (this.#_ = (Z, Y)=>{
                if (A[Y]) {
                    let J = A[Y], X = Q[Y];
                    if (!J || !X) return;
                    ((Z.ttl = J), (Z.start = X), (Z.now = B || G()));
                    let I = Z.now - X;
                    Z.remainingTTL = J - I;
                }
            }));
            let B = 0, G = ()=>{
                let Z = E5A.now();
                if (this.ttlResolution > 0) {
                    B = Z;
                    let Y = setTimeout(()=>(B = 0), this.ttlResolution);
                    if (Y.unref) Y.unref();
                }
                return Z;
            };
            ((this.getRemainingTTL = (Z)=>{
                let Y = this.#V.get(Z);
                if (Y === void 0) return 0;
                let J = A[Y], X = Q[Y];
                if (!J || !X) return 1 / 0;
                let I = (B || G()) - X;
                return J - I;
            }), (this.#U = (Z)=>{
                let Y = Q[Z], J = A[Z];
                return !!J && !!Y && (B || G()) - Y > J;
            }));
        }
        #T = ()=>{};
        #_ = ()=>{};
        #f = ()=>{};
        #U = ()=>!1;
        #m() {
            let A = new ozA(this.#A);
            ((this.#K = 0), (this.#q = A), (this.#P = (Q)=>{
                ((this.#K -= A[Q]), (A[Q] = 0));
            }), (this.#b = (Q, B, G, Z)=>{
                if (this.#W(B)) return 0;
                if (!dp(G)) if (Z) {
                    if (typeof Z !== "function") throw TypeError("sizeCalculation must be a function");
                    if (((G = Z(B, Q)), !dp(G))) throw TypeError("sizeCalculation return invalid (expect positive integer)");
                } else throw TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
                return G;
            }), (this.#y = (Q, B, G)=>{
                if (((A[Q] = B), this.#Q)) {
                    let Z = this.#Q - A[Q];
                    while(this.#K > Z)this.#x(!0);
                }
                if (((this.#K += A[Q]), G)) ((G.entrySize = B), (G.totalCalculatedSize = this.#K));
            }));
        }
        #P = (A)=>{};
        #y = (A, Q, B)=>{};
        #b = (A, Q, B, G)=>{
            if (B || G) throw TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
            return 0;
        };
        *#O({ allowStale: A = this.allowStale } = {}) {
            if (this.#Y) for(let Q = this.#H;;){
                if (!this.#h(Q)) break;
                if (A || !this.#U(Q)) yield Q;
                if (Q === this.#F) break;
                else Q = this.#C[Q];
            }
        }
        *#M({ allowStale: A = this.allowStale } = {}) {
            if (this.#Y) for(let Q = this.#F;;){
                if (!this.#h(Q)) break;
                if (A || !this.#U(Q)) yield Q;
                if (Q === this.#H) break;
                else Q = this.#E[Q];
            }
        }
        #h(A) {
            return A !== void 0 && this.#V.get(this.#I[A]) === A;
        }
        *entries() {
            for (let A of this.#O())if (this.#J[A] !== void 0 && this.#I[A] !== void 0 && !this.#W(this.#J[A])) yield [
                this.#I[A],
                this.#J[A]
            ];
        }
        *rentries() {
            for (let A of this.#M())if (this.#J[A] !== void 0 && this.#I[A] !== void 0 && !this.#W(this.#J[A])) yield [
                this.#I[A],
                this.#J[A]
            ];
        }
        *keys() {
            for (let A of this.#O()){
                let Q = this.#I[A];
                if (Q !== void 0 && !this.#W(this.#J[A])) yield Q;
            }
        }
        *rkeys() {
            for (let A of this.#M()){
                let Q = this.#I[A];
                if (Q !== void 0 && !this.#W(this.#J[A])) yield Q;
            }
        }
        *values() {
            for (let A of this.#O())if (this.#J[A] !== void 0 && !this.#W(this.#J[A])) yield this.#J[A];
        }
        *rvalues() {
            for (let A of this.#M())if (this.#J[A] !== void 0 && !this.#W(this.#J[A])) yield this.#J[A];
        }
        [Symbol.iterator]() {
            return this.entries();
        }
        [Symbol.toStringTag] = "LRUCache";
        find(A, Q = {}) {
            for (let B of this.#O()){
                let G = this.#J[B], Z = this.#W(G) ? G.__staleWhileFetching : G;
                if (Z === void 0) continue;
                if (A(Z, this.#I[B], this)) return this.get(this.#I[B], Q);
            }
        }
        forEach(A, Q = this) {
            for (let B of this.#O()){
                let G = this.#J[B], Z = this.#W(G) ? G.__staleWhileFetching : G;
                if (Z === void 0) continue;
                A.call(Q, Z, this.#I[B], this);
            }
        }
        rforEach(A, Q = this) {
            for (let B of this.#M()){
                let G = this.#J[B], Z = this.#W(G) ? G.__staleWhileFetching : G;
                if (Z === void 0) continue;
                A.call(Q, Z, this.#I[B], this);
            }
        }
        purgeStale() {
            let A = !1;
            for (let Q of this.#M({
                allowStale: !0
            }))if (this.#U(Q)) (this.#R(this.#I[Q], "expire"), (A = !0));
            return A;
        }
        info(A) {
            let Q = this.#V.get(A);
            if (Q === void 0) return;
            let B = this.#J[Q], G = this.#W(B) ? B.__staleWhileFetching : B;
            if (G === void 0) return;
            let Z = {
                value: G
            };
            if (this.#$ && this.#N) {
                let Y = this.#$[Q], J = this.#N[Q];
                if (Y && J) {
                    let X = Y - (E5A.now() - J);
                    ((Z.ttl = X), (Z.start = Date.now()));
                }
            }
            if (this.#q) Z.size = this.#q[Q];
            return Z;
        }
        dump() {
            let A = [];
            for (let Q of this.#O({
                allowStale: !0
            })){
                let B = this.#I[Q], G = this.#J[Q], Z = this.#W(G) ? G.__staleWhileFetching : G;
                if (Z === void 0 || B === void 0) continue;
                let Y = {
                    value: Z
                };
                if (this.#$ && this.#N) {
                    Y.ttl = this.#$[Q];
                    let J = E5A.now() - this.#N[Q];
                    Y.start = Math.floor(Date.now() - J);
                }
                if (this.#q) Y.size = this.#q[Q];
                A.unshift([
                    B,
                    Y
                ]);
            }
            return A;
        }
        load(A) {
            this.clear();
            for (let [Q, B] of A){
                if (B.start) {
                    let G = Date.now() - B.start;
                    B.start = E5A.now() - G;
                }
                this.set(Q, B.value, B);
            }
        }
        set(A, Q, B = {}) {
            if (Q === void 0) return (this.delete(A), this);
            let { ttl: G = this.ttl, start: Z, noDisposeOnSet: Y = this.noDisposeOnSet, sizeCalculation: J = this.sizeCalculation, status: X } = B, { noUpdateTTL: I = this.noUpdateTTL } = B, W = this.#b(A, Q, B.size || 0, J);
            if (this.maxEntrySize && W > this.maxEntrySize) {
                if (X) ((X.set = "miss"), (X.maxEntrySizeExceeded = !0));
                return (this.#R(A, "set"), this);
            }
            let K = this.#Y === 0 ? void 0 : this.#V.get(A);
            if (K === void 0) {
                if (((K = this.#Y === 0 ? this.#H : this.#w.length !== 0 ? this.#w.pop() : this.#Y === this.#A ? this.#x(!1) : this.#Y), (this.#I[K] = A), (this.#J[K] = Q), this.#V.set(A, K), (this.#E[this.#H] = K), (this.#C[K] = this.#H), (this.#H = K), this.#Y++, this.#y(K, W, X), X)) X.set = "add";
                I = !1;
            } else {
                this.#S(K);
                let V = this.#J[K];
                if (Q !== V) {
                    if (this.#j && this.#W(V)) {
                        V.__abortController.abort(Error("replaced"));
                        let { __staleWhileFetching: H } = V;
                        if (H !== void 0 && !Y) {
                            if (this.#L) this.#B?.(H, A, "set");
                            if (this.#z) this.#D?.push([
                                H,
                                A,
                                "set"
                            ]);
                        }
                    } else if (!Y) {
                        if (this.#L) this.#B?.(V, A, "set");
                        if (this.#z) this.#D?.push([
                            V,
                            A,
                            "set"
                        ]);
                    }
                    if ((this.#P(K), this.#y(K, W, X), (this.#J[K] = Q), X)) {
                        X.set = "replace";
                        let H = V && this.#W(V) ? V.__staleWhileFetching : V;
                        if (H !== void 0) X.oldValue = H;
                    }
                } else if (X) X.set = "update";
            }
            if (G !== 0 && !this.#$) this.#k();
            if (this.#$) {
                if (!I) this.#f(K, G, Z);
                if (X) this.#_(X, K);
            }
            if (!Y && this.#z && this.#D) {
                let V = this.#D, H;
                while((H = V?.shift()))this.#Z?.(...H);
            }
            return this;
        }
        pop() {
            try {
                while(this.#Y){
                    let A = this.#J[this.#F];
                    if ((this.#x(!0), this.#W(A))) {
                        if (A.__staleWhileFetching) return A.__staleWhileFetching;
                    } else if (A !== void 0) return A;
                }
            } finally{
                if (this.#z && this.#D) {
                    let A = this.#D, Q;
                    while((Q = A?.shift()))this.#Z?.(...Q);
                }
            }
        }
        #x(A) {
            let Q = this.#F, B = this.#I[Q], G = this.#J[Q];
            if (this.#j && this.#W(G)) G.__abortController.abort(Error("evicted"));
            else if (this.#L || this.#z) {
                if (this.#L) this.#B?.(G, B, "evict");
                if (this.#z) this.#D?.push([
                    G,
                    B,
                    "evict"
                ]);
            }
            if ((this.#P(Q), A)) ((this.#I[Q] = void 0), (this.#J[Q] = void 0), this.#w.push(Q));
            if (this.#Y === 1) ((this.#F = this.#H = 0), (this.#w.length = 0));
            else this.#F = this.#E[Q];
            return (this.#V.delete(B), this.#Y--, Q);
        }
        has(A, Q = {}) {
            let { updateAgeOnHas: B = this.updateAgeOnHas, status: G } = Q, Z = this.#V.get(A);
            if (Z !== void 0) {
                let Y = this.#J[Z];
                if (this.#W(Y) && Y.__staleWhileFetching === void 0) return !1;
                if (!this.#U(Z)) {
                    if (B) this.#T(Z);
                    if (G) ((G.has = "hit"), this.#_(G, Z));
                    return !0;
                } else if (G) ((G.has = "stale"), this.#_(G, Z));
            } else if (G) G.has = "miss";
            return !1;
        }
        peek(A, Q = {}) {
            let { allowStale: B = this.allowStale } = Q, G = this.#V.get(A);
            if (G === void 0 || (!B && this.#U(G))) return;
            let Z = this.#J[G];
            return this.#W(Z) ? Z.__staleWhileFetching : Z;
        }
        #v(A, Q, B, G) {
            let Z = Q === void 0 ? void 0 : this.#J[Q];
            if (this.#W(Z)) return Z;
            let Y = new OdA(), { signal: J } = B;
            J?.addEventListener("abort", ()=>Y.abort(J.reason), {
                signal: Y.signal
            });
            let X = {
                signal: Y.signal,
                options: B,
                context: G
            }, I = (F, E = !1)=>{
                let { aborted: z } = Y.signal, $ = B.ignoreFetchAbort && F !== void 0;
                if (B.status) if (z && !E) {
                    if (((B.status.fetchAborted = !0), (B.status.fetchError = Y.signal.reason), $)) B.status.fetchAbortIgnored = !0;
                } else B.status.fetchResolved = !0;
                if (z && !$ && !E) return K(Y.signal.reason);
                let O = H;
                if (this.#J[Q] === H) if (F === void 0) if (O.__staleWhileFetching) this.#J[Q] = O.__staleWhileFetching;
                else this.#R(A, "fetch");
                else {
                    if (B.status) B.status.fetchUpdated = !0;
                    this.set(A, F, X.options);
                }
                return F;
            }, W = (F)=>{
                if (B.status) ((B.status.fetchRejected = !0), (B.status.fetchError = F));
                return K(F);
            }, K = (F)=>{
                let { aborted: E } = Y.signal, z = E && B.allowStaleOnFetchAbort, $ = z || B.allowStaleOnFetchRejection, O = $ || B.noDeleteOnFetchRejection, N = H;
                if (this.#J[Q] === H) {
                    if (!O || N.__staleWhileFetching === void 0) this.#R(A, "fetch");
                    else if (!z) this.#J[Q] = N.__staleWhileFetching;
                }
                if ($) {
                    if (B.status && N.__staleWhileFetching !== void 0) B.status.returnedStale = !0;
                    return N.__staleWhileFetching;
                } else if (N.__returned === N) throw F;
            }, V = (F, E)=>{
                let z = this.#G?.(A, Z, X);
                if (z && z instanceof Promise) z.then(($)=>F($ === void 0 ? void 0 : $), E);
                Y.signal.addEventListener("abort", ()=>{
                    if (!B.ignoreFetchAbort || B.allowStaleOnFetchAbort) {
                        if ((F(void 0), B.allowStaleOnFetchAbort)) F = ($)=>I($, !0);
                    }
                });
            };
            if (B.status) B.status.fetchDispatched = !0;
            let H = new Promise(V).then(I, W), D = Object.assign(H, {
                __abortController: Y,
                __staleWhileFetching: Z,
                __returned: void 0
            });
            if (Q === void 0) (this.set(A, D, {
                ...X.options,
                status: void 0
            }), (Q = this.#V.get(A)));
            else this.#J[Q] = D;
            return D;
        }
        #W(A) {
            if (!this.#j) return !1;
            let Q = A;
            return (!!Q && Q instanceof Promise && Q.hasOwnProperty("__staleWhileFetching") && Q.__abortController instanceof OdA);
        }
        async fetch(A, Q = {}) {
            let { allowStale: B = this.allowStale, updateAgeOnGet: G = this.updateAgeOnGet, noDeleteOnStaleGet: Z = this.noDeleteOnStaleGet, ttl: Y = this.ttl, noDisposeOnSet: J = this.noDisposeOnSet, size: X = 0, sizeCalculation: I = this.sizeCalculation, noUpdateTTL: W = this.noUpdateTTL, noDeleteOnFetchRejection: K = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection: V = this.allowStaleOnFetchRejection, ignoreFetchAbort: H = this.ignoreFetchAbort, allowStaleOnFetchAbort: D = this.allowStaleOnFetchAbort, context: F, forceRefresh: E = !1, status: z, signal: $ } = Q;
            if (!this.#j) {
                if (z) z.fetch = "get";
                return this.get(A, {
                    allowStale: B,
                    updateAgeOnGet: G,
                    noDeleteOnStaleGet: Z,
                    status: z
                });
            }
            let O = {
                allowStale: B,
                updateAgeOnGet: G,
                noDeleteOnStaleGet: Z,
                ttl: Y,
                noDisposeOnSet: J,
                size: X,
                sizeCalculation: I,
                noUpdateTTL: W,
                noDeleteOnFetchRejection: K,
                allowStaleOnFetchRejection: V,
                allowStaleOnFetchAbort: D,
                ignoreFetchAbort: H,
                status: z,
                signal: $
            }, N = this.#V.get(A);
            if (N === void 0) {
                if (z) z.fetch = "miss";
                let M = this.#v(A, N, O, F);
                return (M.__returned = M);
            } else {
                let M = this.#J[N];
                if (this.#W(M)) {
                    let y = B && M.__staleWhileFetching !== void 0;
                    if (z) {
                        if (((z.fetch = "inflight"), y)) z.returnedStale = !0;
                    }
                    return y ? M.__staleWhileFetching : (M.__returned = M);
                }
                let R = this.#U(N);
                if (!E && !R) {
                    if (z) z.fetch = "hit";
                    if ((this.#S(N), G)) this.#T(N);
                    if (z) this.#_(z, N);
                    return M;
                }
                let j = this.#v(A, N, O, F), f = j.__staleWhileFetching !== void 0 && B;
                if (z) {
                    if (((z.fetch = R ? "stale" : "refresh"), f && R)) z.returnedStale = !0;
                }
                return f ? j.__staleWhileFetching : (j.__returned = j);
            }
        }
        async forceFetch(A, Q = {}) {
            let B = await this.fetch(A, Q);
            if (B === void 0) throw Error("fetch() returned undefined");
            return B;
        }
        memo(A, Q = {}) {
            let B = this.#X;
            if (!B) throw Error("no memoMethod provided to constructor");
            let { context: G, forceRefresh: Z, ...Y } = Q, J = this.get(A, Y);
            if (!Z && J !== void 0) return J;
            let X = B(A, J, {
                options: Y,
                context: G
            });
            return (this.set(A, X, Y), X);
        }
        get(A, Q = {}) {
            let { allowStale: B = this.allowStale, updateAgeOnGet: G = this.updateAgeOnGet, noDeleteOnStaleGet: Z = this.noDeleteOnStaleGet, status: Y } = Q, J = this.#V.get(A);
            if (J !== void 0) {
                let X = this.#J[J], I = this.#W(X);
                if (Y) this.#_(Y, J);
                if (this.#U(J)) {
                    if (Y) Y.get = "stale";
                    if (!I) {
                        if (!Z) this.#R(A, "expire");
                        if (Y && B) Y.returnedStale = !0;
                        return B ? X : void 0;
                    } else {
                        if (Y && B && X.__staleWhileFetching !== void 0) Y.returnedStale = !0;
                        return B ? X.__staleWhileFetching : void 0;
                    }
                } else {
                    if (Y) Y.get = "hit";
                    if (I) return X.__staleWhileFetching;
                    if ((this.#S(J), G)) this.#T(J);
                    return X;
                }
            } else if (Y) Y.get = "miss";
        }
        #g(A, Q) {
            ((this.#C[Q] = A), (this.#E[A] = Q));
        }
        #S(A) {
            if (A !== this.#H) {
                if (A === this.#F) this.#F = this.#E[A];
                else this.#g(this.#C[A], this.#E[A]);
                (this.#g(this.#H, A), (this.#H = A));
            }
        }
        delete(A) {
            return this.#R(A, "delete");
        }
        #R(A, Q) {
            let B = !1;
            if (this.#Y !== 0) {
                let G = this.#V.get(A);
                if (G !== void 0) if (((B = !0), this.#Y === 1)) this.#u(Q);
                else {
                    this.#P(G);
                    let Z = this.#J[G];
                    if (this.#W(Z)) Z.__abortController.abort(Error("deleted"));
                    else if (this.#L || this.#z) {
                        if (this.#L) this.#B?.(Z, A, Q);
                        if (this.#z) this.#D?.push([
                            Z,
                            A,
                            Q
                        ]);
                    }
                    if ((this.#V.delete(A), (this.#I[G] = void 0), (this.#J[G] = void 0), G === this.#H)) this.#H = this.#C[G];
                    else if (G === this.#F) this.#F = this.#E[G];
                    else {
                        let Y = this.#C[G];
                        this.#E[Y] = this.#E[G];
                        let J = this.#E[G];
                        this.#C[J] = this.#C[G];
                    }
                    (this.#Y--, this.#w.push(G));
                }
            }
            if (this.#z && this.#D?.length) {
                let G = this.#D, Z;
                while((Z = G?.shift()))this.#Z?.(...Z);
            }
            return B;
        }
        clear() {
            return this.#u("delete");
        }
        #u(A) {
            for (let Q of this.#M({
                allowStale: !0
            })){
                let B = this.#J[Q];
                if (this.#W(B)) B.__abortController.abort(Error("deleted"));
                else {
                    let G = this.#I[Q];
                    if (this.#L) this.#B?.(B, G, A);
                    if (this.#z) this.#D?.push([
                        B,
                        G,
                        A
                    ]);
                }
            }
            if ((this.#V.clear(), this.#J.fill(void 0), this.#I.fill(void 0), this.#$ && this.#N)) (this.#$.fill(0), this.#N.fill(0));
            if (this.#q) this.#q.fill(0);
            if (((this.#F = 0), (this.#H = 0), (this.#w.length = 0), (this.#K = 0), (this.#Y = 0), this.#z && this.#D)) {
                let Q = this.#D, B;
                while((B = Q?.shift()))this.#Z?.(...B);
            }
        }
    };
});
function SN1(A, Q = 300000) {
    let B = new Map(), G = (...Z)=>{
        let Y = JSON.stringify(Z), J = B.get(Y), X = Date.now();
        if (!J) {
            let I = A(...Z);
            return (B.set(Y, {
                value: I,
                timestamp: X,
                refreshing: !1
            }), I);
        }
        if (J && X - J.timestamp > Q && !J.refreshing) return ((J.refreshing = !0), Promise.resolve().then(()=>{
            let I = A(...Z);
            B.set(Y, {
                value: I,
                timestamp: Date.now(),
                refreshing: !1
            });
        }).catch((I)=>{
            (t(I instanceof Error ? I : Error(String(I))), B.delete(Y));
        }), J.value);
        return B.get(Y).value;
    };
    return ((G.cache = {
        clear: ()=>B.clear()
    }), G);
}
function MdA(A, Q = 300000) {
    let B = new Map(), G = async (...Z)=>{
        let Y = JSON.stringify(Z), J = B.get(Y), X = Date.now();
        if (!J) {
            let I = await A(...Z);
            return (B.set(Y, {
                value: I,
                timestamp: X,
                refreshing: !1
            }), I);
        }
        if (J && X - J.timestamp > Q && !J.refreshing) return ((J.refreshing = !0), A(...Z).then((I)=>{
            B.set(Y, {
                value: I,
                timestamp: Date.now(),
                refreshing: !1
            });
        }).catch((I)=>{
            (t(I instanceof Error ? I : Error(String(I))), B.delete(Y));
        }), J.value);
        return B.get(Y).value;
    };
    return ((G.cache = {
        clear: ()=>B.clear()
    }), G);
}
