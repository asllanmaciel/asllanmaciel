# Open Source Portfolio

A curated view of the public engineering work I maintain or contribute to across WordPress, WooCommerce, PHP, Laravel, developer tooling and API integration.

This page focuses on projects that are intentionally public, independently useful and maintainable outside client or commercial product code.

## WordPress engineering

### [WP24H Plugin Boilerplate](https://github.com/WP24Horas/wp24h-plugin-boilerplate)

Modern WordPress plugin starter focused on production-minded architecture rather than manual search/replace scaffolding.

Highlights:

- modular plugin architecture with explicit module contracts;
- Settings API and configurable feature modules;
- public and capability-protected REST examples;
- Site Health diagnostics example;
- PHPCS, PHPStan and PHPUnit/Brain Monkey;
- local `wp-env` support;
- reproducible release ZIP tooling;
- safe plugin scaffolder with deterministic identity replacement;
- generated-project ownership metadata kept neutral;
- `composer make:module` to generate a module and its unit test;
- smoke coverage for boilerplate → generated plugin → generated module.

### [WP Plugin README Validator](https://github.com/asllanmaciel/wp-plugin-readme-validator)

Dependency-light CLI and GitHub Action for detecting inconsistencies between a WordPress plugin header and `readme.txt` before distribution.

Current focus:

- deterministic metadata validation;
- WordPress/PHP requirement consistency;
- stable Action versioning and release discipline;
- local validation without requiring automatic CI on every push.

### [WP24H MD Importer](https://github.com/asllanmaciel/wp24h-md-importer)

Markdown + front matter importer for WordPress with taxonomy, featured-image, SEO metadata and optional authenticated REST automation.

The project is also used as a real-world reference for capability checks, media handling, REST permissions and content automation.

## PHP and Laravel

### [Laravel SaaS Blueprint](https://github.com/asllanmaciel/laravel-saas-blueprint)

Architecture reference for building SaaS products with Laravel while keeping implementation choices replaceable.

Covered areas include:

- tenant isolation;
- billing adapters;
- jobs and webhook processing;
- security boundaries;
- observability;
- operations and MVP readiness.

The repository has a public `v0.1.0` release and contribution entry points for practical documentation improvements.

### PHP Modern Patterns

`php-modern-patterns` is being prepared privately before its first public version. The publication gate requires clean-checkout reproducibility instead of opening the repository merely because the source files exist.

The initial catalog focuses on small executable examples of:

- DTO → application service → domain/value object → ports/adapters;
- explicit ID generation boundaries;
- deterministic time through a `Clock` port;
- PHPUnit and PHPStan-backed examples.

## Security and developer tooling

### [GitHub Webhook Security Guide](https://github.com/asllanmaciel/github-webhook-security-guide)

Practical PHP and Node.js examples for validating GitHub webhook signatures with HMAC SHA-256 and avoiding unsafe request-body transformations.

### [BIBLIAAPI Examples](https://github.com/asllanmaciel/bibliaapi-examples)

Small integration examples showing token-based API consumption from cURL, PHP and JavaScript with environment-variable handling and reproducible setup.

## Upstream contributions

### WordPress Presence API — merged

[PR #193](https://github.com/WordPress/presence-api/pull/193)

Merged contribution improving database portability by replacing MySQL session mutation / `GROUP_CONCAT` aggregation with deterministic PHP aggregation and regression coverage.

### WooCommerce — active review

[PR #67645](https://github.com/woocommerce/woocommerce/pull/67645)

Community contribution adding bulk webhook-status management in the WooCommerce admin. The contribution includes admin behavior, status persistence, notices and end-to-end coverage.

The linked enhancement explicitly includes WooCommerce's existing webhook states (`active`, `paused`, `disabled`), so the final contribution should cover the requested status transitions rather than invent a new status model.

## WP24Horas Open Source

[github.com/WP24Horas](https://github.com/WP24Horas)

The organization is being curated as a developer-facing WordPress engineering space. Historical experiments and old forks are archived instead of competing with maintained projects in the active portfolio.

The flagship project is the WP24H Plugin Boilerplate; new public projects are expected to pass security, documentation, reproducibility and runtime gates before being promoted as maintained references.

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

1. publish the first validated `v1.0.0` of WP24H Plugin Boilerplate;
2. publish the first stable `v1.0.0` of WP Plugin README Validator and align the floating `v1` Action ref;
3. complete runtime checks for the private WordPress CRUD example;
4. complete clean-checkout smoke validation for `php-modern-patterns` before public visibility;
5. continue upstream contribution work in WordPress/WooCommerce without opening unnecessary parallel PRs.
