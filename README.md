# EditInfinity · Project Website

Project page for **EditInfinity: Image Editing with Binary-Quantized Generative Models (NeurIPS 2025)**.

- **Website:** https://editinfinity.github.io/EditInfinity/
- **Paper:** https://arxiv.org/abs/2510.20217
- **Research code:** https://github.com/yx-chen-ust/EditInfinity

## Local preview

This is a buildless HTML/CSS/JavaScript website. No package installation is required.

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. The site also works when served under the `/EditInfinity/` path used by GitHub Pages.

## Files

```text
index.html              # Paper content, authors, results, and citation
assets/css/style.css    # Responsive layout and visual styling
assets/js/main.js       # Example tabs, image comparison, zoom, and citation copying
assets/images/          # Original research figures and precomputed editing examples
.nojekyll               # Serve the static files directly on GitHub Pages
docs/CONTENT_SOURCES.md # Content and asset provenance
```

## Publishing

In this repository's **Settings → Pages**, select **Deploy from a branch → main → /(root)** and save. GitHub Pages publishes subsequent pushes to `main` automatically.

The project URL is `https://editinfinity.github.io/EditInfinity/`. Keep the `/EditInfinity/` prefix in the canonical URL, social sharing metadata, and sitemap.

## Content and design

All research figures and comparison images come from the EditInfinity code repository. The interactive examples show precomputed results; no model runs in the browser.

The directory structure follows the buildless approach of [RESETTLE](https://github.com/resettle-robotics/resettle-robotics.github.io), with visual inspiration from [Zero-WAM](https://robbyant-research.github.io/Zero-WAM/). The HTML, styles, and interaction code here are independently implemented. See [content sources](docs/CONTENT_SOURCES.md) for details.
