let settings = { copyKey: 'c', hoverColor: '#00ff00' };
let hoveredElement = null;

// Load settings from storage
chrome.storage.sync.get(['copyKey', 'hoverColor'], (items) => {
    if (items.copyKey) settings.copyKey = items.copyKey;
    if (items.hoverColor) settings.hoverColor = items.hoverColor;
});

document.addEventListener("mouseover", (e) => { hoveredElement = e.target; });

document.addEventListener("keydown", async (e) => {
    const modKeyPressed = e.ctrlKey;

    if (modKeyPressed && e.key.toLowerCase() === settings.copyKey
                && hoveredElement?.tagName === 'IMG') {
        try {
            const response = await fetch(hoveredElement.src);
            const blob = await response.blob();
            
            await navigator.clipboard.write([
                new ClipboardItem({ [blob.type]: blob })
            ]);
            
            // Apply custom hover color for feedback
            hoveredElement.style.outline = `3px solid ${settings.hoverColor}`;
            setTimeout(() => hoveredElement.style.outline = "", 500);
            
        } catch (err) {
            console.error("Copy failed:", err);
        }
    }
});
