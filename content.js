let hoveredElement = null;

// Track what the mouse is currently over
document.addEventListener("mouseover", (e) => {
    hoveredElement = e.target;
});

// Listen for the keypress
document.addEventListener("keydown", async (e) => {
    // Check if key is 'c' and mouse is over an IMG tag
    if (e.key.toLowerCase() === 'c' && hoveredElement && hoveredElement.tagName === 'IMG') {
        try {
            const response = await fetch(hoveredElement.src);
            const blob = await response.blob();
            
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
            
            console.log("Image copied to clipboard!");
            // Optional: Visual feedback
            hoveredElement.style.outline = "3px solid green";
            setTimeout(() => hoveredElement.style.outline = "", 500);
            
        } catch (err) {
            console.error("Failed to copy image: ", err);
        }
    }
});
