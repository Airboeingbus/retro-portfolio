document.addEventListener("DOMContentLoaded", () => {
  const documentText = document.getElementById("document-text");
  const statusBar = document.querySelector(".status-bar");
  
  let currentLine = 1;
  let currentCol = 1;

  // Track cursor position (simulated)
  if (statusBar) {
    documentText.addEventListener("click", () => {
      if (statusBar) {
        statusBar.innerHTML = `<span>File: SKILLS.DOC</span><span style="margin-left: auto;">Ln: ${currentLine}  Col: ${currentCol}</span>`;
      }
    });

    // Update line count as user "scrolls"
    documentText.parentElement?.addEventListener("scroll", () => {
      if (statusBar) {
        statusBar.innerHTML = `<span>File: SKILLS.DOC</span><span style="margin-left: auto;">Ln: ${currentLine}  Col: ${currentCol}</span>`;
      }
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === 'a') {
      sessionStorage.setItem("lastCommand", "SKILLS");
      window.location.href = "../index.html";
    }
  });
});


