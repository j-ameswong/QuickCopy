// Save settings
document.getElementById("save").addEventListener("click", () => {
  const key = document.getElementById("copyKey").value.toLowerCase() || "c";

  chrome.storage.sync.set(
    {
      copyKey: key,
    },
    () => {
      const status = document.getElementById("status");
      status.textContent = "Settings saved! Refresh your tabs to apply.";
      setTimeout(() => {
        status.textContent = "";
      }, 2000);
    },
  );
});

// Load current settings
chrome.storage.sync.get(["copyKey"], (items) => {
  if (items.copyKey) document.getElementById("copyKey").value = items.copyKey;
});
