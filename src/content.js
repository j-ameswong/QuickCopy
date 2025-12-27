let settings = { copyKey: "c" };
let hoveredElement = null;

// Load settings from storage
chrome.storage.sync.get(["copyKey"], (items) => {
  if (items.copyKey) settings.copyKey = items.copyKey;
});

document.addEventListener("mouseover", (e) => {
  hoveredElement = e.target;
});

document.addEventListener("keydown", async (e) => {
  const modKeyPressed = e.ctrlKey || e.metaKey;

  if (
    modKeyPressed &&
    e.key.toLowerCase() === settings.copyKey &&
    hoveredElement?.tagName === "IMG"
  ) {
    try {
      const response = await fetch(hoveredElement.src);
      const blob = await response.blob();

      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }
});
