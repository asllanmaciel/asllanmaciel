# Open Source Portfolio

A curated view of the public engineering work I maintain or contribute to across WordPress, WooCommerce, PHP, Laravel, developer tooling and API integration.

This page focuses on projects that are intentionally public, independently useful and maintainable outside client or commercial product code.

## Maturity at a glance

| Project / contribution | Current state | Next gate |
|---|---|---|
| WP24H Plugin Boilerplate | Public release `v1.0.0` | Maintenance, adoption and contributor feedback |
| WP Plugin README Validator | Public release `v1.0.0`; stable Action alias `v1` | Adoption, contributor feedback and future compatible v1 releases |
| Laravel SaaS Blueprint | Public release `v0.1.0` | Continue practical architecture documentation |
| GitHub Webhook Security Guide | Public release `v0.1.0` | Community examples and security guidance |
| BIBLIAAPI Examples | Public release `v0.1.0` | Additional language examples and resilient-client guidance |
| WP24H MD Importer | Public plugin version `1.2.0`, no GitHub Release yet | Owner decision + runtime + verified ZIP before first GitHub release |
| WooCommerce PR #67645 | Upstream review | Maintainer review / upstream merge |
| PHP Modern Patterns | Private incubation | `composer smoke` from a clean checkout before public visibility |
| WP24H WordPress CRUD Example | Private incubation | Disposable WordPress runtime smoke + visual admin check before public visibility |

A version in source code is not treated as a public release until the repository's release gate is actually completed.

## WordPress engineering

### [WP24H Plugin Boilerplate](https://github.com/WP24Horas/wp24h-plugin-boilerplate)

Modern WordPress plugin starter focused on production-minded architecture rather than manual search/replace scaffolding.

