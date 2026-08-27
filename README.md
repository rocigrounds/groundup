# groundup (hosting)

Public hosting repo for **Ground Up** — https://rocigrounds.github.io/groundup/

- `gh-pages` branch: the built site (published by GitHub Pages).
- `main` branch: this README + the CI workflow that rebuilds the site.

The book's source lives in the private repo `joewilbert/aisite`. The workflow
here checks it out (via the `AISITE_TOKEN` secret), builds it with Astro +
Pagefind, and force-pushes `dist/` to `gh-pages`.

Triggers: `repository_dispatch` (type `rebuild`, fired by the site's author
edit mode after each saved edit) and manual `workflow_dispatch`.
