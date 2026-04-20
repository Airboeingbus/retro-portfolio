// CBterm Experience Module - Boot Sequence
document.addEventListener("DOMContentLoaded", () => {
  const bootSequence = document.getElementById("boot-sequence");
  const terminalOutput = document.getElementById("terminal-output");
  const timelineList = document.getElementById("timeline-list");
  const timelineDisplay = document.getElementById("timeline-display");
  const statusText = document.getElementById("status-text");

  const bootMessages = [
    "CBTERM 5.0 EXPERIENCE MODULE",
    "",
    "INITIALIZING DATABASE...",
    "READING CALENDAR.DAT ......... OK",
    "LOADING WORK HISTORY ........ OK",
    "PARSING CHRONOLOGICAL DATA .. OK",
    "",
    "DATABASE READY. PRESS [SPACE] TO VIEW DETAIL"
  ];

  let messageIndex = 0;
  let charIndex = 0;
  let currentMessage = "";

  function typeBootMessage() {
    if (messageIndex < bootMessages.length) {
      const message = bootMessages[messageIndex];
      
      if (charIndex < message.length) {
        currentMessage += message[charIndex];
        bootSequence.textContent = bootMessages.slice(0, messageIndex).join("\n") + (messageIndex > 0 ? "\n" : "") + currentMessage;
        charIndex++;
        setTimeout(typeBootMessage, 50);
      } else {
        // Boot complete - wait for user to press space
        messageIndex++;
        charIndex = 0;
        currentMessage = "";
        bootSequence.textContent = bootMessages.slice(0, messageIndex).join("\n");
        statusText.textContent = "READY";
        // Don't automatically show timeline - wait for SPACE key
      }
    } else {
      // All messages typed - boot sequence complete
      setTimeout(() => {
        statusText.textContent = "READY";
      }, 500);
    }
  }

  function displayTimeline() {
    const timeline = `ZOHO CORPORATION · SOFTWARE ENGINEERING INTERN
CHENNAI, INDIA · 2025-2026

DATA ENTRY AUTOMATION PROJECT
Assigned to: Zoho CRM Team
Duration: Summer Internship (2months)

KEY RESPONSIBILITIES:

[ ] Analyzed large, multi-page operational documents
    (40+ pages) to identify repetitive data-entry and
    validation patterns suitable for automation.

[ ] Improved reliability of downstream automation by
    filtering 15+ non-input pages and normalizing
    inputs, reducing noise in operational datasets.

[ ] Performed validation and root-cause analysis
    across 400+ extracted fields using curated
    ground-truth JSON, identifying high-frequency
    failure patterns and manual rework drivers.

[ ] Contributed automation-oriented insights by
    categorizing 400+ extracted fields into recurring
    error classes, enabling prioritization of
    high-frequency issues for automated handling.


═══════════════════════════════════════════════
[A] RETURN TO MAIN         [SPACE] EXIT DETAIL`;

    timelineDisplay.textContent = timeline;
  }

  let detailViewVisible = false;

  function toggleDetailView() {
    detailViewVisible = !detailViewVisible;
    
    if (detailViewVisible) {
      // Show timeline detail
      terminalOutput.style.display = "none";
      timelineList.style.display = "block";
      statusText.textContent = "LOADED";
      displayTimeline();
    } else {
      // Return to boot sequence
      terminalOutput.style.display = "block";
      timelineList.style.display = "none";
      statusText.textContent = "READY";
    }
  }

  // Session memory
  sessionStorage.setItem("lastVisitedPage", "experience");
  sessionStorage.setItem("lastCommand", "EXPERIENCE");

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === 'a') {
      sessionStorage.setItem("lastCommand", "EXPERIENCE");
      window.location.href = "../index.html";
    }
    if (e.key === ' ') {
      e.preventDefault();
      toggleDetailView();
    }
  });

  // Start boot sequence
  typeBootMessage();
});
