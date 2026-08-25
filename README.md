# Trench Dispatch

Source files for the Trench Dispatch website.

## Files

- `index.html` — website layout and Ko-fi floating button
- `tc_cover.jpg` — Trench Dispatch cover
- `panda.png` — Project Panda avatar
- `TrenchDispatch_01c.pdf` — current downloadable Trench Dispatch #1 PDF

## Deployment

The intended production host is Cloudflare Pages.

Connect this repository to Cloudflare Pages with:

- Production branch: `main`
- Framework preset: None / Static HTML
- Build command: leave empty
- Build output directory: `/`

After the Git integration is connected, every commit to `main` will trigger a new deployment automatically. You can then edit only the file you want on GitHub, for example `index.html`, without manually uploading the full site package again.
