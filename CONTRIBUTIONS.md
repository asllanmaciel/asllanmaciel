# Upstream Open Source Contributions

A verifiable record of my contributions to open-source projects maintained by third-party organizations.

This page intentionally excludes repositories I own or maintain. It focuses on upstream engineering work: contributions submitted to external projects, their review state, and the technical impact and lessons of the work.

## At a glance

| Ecosystem | Repository | Contribution | Status |
|---|---|---|---|
| WordPress | `WordPress/presence-api` | [PR #193](https://github.com/WordPress/presence-api/pull/193) | **Merged** |
| WooCommerce | `woocommerce/woocommerce` | [PR #67645](https://github.com/woocommerce/woocommerce/pull/67645) | **Open / review** |
| WooCommerce | `woocommerce/woocommerce` | [PR #67495](https://github.com/woocommerce/woocommerce/pull/67495) | **Closed without merge** |
| WooCommerce | `woocommerce/woocommerce` | [PR #67764](https://github.com/woocommerce/woocommerce/pull/67764) | **Merged** |
| PHP / PDF | `dompdf/dompdf` | [PR #3750](https://github.com/dompdf/dompdf/pull/3750) | **Open / review â€” approved** |
| PHP / PDF | `dompdf/dompdf` | [PR #3757](https://github.com/dompdf/dompdf/pull/3757) | **Open / review** |
| WordPress plugin | `mukeshpanchal27/easy-author-avatar-image` | [PR #51](https://github.com/mukeshpanchal27/easy-author-avatar-image/pull/51) | **Open / review** |
| PHP / Web Push | `web-push-libs/web-push-php` | [PR #462](https://github.com/web-push-libs/web-push-php/pull/462) | **Open / review** |
| PHP / Markdown | `thephpleague/commonmark` | [PR #1152](https://github.com/thephpleague/commonmark/pull/1152) | **Open / review** |
| AI / Developer tooling | `microsoft/skills` | [PR #430](https://github.com/microsoft/skills/pull/430) | **Open / review** |
| PHP / Testing | `pestphp/pest-plugin-browser` | [PR #256](https://github.com/pestphp/pest-plugin-browser/pull/256) | **Open / review** |
| Web / AI tooling | `laravelcompany/ecudocs.com` | [PR #4](https://github.com/laravelcompany/ecudocs.com/pull/4) | **Closed without merge** |

## Merged contributions

### WordPress Presence API â€” remove MySQL session mutation and `GROUP_CONCAT` dependency

**Repository:** [`WordPress/presence-api`](https://github.com/WordPress/presence-api)  
**Pull request:** [#193 â€” replace GROUP_CONCAT session mutations with PHP aggregation](https://github.com/WordPress/presence-api/pull/193)  
**Status:** **Merged into `main`**  
**Related issue:** [#133](https://github.com/WordPress/presence-api/issues/133)

Improved database portability and reliability by replacing session-level MySQL mutations and `GROUP_CONCAT()` aggregation with deterministic aggregation in PHP.

Technical work included:

- removing the dependency on `SET SESSION group_concat_max_len`;
- avoiding silent `GROUP_CONCAT()` truncation for rooms with many users;
- aggregating entry and distinct-user counts in PHP;
- preserving active-room ordering with a deterministic tie-breaker;
- deduplicating users without SQL string aggregation;
- adding regression coverage;
- validating with WordPress coding standards, PHPStan and PHP syntax checks.

**Why it matters:** managed databases and database proxies may restrict session mutations or fail to preserve session state consistently. The merged implementation removes that operational dependency while preserving the Presence API behavior.

### WooCommerce â€” reusable product-name CSS class

**Repository:** [`woocommerce/woocommerce`](https://github.com/woocommerce/woocommerce)  
**Pull request:** [#67764 â€” Add product name CSS class to improved emails](https://github.com/woocommerce/woocommerce/pull/67764)  
**Status:** **Merged into `trunk` on 1 September 2026**  
**Related issue:** [#29386](https://github.com/woocommerce/woocommerce/issues/29386)  
**Merge commit:** [`4224c255`](https://github.com/woocommerce/woocommerce/commit/4224c2551054c12fb97cfb7bffc1a62c5fdcd207)

The final scoped change adds a reusable `wc-product-name` class to the existing product-name `h3` in WooCommerce's improved HTML order emails, without changing the rendered content, element hierarchy, hooks, filter arguments, checkout markup or legacy email markup.

The initial proposal was broader and also considered wrappers around product-name filter output. During maintainer review, ecosystem usage showed why that was unsafe: Composite Products can return block-level `<dl>` markup, while Product Bundles can add `<br>`, links and `<small>` elements. A generic core wrapper could therefore alter or invalidate extension output. The maintainer pushed a narrowing commit, approved the resulting additive change, and merged the class-name-only scope on 1 September 2026 for the WooCommerce 11.2.0 milestone.

Validation recorded on the PR includes PHP syntax, changed-line PHPCS, `git diff --check`, and an ecosystem compatibility review across WooCommerce/Automattic code. Runtime email rendering was not claimed as locally tested. The final diff was reviewed by a human maintainer.

**Why it matters:** the review turned a seemingly simple markup request into a concrete compatibility lesson: reusable selectors are valuable, but wrappers around extensible filter output can break third-party HTML contracts. The accepted direction minimizes blast radius by attaching the class only to markup core already owns.

## Contributions under review

### Dompdf â€” encrypted embedded-file creation metadata

**Repository:** [`dompdf/dompdf`](https://github.com/dompdf/dompdf)  
**Pull request:** [#3750 â€” Fix encrypted embedded file creation date](https://github.com/dompdf/dompdf/pull/3750)  
**Status:** **Open / upstream review â€” maintainer approved**  
**Related issue:** [#3747](https://github.com/dompdf/dompdf/issues/3747)

Fixes an undefined-variable warning in the encrypted embedded-file path. The embedded-file creation timestamp is stored in `$created`, but the encryption branch referenced the nonexistent `$creation` variable. The patch encrypts the correct value and adds a focused regression test that captures PHP warnings while rendering an encrypted attachment.

TDD evidence was reproduced against the exact previous upstream `master` head `b14267808b811db092f53830f81f4706f4917c79`: the regression test fails before the fix because `Undefined variable $creation` is emitted, then passes after the one-line correction. The complete PHPUnit suite passed with 1,147 tests and 2,893 assertions, along with PHP syntax, PHPCS and `git diff --check` validation. On 2 September 2026, maintainer Brian Sweeney (`bsweeney`) approved the pull request and the upstream `Unit Tests` workflow completed successfully. The PR remains open and is recorded as awaiting upstream merge rather than as merged.

**Why it matters:** even a one-character variable mismatch can become a production warning only on a narrow combination of PDF encryption and embedded-file metadata. The regression locks that edge path instead of relying on the obviousness of the source-level typo.

### Dompdf â€” keep DOM processing instructions out of the frame tree

**Repository:** [`dompdf/dompdf`](https://github.com/dompdf/dompdf)  
**Pull request:** [#3757 â€” Fix handling of DOM processing instructions](https://github.com/dompdf/dompdf/pull/3757)  
**Status:** **Open / upstream review**  
**Related issue:** [#3689](https://github.com/dompdf/dompdf/issues/3689)

Fixes a fatal path where a `DOMProcessingInstruction` could enter dompdf's frame tree and later be treated like an HTML element, leading to a call to the nonexistent `getAttribute()` method on that DOM node type. The patch rejects processing instructions at frame creation, before styling, callbacks or rendering, and adds a regression test covering a document that contains a processing instruction.

The focused regression passes after the fix, and the complete local PHPUnit suite passed with 1,147 tests and 2,892 assertions, together with PHP syntax, PHPCS on changed files and `git diff --check`. The pull request was opened upstream on 4 September 2026 and is mergeable. As of 7 September 2026 it has no maintainer review or discussion yet. The upstream `Unit Tests` workflow is marked `action_required` with no executed jobs, so this is recorded as awaiting upstream workflow authorization/review rather than as a test failure.

**Why it matters:** DOM parsers can emit node types that are valid in the DOM but meaningless to a layout engine. Filtering a non-renderable node at the frame-tree boundary is safer than scattering element-capability checks through later rendering paths.

### WooCommerce â€” bulk webhook status management

**Repository:** [`woocommerce/woocommerce`](https://github.com/woocommerce/woocommerce)  
**Pull request:** [#67645 â€” Add bulk actions for webhook status](https://github.com/woocommerce/woocommerce/pull/67645)  
**Status:** **Open / upstream review â€” merge conflict reconciled on 7 September 2026**  
**Related issue:** [#66827](https://github.com/woocommerce/woocommerce/issues/66827)

Adds bulk **Activate**, **Pause**, and **Deactivate** actions to WooCommerce webhook administration, including persistence through the existing webhook model, preservation of the current filter, result notices, initial-ping behavior for eligible activations and end-to-end coverage for `disabled â†’ active â†’ paused â†’ disabled`.

Automated review feedback about the activation path was addressed in the branch. A maintainer review about the E2E migration tag was also addressed by removing the tag while keeping the end-to-end coverage; both review threads are resolved.

On 7 September 2026, the long-running branch had become non-mergeable against current `trunk`. The conflicting upstream change was isolated to WooCommerce's repository-wide replacement of legacy WPCS suppression comments in `class-wc-admin-webhooks-table-list.php`; the other three files touched by this PR had not changed on `trunk` since its merge base. The branch was reconciled by preserving the bulk-status implementation while adopting the current upstream PHPCS suppression form. Head `d5d84a9f58c75c12593ef2915b6517b58dec48d5` is mergeable again. Newly created upstream workflows are currently `action_required` with zero CI jobs, so no CI pass or failure is claimed for this reconciled head yet.

### Easy Author Avatar Image â€” publish minimum platform requirements

**Repository:** [`mukeshpanchal27/easy-author-avatar-image`](https://github.com/mukeshpanchal27/easy-author-avatar-image)  
**Pull request:** [#51 â€” Add WordPress and PHP requirements to readme](https://github.com/mukeshpanchal27/easy-author-avatar-image/pull/51)  
**Status:** **Open / upstream review**  
**Related issue:** [#42](https://github.com/mukeshpanchal27/easy-author-avatar-image/issues/42)

Synchronizes the WordPress.org `readme.txt` compatibility headers with the minimum versions already declared by the plugin itself: `Requires at least: 6.8` and `Requires PHP: 7.4`.

### Web Push PHP â€” remove redundant `ext-json` requirement

**Repository:** [`web-push-libs/web-push-php`](https://github.com/web-push-libs/web-push-php)
**Pull request:** [#462 â€” Remove redundant ext-json requirement](https://github.com/web-push-libs/web-push-php/pull/462)
**Status:** **Open / upstream review**
**Related issue:** [#461](https://github.com/web-push-libs/web-push-php/issues/461)

Removes the obsolete Composer requirement on `ext-json`. The package already requires PHP `>=8.2`, while JSON has been part of PHP core since PHP 8.0 and cannot be disabled, so the extension requirement no longer adds a useful platform constraint.

Fresh verification before submission included `composer validate --strict --no-check-publish`, PHPStan with zero errors, PHP CS Fixer dry runs for source and tests, and `git diff --check`. The offline PHPUnit suite reports one pre-existing data-provider error (`Subscription::__construct()` receiving `false` for the endpoint); the exact same 44 tests / 110 assertions / 1 error / 6 skipped result was reproduced on upstream `master` before the patch, so it is not attributed to this change.

**Why it matters:** stale platform requirements make dependency metadata noisier and can mislead consumers about what PHP actually requires. This is also a direct dependency used by AMCursos for Web Push/VAPID flows.

### League CommonMark â€” clarify priority ordering and tie behavior

**Repository:** [`thephpleague/commonmark`](https://github.com/thephpleague/commonmark)
**Pull request:** [#1152 â€” docs: clarify priority ordering behavior](https://github.com/thephpleague/commonmark/pull/1152)
**Status:** **Open / upstream review**
**Related issue:** [#1023](https://github.com/thephpleague/commonmark/issues/1023)

Clarifies the customization documentation after maintainer feedback that equal-priority renderers should not rely on registration order. The documentation now explains when explicit priorities are needed for block start parsers, inline parsers and renderers, preserves the documented registration-order exception for equal-priority event listeners, and calls out renderer tie behavior in the rendering guide.

This is a documentation-only change. Verification included `git diff --check` plus consistency checks for the priority anchors, tie guidance and event-listener exception; the submitted branch was one commit ahead and zero behind the maintained `2.10` branch at PR creation.

**Why it matters:** lazy extension initialization can change which same-priority renderer is registered first, so relying on insertion order creates fragile extensions. Explicit priority guidance makes customization behavior easier to reason about and is directly relevant to AMCursos, which uses `league/commonmark`.

### Pest Browser â€” execute Playwright wait commands instead of silently discarding them

**Repository:** [`pestphp/pest-plugin-browser`](https://github.com/pestphp/pest-plugin-browser)  
**Pull request:** [#256 â€” Fix Playwright wait methods not executing commands](https://github.com/pestphp/pest-plugin-browser/pull/256)  
**Status:** **Open / upstream review**  
**Related issue:** [`pestphp/pest#1892`](https://github.com/pestphp/pest/issues/1892)

Fixes a lazy-execution bug in the browser plugin where three wait methods called `Client::execute()` and discarded the returned `Generator`. Because a PHP generator does not execute its body until it is consumed, `waitForLoadState()`, `waitForFunction()` and `waitForURL()` could read like synchronization guards while sending no Playwright command at all.

The patch routes those void commands through the existing `processVoidResponse()` path, which consumes the generator, and adds focused regression coverage asserting the expected Playwright messages. The submitted branch is one commit on top of the current `5.x` head and changes only the page wrapper and the new wait-method regression test.

Preparation included PHP 8.4 syntax validation and an independent reproduction showing that constructing the generator has no side effect while consuming it executes the body. A fresh full Composer matrix was attempted after submission; dependency installation is currently blocked by GitHub authentication in the isolated WSL Composer environment, so no full-suite PASS is claimed from that environment. The upstream Actions run was also created as `action_required` with zero executed jobs, which is treated as workflow authorization rather than a test regression.

**Why it matters:** a synchronization API that silently becomes a no-op creates misleading tests and race conditions that are disproportionately visible in CI. The investigation is directly relevant to browser automation and test reliability taught across AMCursos Labs and DevTools work.

### Microsoft Skills â€” remove broken API Management reference

**Repository:** [`microsoft/skills`](https://github.com/microsoft/skills)
**Pull request:** [#430 â€” fix: remove broken API Management policy reference](https://github.com/microsoft/skills/pull/430)
**Status:** **Open / upstream review**
**Related issue:** [#422](https://github.com/microsoft/skills/issues/422)

Removes a reference to `references/policies.md` from the Azure API Management .NET skill because that file does not exist in the skill's reference directory. The contribution follows the repository's explicit rule to perform GitHub writes through the `gh` CLI.

Fresh verification against the current upstream `main` confirmed that all remaining relative links in the skill resolve, `git diff --check` passes, and the final patch changes one file by removing one line.

**Why it matters:** agent skills are operational documentation consumed as context by coding agents; a dead reference wastes context and sends the agent toward a resource it cannot load. The contribution is also aligned with the AIStack/agent tooling surface taught and used across the user's projects.

## Closed without merge

### WooCommerce â€” coupon handling for customerless order types

**Repository:** [`woocommerce/woocommerce`](https://github.com/woocommerce/woocommerce)  
**Pull request:** [#67495 â€” Fix coupon checks for customerless order types](https://github.com/woocommerce/woocommerce/pull/67495)  
**Status:** **Closed without merge on 31 August 2026**  
**Related issue:** [#30922](https://github.com/woocommerce/woocommerce/issues/30922)

Investigated an assumption in `WC_Abstract_Order::apply_coupon()` that descendants expose customer-specific methods. The work surfaced several useful compatibility details: billing-email usage limits still need to be preserved for guest-like orders, method capability checks must account for visibility/callability, and downstream coupon-usage accounting can make the persistence path part of the regression surface.

The branch went through automated review and a human maintainer review. The maintainer requested a simpler inline capability check, guards around billing-email access in both `apply_coupon()` and `wc_update_coupon_usage_counts()`, and regression coverage for a genuinely customerless custom order type.

The PR was ultimately closed by the maintainer without merge because the implementation and review-response loop appeared to have been delegated primarily to AI agents. For changes touching extension compatibility and merchant/shopper critical paths, the maintainer explicitly required stronger demonstrated human ownership: the contributor must understand, validate, discuss and defend every submitted change. The maintainer left the underlying issue open and invited a fresh PR if the fix is pursued under that contribution model.

**Why it matters:** beyond the code-level findings, this established an important upstream contribution boundary: AI can assist research and validation, but maintainer-facing implementation and review ownership must remain demonstrably with the contributor, especially on critical compatibility paths.

### ECU Docs â€” validated AI-assisted manufacturer content pipeline

**Repository:** [`laravelcompany/ecudocs.com`](https://github.com/laravelcompany/ecudocs.com)  
**Pull request:** [#4 â€” Improve manufacturer content with validated AI-assisted enrichment](https://github.com/laravelcompany/ecudocs.com/pull/4)  
**Status:** **Closed without merge**

Explored a safer manufacturer-content workflow for the Astro-based ECU Docs project, separating AI generation from reviewed production data and adding validation, provenance, staged promotion, SEO metadata and safe internal-link checks.

Maintainer feedback identified that the first implementation introduced a parallel AI integration instead of extending the project's existing `fetch-autoevolution.mjs` workflow. The fork was subsequently corrected to reuse the existing generation endpoint and project context, and the updated flow was validated against the real endpoint and production build. The upstream effort was nevertheless ended by the maintainer and was not resubmitted.

**Why it matters:** this is intentionally recorded as **closed without merge**, not as an accepted contribution. The main engineering lesson was to preserve and extend an established project workflow before introducing a parallel abstraction.

## Upstream investigations

### Superpowers â€” Hermes delegation/runtime contract drift

**Repository:** [`obra/superpowers`](https://github.com/obra/superpowers)  
**Issue:** [#2157 â€” Hermes tool mapping uses stale names and an unqualified plugin skill name](https://github.com/obra/superpowers/issues/2157)  
**Status:** **Upstream investigation; local patch superseded by existing PR #2162; no PR submitted**  
**Working branch:** [`asllanmaciel:fix/2157-hermes-tool-mapping`](https://github.com/asllanmaciel/superpowers/tree/fix/2157-hermes-tool-mapping)  
**Overlapping upstream PR:** [#2162 â€” fix(using-superpowers): correct Hermes tool mapping](https://github.com/obra/superpowers/pull/2162)

Investigated the Hermes-specific tool mapping against both the exact Hermes v0.20.1 commit reported by the issue (`165c889e`) and current Hermes `main`.

The investigation found an important version-contract distinction:

- the pinned v0.20.1 runtime states that `delegate_task` has no model-facing toolset-selection argument and subagents inherit the parent's enabled capabilities;
- `enabled_toolsets` belongs to Hermes runtime/agent configuration rather than that delegation-tool schema;
- newer Hermes builds have since exposed optional `toolsets` again, so hard-coding `enabled_toolsets` would not be a robust compatibility fix;
- the safer baseline for the affected runtime is `delegate_task(goal=..., context=..., role="leaf")`, with optional controls taken from the live tool schema;
- Superpowers' own Hermes bootstrap documents namespaced skill loading while the shipped mapping still showed an unqualified skill name;
- web/search guidance should remain capability-aware because those toolsets are not guaranteed in every session.

A duplicate/prior-art check confirmed upstream PR #2162 already addressed the same issue with substantially the same compatibility-safe approach. The local patch therefore was not submitted upstream.

## Contribution standards

I treat upstream contribution as engineering work rather than activity metrics.

My contribution workflow prioritizes:

- an existing issue or clearly reproducible problem;
- understanding project conventions and contribution rules before changing code;
- focused patches with limited blast radius;
- regression tests when behavior changes;
- static analysis and project-specific quality checks when available;
- explicit testing instructions for maintainers;
- transparent disclosure when AI-assisted development tools are used;
- direct contributor ownership of implementation and maintainer review feedback;
- maintainer feedback as part of the engineering process;
- clear separation between **merged**, **open**, **draft**, and **closed without merge** work.

## Scope

This record contains only contributions to repositories maintained by third parties. My own open-source projects and maintained repositories are documented separately in [`OPEN_SOURCE.md`](OPEN_SOURCE.md).

Contribution status is intentionally stated explicitly and should be updated as upstream reviews progress.
