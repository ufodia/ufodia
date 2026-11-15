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

## Follow-up: identity clarification and recheck

On the same day, the visible English and Turkish introductions were clarified to state the full brand name, independent software and R&D focus, and relevant areas of work. The GitHub link is explicitly labelled as project sources; the `ufodia` GitHub profile README now links back to the official site and describes the atelier. The overview file also uses the full name. No person or unverified organizational `sameAs` relationship was added. The source and profile update was integrated in commit `1a3a9eed016315061cf49a85bee5d9c3208bdf4e`.

After deployment the English page, Turkish page and `llms.txt` returned HTTP 200 and matched the generated files by SHA-256. Google Search Console showed both URLs in its index, accepted new indexing requests for each, and displayed the existing sitemap as Successful with two discovered pages. Bing URL Submission showed both URLs submitted again at 22:41 Europe/Istanbul. Requests and indexed status do not establish that an index or AI answer already contains the latest revision.

Bing URL Inspection at 22:43 showed a meaningful difference: its Bing Index view reported the root URL indexed but listed missing title, description and H1, and no markup. Its Live URL test reported the page indexable, no SEO/GEO issues and two markup types. The current delivered HTML contains the title, description and H1. This discrepancy is consistent with an older indexed representation, but its exact cause and when Bing will update it remain unverified.

The same English brand-only prompt was repeated in fresh sessions shortly after publication. Perplexity guest Search cited selimoglu.org, correctly described the atelier and its current project collection, and did not mention the previously confused person in that response. Bing Copilot Search again did not cite selimoglu.org and described unrelated similarly named organizations. ChatGPT in a temporary non-personalized Pro session with Web Search did not find or cite the site and said it could not reliably identify the brand. These individual answers vary and cannot establish a permanent correction or a general citation rate.

## Follow-up: crawler access and brand search

Later on 15 November, the current HTTPS access log and an archived November HTTPS log were examined locally. The official OpenAI published IP ranges were fetched and compared locally; no visitor IP address was retained in this report. In the examined logs, an OAI-SearchBot request from a matching published range fetched `/robots.txt` successfully (HTTP 200) at 22:29 Europe/Istanbul. An earlier verified request at 20:42 received 404 before the current robots file was published. No verified OAI-SearchBot request to the current homepage was present in these log files. Two requests from the published ChatGPT-User IP range received HTTP 200 for the homepage at 22:29. User-initiated ChatGPT-User access is distinct from the SearchBot crawl used for search discovery. Absence of a request in the examined logs does not prove a general block or establish the complete crawl history.

Bing Webmaster Tools still reported the root URL indexed with missing title, description and H1 and no markup in its index view. The earlier live URL test found the current page indexable with no SEO/GEO issues and two markup types. The mismatch is consistent with an older indexed version, not proof of a specific failure or a reason to change the live page's valid metadata. The two updated canonical URLs were already submitted at 22:41. Duplicate submission is not shown to force immediate processing; an IndexNow integration was evaluated but not added for this one-off recheck.

The same brand-only English prompt was retested in a fresh temporary non-personalized ChatGPT Pro Web Search session and in guest Bing Copilot Search. ChatGPT again said it could not reliably identify the brand and did not cite selimoglu.org. Copilot Search again cited similarly named unrelated organizations and did not cite the site. These tests do not establish platform-wide rankings. The requested immediate correction in both products was not verified; allow the external search systems to recrawl and update, then repeat the same unseeded prompt. Do not claim that a user-supplied URL follow-up proves brand discovery.
