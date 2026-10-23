"use strict";

const examples = {
  1: {
    title: "Thoughtful → surprised",
    detail:
      "Full-image editing changes the facial expression without a background-preservation mask.",
    prompt: "Light-skinned boy with short hair looking surprised",
    mode: "Case 1 · Full-image editing",
    beforeAlt: "Original portrait of a boy with short hair looking thoughtful",
    afterAlt: "Edited portrait of the same boy looking surprised",
  },
  2: {
    title: "A cup → a candle",
    detail:
      "A supplied mask localizes the object replacement while preserving the basket, books, and surrounding scene.",
    prompt: "a basket of books and a candle",
    mode: "Case 2 · User-provided mask",
    beforeAlt: "Original still life with a basket of books and a cup",
    afterAlt: "Edited still life with the cup replaced by a candle",
  },
  3: {
    title: "Red drink → red wine",
    detail:
      "The target word “drink” guides attention-based mask generation, preserving the surrounding beach scene.",
    prompt: "a glass of red wine on the beach",
    mode: "Case 3 · Automatic mask",
    beforeAlt: "Original image of a glass of red drink on the beach",
    afterAlt: "Edited image of a glass of red wine on the beach",
  },
};

const tablist = document.querySelector(".demo-tabs");
const panel = document.querySelector("#edit-panel");
const comparison = document.querySelector(".comparison");
const slider = document.querySelector("#comparison-range");
const beforeImage = document.querySelector("#before-image");
const afterImage = document.querySelector("#after-image");
let activeRequest = 0;

function resetComparison() {
  slider.value = "50";
  comparison.style.setProperty("--split", "50%");
  slider.setAttribute("aria-valuetext", "50% source image visible");
}

async function selectExample(tab) {
  const id = tab.dataset.case;
  const example = examples[id];
  if (!example) return;
  const request = ++activeRequest;
  panel.setAttribute("aria-busy", "true");
  const paths = ["before", "after"].map(
    (side) => `assets/images/case${id}-${side}.webp`,
  );
  try {
    await Promise.all(
      paths.map(
        (src) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = src;
          }),
      ),
    );
    if (request !== activeRequest) return;
    tablist.querySelectorAll('[role="tab"]').forEach((button) => {
      const selected = button === tab;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tab.id);
    beforeImage.src = paths[0];
    beforeImage.alt = example.beforeAlt;
    afterImage.src = paths[1];
    afterImage.alt = example.afterAlt;
    document.querySelector("#demo-title").textContent = example.title;
    document.querySelector("#demo-detail").textContent = example.detail;
    document.querySelector("#target-prompt").textContent = example.prompt;
    document.querySelector("#demo-mode").textContent = example.mode;
    document.querySelector("#demo-source").href =
      `https://github.com/yx-chen-ust/EditInfinity/tree/main/example_case/example_${id}`;
    resetComparison();
  } catch {
    document.querySelector(".interaction-note").textContent =
      "This image could not be loaded. Please try the example again.";
  } finally {
    if (request === activeRequest) panel.removeAttribute("aria-busy");
  }
}

if (tablist && panel && slider) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => selectExample(tab));
    tab.addEventListener("keydown", (event) => {
      const position = tabs.indexOf(tab);
      let next;
      if (event.key === "ArrowRight") next = (position + 1) % tabs.length;
      if (event.key === "ArrowLeft")
        next = (position - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      selectExample(tabs[next]);
    });
  });
  slider.addEventListener("input", () => {
    comparison.style.setProperty("--split", `${slider.value}%`);
    slider.setAttribute(
      "aria-valuetext",
      `${slider.value}% source image visible`,
    );
  });
}

const dialog = document.querySelector(".image-dialog");
let figureTrigger;
if (dialog) {
  document.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      figureTrigger = button;
      const source = button.querySelector("img");
      const image = dialog.querySelector("img");
      image.src = button.dataset.zoom;
      image.alt = source.alt;
      dialog.querySelector(".dialog-caption").textContent =
        button.closest("figure")?.querySelector("figcaption")?.textContent ||
        source.alt;
      dialog.showModal();
      document.body.style.overflow = "hidden";
    });
  });
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    figureTrigger?.focus({ preventScroll: true });
  });
}

const copyButton = document.querySelector("#copy-citation");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const citation = document.querySelector("#bibtex");
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText(citation.textContent);
      copyButton.textContent = "Copied ✓";
      status.textContent = "Citation copied to clipboard.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = "Selected — press Ctrl/Cmd+C";
      status.textContent =
        "Citation selected. Press Control C or Command C to copy.";
    }
    window.setTimeout(() => {
      copyButton.textContent = "Copy citation ↗";
    }, 4000);
  });
}

const sections = [...document.querySelectorAll("main > section[id]:not(#top)")];
const tocLinks = [...document.querySelectorAll(".page-toc > a")];
let navigationFrame;
function updateNavigation() {
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 180) active = section;
  }
  tocLinks.forEach((link) => {
    if (link.hash === `#${active?.id}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  navigationFrame = null;
}
window.addEventListener(
  "scroll",
  () => {
    if (!navigationFrame)
      navigationFrame = window.requestAnimationFrame(updateNavigation);
  },
  { passive: true },
);
updateNavigation();
