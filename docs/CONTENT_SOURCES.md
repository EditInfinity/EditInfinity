# Content and media sources

## Research

- Paper: [EditInfinity: Image Editing with Binary-Quantized Generative Models](https://arxiv.org/pdf/2510.20217).
- Research code and source images: [yx-chen-ust/EditInfinity](https://github.com/yx-chen-ust/EditInfinity).
- Authors, affiliations, contribution markers, and NeurIPS 2025 venue: paper page 1.
- Method summaries: paper pages 1–2 and 4–6. Website prose summarizes the method; it is not a verbatim abstract.
- Quantitative table: paper page 7, Table 1. Values retain the paper's scaling: LPIPS ×10³, MSE ×10⁴, SSIM ×10², and ImageReward ×10. Arrows indicate metric direction.
- PIE-Bench: 700 test cases spanning nine editing types, paper pages 7–8.
- User preference: 43.2% for EditInfinity, paper page 8. The study used 60 volunteers, each evaluating 20 cases drawn from a pool of 140. This is preference share, not success rate.
- BibTeX: the formal publication entry in the research repository README. The conference is NeurIPS 2025; the publication entry reports volume 38, pages 50763–50790, year 2026.

## Image provenance

All WebP images retain their original source dimensions. No image editing results were generated, retouched, or spatially cropped for this site. Scientific diagrams and the quantitative/radar figures are lossless WebP transcodes; photographic figures and example images use high-quality WebP compression.

| Website asset | Original path in the research repository |
| --- | --- |
| `teaser.webp` | `assets/image1.jpg` |
| `inversion.webp` | `assets/image2.jpg` |
| `editing.webp` | `assets/image2_2.jpg` |
| `quantitative.webp` | `assets/image6.png` |
| `radar-preference.webp` | `assets/image3.jpg` |
| `qualitative.webp` | `assets/image4.jpg` |
| `ablation.webp` | `assets/image5.jpg` |
| `case1-before.webp` | `example_case/example_1/image/original_image.jpg` |
| `case1-after.webp` | `example_case/example_1/output/edit_result_example1.jpg` |
| `case2-before.webp` | `example_case/example_2/image/original_image.jpg` |
| `case2-after.webp` | `example_case/example_2/output/edit_result_example2_result.jpg` |
| `case3-before.webp` | `example_case/example_3/image/original_image.jpg` |
| `case3-after.webp` | `example_case/example_3/output/edit_result_example3_result.jpg` |

Example prompts are taken directly from each case's `prompt/edit_image_prompt.txt`. Case 3 uses `drink` from `prompt/target_word.txt` for automatic masking. Each before/after image is a directly aligned 1024×1024 pair. Display labels describe the supplied examples and do not imply a live inference service.

## Website references

- [Zero-WAM](https://robbyant-research.github.io/Zero-WAM/): warm paper background, left-aligned research title, restrained bracket links, large media, and section navigation.
- [RESETTLE source repository](https://github.com/resettle-robotics/resettle-robotics.github.io), inspected at `d885f06a7d0ab8e6ff6e999557cbe3cd029ed4a8`: buildless directory structure, semantic content sections, source documentation, and static GitHub Pages deployment.

The site uses independently written HTML/CSS/JavaScript, system fonts, and an original SVG infinity favicon. No reference-site videos, logos, proprietary fonts, or research content are copied. Reference sites are credited in the footer. No license is inferred for the reference repositories.
