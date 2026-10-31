# PDCD Mail diagrams

The six `.mmd` files are the editable Mermaid sources for three diagrams in both
languages: production architecture, migration handover, and filtering/failure
behaviour. Keep each language pair semantically aligned. These are simplified
views of the verified case study, not deployment or configuration specifications.

`npm run diagrams:mail` renders them with pinned Mermaid CLI12.0.0 into the
committed `public/diagrams/pdcd-mail/*.svg` assets. The renderer uses a local
Chrome installation on macOS when available. On other systems, set
`PUPPETEER_EXECUTABLE_PATH` to an installed Chrome/Chromium binary. Set
`PUPPETEER_SKIP_DOWNLOAD=1` when using that existing browser.

The normal Astro/Pages build serves the committed SVGs. It does not install a
Mermaid runtime, launch a browser, call a diagram service, or send diagram
content to a third party. No client-side rendering is required. The CLI itself
is obtained through npm only when the explicit rendering command is run.

Each source includes an accessible title and description. Render without HTML
labels, and preserve SVG whitespace so adjacent text spans remain legible in
standalone image renderers. The page provides localized image descriptions,
keyboard-focusable horizontal scrolling, and a full-size link. Wide figures
extend into the article margins on desktop; narrow pages contain the overflow.

After editing, regenerate all six assets, inspect the rendered diagrams, run
Astro check/build, and verify the image references in both generated pages.