**Stable release: [v1.0.0](https://github.com/WP24Horas/wp24h-plugin-boilerplate/releases/tag/v1.0.0)**

The first stable release passed documented clean-checkout, static-analysis, test, scaffold, WordPress runtime, generated-plugin, release-ZIP verification and clean-artifact-installation gates. The full evidence is versioned in `RELEASE_VALIDATION_REPORT.md`.

Highlights:

- modular plugin architecture with explicit module contracts;
- Settings API and configurable feature modules;
- public and capability-protected REST examples;
- Site Health diagnostics example;
- PHPCS, PHPStan and PHPUnit/Brain Monkey;
- local `wp-env` support;
- reproducible and structurally verified release ZIP tooling in Bash and PowerShell;
- safe plugin scaffolder with deterministic identity replacement;
- generated-project ownership metadata kept neutral;
- `composer make:module` to generate a module and its unit test;
- smoke coverage for boilerplate → generated plugin → generated module;
- lifecycle-safe translation handling that preserves early module registration.

### [WP Plugin README Validator](https://github.com/asllanmaciel/wp-plugin-readme-validator)

Dependency-light CLI and GitHub Action for detecting inconsistencies between a WordPress plugin header and `readme.txt` before distribution.

**Stable release: [v1.0.0](https://github.com/asllanmaciel/wp-plugin-readme-validator/releases/tag/v1.0.0)** · consumers can use `asllanmaciel/wp-plugin-readme-validator@v1`.

The stable release passed PHP 8.1–8.4 compatibility, PHPStan, PHPUnit, CLI contract, JSON-output, Action command-contract and security gates. Its parser preserves WordPress's raw 8192-byte plugin-header boundary before BOM removal/line-ending normalization, supports LF/CRLF/lone-CR/BOM and preserves first-occurrence semantics for duplicate headers.

Highlights:

- deterministic metadata validation;
- WordPress/PHP requirement consistency;
- first-8-KB raw plugin-header behavior aligned with WordPress;
- CRLF / lone-CR / UTF-8 BOM resilience;
- duplicate headers preserve first occurrence;
- safe composite Action input handling through environment variables;
- stable `v1` Action alias aligned to the `v1.0.0` release commit;
- local validation without requiring automatic CI on every push.

### [WP24H MD Importer](https://github.com/asllanmaciel/wp24h-md-importer)

Markdown + front matter importer for WordPress with taxonomy, featured-image, SEO metadata and optional authenticated REST automation.

The project is also used as a real-world reference for capability checks, media handling, REST permissions, content automation and verified release packaging.

## PHP and Laravel

### [Laravel SaaS Blueprint](https://github.com/asllanmaciel/laravel-saas-blueprint)

Architecture reference for building SaaS products with Laravel while keeping implementation choices replaceable.

Covered areas include:

- tenant isolation;
- billing adapters;
- jobs and webhook processing;
- security boundaries;
- observability;
- backup / restore operations;
- operations and MVP readiness.

The repository has a public `v0.1.0` release and contribution entry points for practical documentation improvements.

### PHP Modern Patterns

`php-modern-patterns` is being prepared privately before its first public version. The publication gate requires clean-checkout reproducibility instead of opening the repository merely because the source files exist.

The initial catalog focuses on small executable examples of:

- DTO → application service → domain/value object → ports/adapters;
- domain invariants enforced by domain objects;
- explicit ID generation boundaries;
- deterministic time through a `Clock` port;
- PHPUnit and PHPStan-backed examples.

## Security and developer tooling

### [GitHub Webhook Security Guide](https://github.com/asllanmaciel/github-webhook-security-guide)

Practical PHP and Node.js examples for validating GitHub webhook signatures with HMAC SHA-256 and avoiding unsafe request-body transformations, with idempotency and receiver threat-model guidance.

### [BIBLIAAPI Examples](https://github.com/asllanmaciel/bibliaapi-examples)

Small integration examples showing token-based API consumption from cURL, PHP and JavaScript with environment-variable handling, resilient-client guidance and reproducible setup.

## Upstream contributions

### WordPress Presence API — merged

[PR #193](https://github.com/WordPress/presence-api/pull/193)

Merged contribution improving database portability by replacing MySQL session mutation / `GROUP_CONCAT` aggregation with deterministic PHP aggregation and regression coverage.

### WooCommerce — active review

[PR #67645](https://github.com/woocommerce/woocommerce/pull/67645)

Community contribution adding bulk webhook-status management in the WooCommerce admin.

The current patch covers the full requested status flow — **Activate, Pause and Deactivate** — preserves list filters, reports update counts, keeps bulk activation aligned with the existing initial-ping behavior, and includes end-to-end coverage for `disabled → active → paused → disabled`.

## WP24Horas Open Source

[github.com/WP24Horas](https://github.com/WP24Horas)

The organization is curated as a developer-facing WordPress engineering space. Historical experiments and old forks are archived instead of competing with maintained projects in the active portfolio.

The organization-level `.github` repository provides default contribution, security, support, governance, pull-request and issue-template guidance for repositories that do not define project-specific versions.

The flagship WP24H Plugin Boilerplate has a validated public `v1.0.0` release, and the related WP Plugin README Validator now has its own stable `v1.0.0` release plus `@v1` consumer alias. New public projects are expected to pass the same kind of security, documentation, reproducibility and runtime gates before being promoted as maintained references.

## Maintenance principles

Public repositories should earn their place in this portfolio.

The working rules are:

- prefer a small number of strong repositories over repository count;
- do not publish client or commercial product code as portfolio material;
- keep security, contribution and release expectations explicit;
- validate locally first and use CI deliberately;
- do not create releases before runtime/reproducibility evidence exists;
- create real `good first issue` / `help wanted` entry points instead of decorative labels;
- keep historical code archived when it no longer reflects current engineering practice;
- treat upstream contributions as engineering work, not activity metrics.

## Current maturity gates

The next meaningful milestones are:

1. maintain and gather adoption feedback for WP24H Plugin Boilerplate `v1.0.0`;
2. maintain and gather adoption feedback for WP Plugin README Validator `v1.0.0` / `@v1`;
3. decide the final owner and complete runtime/release validation for WP24H MD Importer;
4. complete runtime checks for the private WordPress CRUD example;
5. complete clean-checkout `composer smoke` validation for `php-modern-patterns` before public visibility;
6. continue upstream contribution work in WordPress/WooCommerce without opening unnecessary parallel PRs.
