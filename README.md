# Cost Compass

Find a cost center or budget in a GitHub Enterprise without paging through 15+ pages.

**Use it:** https://abirismyname.github.io/billing-finder/

1. Enter your enterprise slug and a personal access token.
2. Switch between **Cost centers** and **Budgets**.
3. Type to filter (press `/` to focus, `Esc` to clear), narrow with the dropdowns, and click column headers to sort.
4. Click a name to open it on GitHub.

## Token

You need to be an enterprise owner or billing manager. Use a classic PAT with `manage_billing:enterprise` (or `admin:enterprise`).

## No data is stored

Your token and billing data stay in your browser tab's memory and are cleared when you close or reload it. Requests go directly from your browser to `api.github.com`. There's no server, cookie, local storage or analytics.

## Develop

Static files, no build. Run `python3 -m http.server` to serve locally. Run `node test.js` to check the filter and sort logic.
