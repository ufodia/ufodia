# Search and AI visibility check — 2026-11-15

Production: https://selimoglu.org/ (English) and https://selimoglu.org/tr/ (Turkish). Observations below were made in the actual provider browser interfaces on 15 November 2026, Europe/Istanbul. They are a point-in-time baseline, not a ranking survey.

## Bing Webmaster Tools

- Added the HTTPS URL-prefix property manually and completed ownership verification. The interface confirmed successful site addition.
- Published Bing's public `BingSiteAuth.xml` at the document root. Its live response was HTTP 200, `application/xml`, 85 bytes, with the same SHA-256 as the repository copy: `1f8e6ee4a82223f7700ae60a5e116640c3f93257298a3fb0a3d203e570c0d53d`.
- The verification file and conditional inclusion in the public deployment package are integrated into main in commit `d84fa601efb75572cb17d2430022ff2557cde942`.
- Submitted https://selimoglu.org/sitemap.xml. After an initial Processing state, the Sitemaps interface read back **Success**, **2 URLs discovered**, **0 errors**, **0 warnings**, with submission and last crawl dated **11/15/2026**.
- Submitted the English and Turkish canonical page URLs through URL Submission. Both appeared in the submitted list at **22:34 Europe/Istanbul**, with **2 URLs submitted today**. This requests crawling; it does not prove indexing or an immediate AI-answer refresh.
- The new property's AI Performance report showed **No data available** for its default three-month range. This is not evidence of zero citations across all Microsoft experiences. The Home interface noted that newly processed reports can take up to 48 hours to appear.
- Used the authorized Google sign-in for Bing with basic profile information. Verification used the public XML file; no Search Console import connection or ongoing Search Console access was granted.

[Bing sitemap dashboard](https://www.bing.com/webmasters/sitemaps?siteUrl=https://selimoglu.org/) requires the authorized signed-in account. Verification, sitemap discovery, page indexing and AI citation refresh are separate milestones. Success with two discovered URLs does **not** mean two indexed URLs.

## Google Search Console read-back

Checked the existing production property after the verification-file deployment. The existing `/sitemap.xml` row remained **Başarılı / Successful**, with **2 discovered pages**, submission and last read **15 Nov 2026**. The public page content was unchanged by this Bing setup, so no duplicate Google indexing requests were issued. Earlier page inspection and accepted indexing requests are recorded in [the website audit](AUDIT-2026-11-15.md).

## Actual AI search tests

Each service received this brand query first, without supplying the website address:

> What is Selimoglu Idea Foundry? Describe what it builds and cite the public sources you used.

Each then received the same explicit-address follow-up in that conversation:

> Open https://selimoglu.org/ and check the current page. Which projects are listed there? Cite that page, and distinguish its current content from any older search snippet.

| Service and tested mode | Brand query, without domain | Follow-up with domain |
| --- | --- | --- |
| ChatGPT, temporary non-personalized chat, Pro, Web Search selected | Did not reliably identify the brand or cite selimoglu.org. It described similarly named unrelated sources and explicitly withheld attribution. | Cited the current homepage and correctly listed all 12 projects. Distinguished the current Ideas take shape page from an older retrieved İştiraklerimiz version. |
| Bing Copilot Search, public guest AI search | Did not cite selimoglu.org. Discussed unrelated Selimoğlu furniture and Idea Foundry organizations. | Cited selimoglu.org but incorrectly described the old İştiraklerimiz page as current and said there were no projects. That description conflicts with the deployed 12-project page. The underlying retrieval/cache cause was not established. |
| Perplexity, guest Search | Cited selimoglu.org with the older Ideas in the making title/general snippet, but did not describe the current project catalog. It also incorrectly connected the brand to an unrelated person, Bilgin Selimoğlu. This association must not be repeated as a fact about the site. | Cited the homepage and correctly listed all 12 projects and their public scope. Distinguished the current content from the older generic snippet, although citation labels still showed the older title. |

The project list retrieved by ChatGPT and Perplexity was Decision Recheck, IntentWeft, Sheet Sentry, CutOnce, Agent Crash Lab, Handrail, Boss Rehearsal, Fact Fuse, Invented Detail, LocaleCrash, Paper Surgery and Memory Mirror.

Standalone Copilot chat required Microsoft sign-in and was **not** tested. The Copilot result above is specifically **Bing Copilot Search**, a different Microsoft surface. ChatGPT's test used the non-personalized temporary-chat option; no existing user draft was sent or lost. The two guest services were used without signing into additional accounts.

### Result references and limits

- [Bing Copilot Search query](https://www.bing.com/copilotsearch?q=What+is+Selimoglu+Idea+Foundry%3F+Describe+what+it+builds+and+cite+the+public+sources+you+used.) can rerun the query; it is not an immutable transcript.
- [Perplexity guest session](https://www.perplexity.ai/session/3a7f5aa3-f876-4a17-beb1-ff39a84dc104) may depend on the original browser session and may not remain publicly accessible.
- ChatGPT was a temporary chat, so there is no durable public transcript link. Results above were read from the completed responses in the actual interface.
- These were one brand prompt and one address-assisted follow-up per service, in English. No unbranded recommendation study, Turkish-query study, citation-rate estimate or platform-wide indexing assessment was performed.
- Address-assisted retrieval demonstrates that those sessions could read current content. It does not establish spontaneous brand discovery or recommendation visibility. Perplexity's initial citation also shows why a domain citation alone is insufficient evidence of accurate brand understanding.

## Practical conclusion

Brand discovery is inconsistent immediately after the redesign. ChatGPT and Perplexity can retrieve the current site when given its address; Bing Copilot Search returned outdated content in this test. Preserve the accurate bilingual HTML, canonical URLs, sitemap, public project evidence and consistent brand naming. Future checks should repeat the same initial prompt in fresh sessions and record discovery separately from address-assisted reading. This check creates no recurring automation and makes no guarantee about indexing or future citations.
