# MUTANTFOOTS — site

A static site: plain HTML, CSS and JS with no build step.

## Deploy (Vercel)
1. Push this folder to the root of the repo.
2. In Vercel, import the repo with Framework = **Other** and leave the build command empty.

## Before launch
- Open `main.js` and edit the `CONFIG` block at the top: `SUBMIT_URL`, `X_URL`, `X_HANDLE`, `SITE_URL`, `ALLOW_SAPLING`, `MINT_DATE`, `MINT_PRICE`.
- `index.html`: replace `https://mutantfoots.example` with the live domain. It appears in the canonical, og:url, og:image and twitter:image tags. X cards need absolute URLs.
- `assets/devil-silhouette.png` is a placeholder. Swap in the final black silhouette PNG: 44×44, black on transparent. The red eyes are drawn by the site at grid cells (21,19) and (27,19). You can move them with `data-eye` in `index.html`.

## Allowlist endpoint contract
- `POST SUBMIT_URL` with a JSON body: `{ x_handle, zec_address, address_type: "unified"|"sapling", submitted_at, hp }`
- Drop any request where `hp` is non-empty (that field is the bot honeypot).
- Respond `200/201` when the entry is stored.
- Respond `409`, or `{ "status": "duplicate" }`, when the address is already registered.
- Any other response shows the error state with a Retry button.
- Validate the address again on the server. Never trust the client.

While `SUBMIT_URL` is empty the form runs in demo mode: entries are kept in the browser's localStorage only.

## Art
- `assets/m/*.png` are 44×44 native-resolution mutants.
- The page scales them in whole device-pixel multiples, so they stay sharp at any DPR.
- Page weight is about 60 KB plus fonts.
