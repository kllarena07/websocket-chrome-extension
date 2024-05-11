document.addEventListener('DOMContentLoaded', function() {
  const select = document.querySelector('select');

  // Load the saved state from storage when the popup is opened
  chrome.storage.sync.get(['savedState'], result => {
    if (result.savedState) {
      select.selectedIndex = result.savedState;
    }
  });

  select.addEventListener("change", () => {
    chrome.storage.sync.set({ savedState: select.selectedIndex }, () => {
      console.log('State saved:', select.selectedIndex);
    });
  })
});
