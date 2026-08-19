# Upstream Open Source Contributions

A verifiable record of my contributions to open-source projects maintained by third-party organizations.

This page intentionally excludes repositories I own or maintain. It focuses on upstream engineering work: contributions submitted to external projects, their review state, and the technical impact of the work.

## At a glance

| Ecosystem | Repository | Contribution | Status |
|---|---|---|---|
| WordPress | `WordPress/presence-api` | [PR #193](https://github.com/WordPress/presence-api/pull/193) | **Merged** |
| WooCommerce | `woocommerce/woocommerce` | [PR #67645](https://github.com/woocommerce/woocommerce/pull/67645) | **Open / review** |
| WooCommerce | `woocommerce/woocommerce` | [PR #67495](https://github.com/woocommerce/woocommerce/pull/67495) | **Draft / changes requested** |
| WooCommerce | `woocommerce/woocommerce` | [PR #67764](https://github.com/woocommerce/woocommerce/pull/67764) | **Draft** |
| WordPress plugin | `mukeshpanchal27/easy-author-avatar-image` | [PR #51](https://github.com/mukeshpanchal27/easy-author-avatar-image/pull/51) | **Open / review** |
| Web / AI tooling | `laravelcompany/ecudocs.com` | [PR #4](https://github.com/laravelcompany/ecudocs.com/pull/4) | **Closed without merge** |

## Merged contributions

### WordPress Presence API — remove MySQL session mutation and `GROUP_CONCAT` dependency

**Repository:** [`WordPress/presence-api`](https://github.com/WordPress/presence-api)  
**Pull request:** [#193 — replace GROUP_CONCAT session mutations with PHP aggregation](https://github.com/WordPress/presence-api/pull/193)  
**Status:** **Merged into `main`**  
**Related issue:** [#133](https://github.com/WordPress/presence-api/issues/133)

Improved database portability and reliability for the WordPress Presence API by replacing session-level MySQL mutations and `GROUP_CONCAT()` aggregation with deterministic aggregation in PHP.

Technical work included:

- removing the dependency on `SET SESSION group_concat_max_len`;
- avoiding silent `GROUP_CONCAT()` truncation for rooms with many users;
- aggregating entry and distinct-user counts in PHP;
- preserving active-room ordering by entry count with a deterministic room-name tie-breaker;
- deduplicating users without relying on SQL string aggregation;
- adding regression coverage for room ordering and user deduplication;
- validating the change with WordPress coding standards, PHPStan and PHP syntax checks.

**Why it matters:** managed databases and database proxies may restrict session mutations or fail to preserve session state consistently. The merged implementation removes that operational dependency while preserving the Presence API behavior.

## Contributions under review

### WooCommerce — bulk webhook status management

**Repository:** [`woocommerce/woocommerce`](https://github.com/woocommerce/woocommerce)  
**Pull request:** [#67645 — Add bulk actions for webhook status](https://github.com/woocommerce/woocommerce/pull/67645)  
**Status:** **Open / upstream review**  
**Related issue:** [#66827](https://github.com/woocommerce/woocommerce/issues/66827)

Adds bulk **Activate**, **Pause**, and **Deactivate** actions to WooCommerce webhook administration.

The contribution covers:

- bulk status transitions in the admin UI;
- persistence through the existing webhook model;
- preservation of the current list filter;
- success notices reporting the number of updated webhooks;
- initial-ping behavior when activating eligible webhooks;
- end-to-end coverage for `disabled → active → paused → disabled`.

Automated review feedback about sending the initial webhook ping during bulk activation was addressed in the branch, and the corresponding review thread is resolved. The PR remains open for upstream review.

### WooCommerce — coupon handling for customerless order types

**Repository:** [`woocommerce/woocommerce`](https://github.com/woocommerce/woocommerce)  
**Pull request:** [#67495 — Fix coupon checks for customerless order types](https://github.com/woocommerce/woocommerce/pull/67495)  
**Status:** **Draft / changes requested after review**  
**Related issue:** [#30922](https://github.com/woocommerce/woocommerce/issues/30922)

Addresses an assumption in `WC_Abstract_Order::apply_coupon()` that every descendant exposes `get_customer_id()`.

The original proposal prevents custom customerless order types from failing on an undefined method call and adds regression coverage. Review identified two important follow-up requirements that must be addressed before requesting final upstream review:

- customerless orders must still execute the existing billing-email `usage_limit_per_user` validation, so absence of `get_customer_id()` should behave like a guest customer ID of `0` rather than skipping the check;
- capability detection should use `is_callable()` instead of `method_exists()` so an inaccessible/private descendant method cannot pass the guard and then trigger a fatal call.

The PR was intentionally returned to draft while these review findings remain unresolved. This keeps the upstream state honest and avoids presenting a known-incomplete implementation as ready for maintainer review.

### WooCommerce — reusable product-name CSS class

**Repository:** [`woocommerce/woocommerce`](https://github.com/woocommerce/woocommerce)  
**Pull request:** [#67764 — Add product name CSS class to checkout and emails](https://github.com/woocommerce/woocommerce/pull/67764)  
**Status:** **Draft**  
**Related issue:** [#29386](https://github.com/woocommerce/woocommerce/issues/29386)

Adds a consistent `wc-product-name` CSS class to product-name markup in the classic checkout and WooCommerce order emails.

The proposal is intentionally additive and keeps existing hooks and filter arguments unchanged while giving themes and integrations a stable selector for styling product names independently from quantity and item metadata.

### Easy Author Avatar Image — publish minimum platform requirements

**Repository:** [`mukeshpanchal27/easy-author-avatar-image`](https://github.com/mukeshpanchal27/easy-author-avatar-image)  
**Pull request:** [#51 — Add WordPress and PHP requirements to readme](https://github.com/mukeshpanchal27/easy-author-avatar-image/pull/51)  
**Status:** **Open / upstream review**  
**Related issue:** [#42](https://github.com/mukeshpanchal27/easy-author-avatar-image/issues/42)

Synchronizes the WordPress.org `readme.txt` compatibility headers with the minimum versions already declared by the plugin itself:

- `Requires at least: 6.8`;
- `Requires PHP: 7.4`.

The patch intentionally changes only two metadata lines so WordPress.org can expose accurate installation requirements without changing plugin behavior.

## Closed without merge

### ECU Docs — validated AI-assisted manufacturer content pipeline

**Repository:** [`laravelcompany/ecudocs.com`](https://github.com/laravelcompany/ecudocs.com)  
**Pull request:** [#4 — Improve manufacturer content with validated AI-assisted enrichment](https://github.com/laravelcompany/ecudocs.com/pull/4)  
**Status:** **Closed without merge**

Explored a safer manufacturer-content workflow for the Astro-based ECU Docs project, separating AI generation from reviewed production data and adding validation, provenance, staged promotion, SEO metadata and safe internal-link checks.

Maintainer feedback correctly identified that the first implementation introduced a parallel AI integration instead of extending the project's existing `fetch-autoevolution.mjs` workflow. The fork was subsequently corrected to reuse the existing generation endpoint and project context, and the updated flow was validated against the real endpoint and production build. The upstream effort was nevertheless ended by the maintainer and was not resubmitted.

**Why it matters:** this is intentionally recorded as **closed without merge**, not as an accepted contribution. The main engineering lesson was to preserve and extend an established project workflow before introducing a parallel abstraction, even when the parallel design has stronger validation or safety properties.

## Upstream investigations

### Superpowers — Hermes delegation/runtime contract drift

**Repository:** [`obra/superpowers`](https://github.com/obra/superpowers)  
**Issue:** [#2157 — Hermes tool mapping uses stale names and an unqualified plugin skill name](https://github.com/obra/superpowers/issues/2157)  
**Status:** **Issue investigation / patch prepared; no PR submitted**  
**Working branch:** [`asllanmaciel:fix/2157-hermes-tool-mapping`](https://github.com/asllanmaciel/superpowers/tree/fix/2157-hermes-tool-mapping)

Investigated the Hermes-specific tool mapping against both the exact Hermes v0.20.1 commit reported by the issue (`165c889e`) and current Hermes `main`.

The investigation found an important version-contract distinction:

- the pinned v0.20.1 runtime explicitly states that `delegate_task` has no model-facing toolset-selection argument and that subagents inherit the parent's enabled capabilities;
- `enabled_toolsets` belongs to Hermes runtime/agent configuration rather than that delegation-tool schema;
- newer Hermes builds have since exposed optional `toolsets` again, so hard-coding `enabled_toolsets` would not be a robust compatibility fix;
- the safer baseline for the affected runtime is `delegate_task(goal=..., context=..., role="leaf")`, with optional controls taken from the live tool schema;
- Superpowers' own Hermes bootstrap already documents namespaced skill loading (`skill_view("superpowers:brainstorming")`), while the shipped Hermes mapping still shows an unqualified skill name;
- web/search guidance should remain capability-aware because those toolsets are not guaranteed in every session.

The findings were posted directly on upstream issue #2157 with permanent links to the pinned Hermes source and current delegation implementation. The fork patch and regression assertions were updated accordingly.

A pull request has intentionally **not** been opened yet because Superpowers' PR template requires a human partner to review the complete proposed diff before submission. Keeping this separate from merged/open-PR entries avoids presenting preparatory work as an accepted code contribution.

## Contribution standards

I treat upstream contribution as engineering work rather than activity metrics.

My contribution workflow prioritizes:

- an existing issue or clearly reproducible problem;
- understanding project conventions before changing code;
- focused patches with limited blast radius;
- regression tests when behavior changes;
- static analysis and project-specific quality checks when available;
- explicit testing instructions for maintainers;
- transparent disclosure when AI-assisted development tools are used;
- maintainer feedback as part of the engineering process;
- clear separation between **merged**, **open**, **draft**, and **closed without merge** work.

## Scope

This record contains only contributions to repositories maintained by third parties. My own open-source projects and maintained repositories are documented separately in [`OPEN_SOURCE.md`](OPEN_SOURCE.md).

Contribution status is intentionally stated explicitly and should be updated as upstream reviews progress.
