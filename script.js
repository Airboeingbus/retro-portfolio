document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const header = document.querySelector('.c64-header');
  const promptLine = document.getElementById('prompt-line');
  const promptHint = document.getElementById('prompt-hint');
  const fakeInput = document.getElementById('fake-input');
  const cursor = document.querySelector('.cursor');
  const audio = document.getElementById('boot-audio');

  const lines = [
    "READY.",
    "",
    "> LOAD \"PORTFOLIO\",8,1",
    "SEARCHING FOR PORTFOLIO",
    "LOADING",
    "READY.",
    "> RUN",
    "",
    "[SYSTEM BOOTING...]",
    "BIOS v5.0 .................. OK",
    "Mounting Profile .......... Shaktivell (airboeingbus)",
    "",
    "Loading Modules...",
    "Art-Tech Crossroads ........ ACTIVE",
    "Music ...................... LOADED",
    "Cinema ..................... LOADED",
    "Gaming ..................... LOADED",
    "Literature ................. LOADED",
    "Comic Panels ............... LOADED",
    "Aviation Tracking .......... ACTIVE",
    "Flight Systems ............. MONITORED",
    "Writing [Essays] ........... INITIALIZED",
    "Retro Tech ................. ENGAGED",
    "",
    "Game Dev and Homebrew ...... ACTIVE",
    "Status ..................... READY",
    "",
    "> PRINT \"Hi, I’m Shaktivell (also known as airboeingbus)\"",
    "Hi, I’m Shaktivell (also known as airboeingbus)",
    "> PRINT \"Pentumulate CSE @ Amrita Vishwa Vidyapeetham Chennai Campus\"",
    "Pentumulate CSE @ Amrita Vishwa Vidyapeetham Chennai Campus",
    "",
    "READY."
  ];

  let line = 0;

  function typeLine() {
    if (line < lines.length) {
      output.textContent += lines[line++] + "\n";
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(typeLine, 400);
    } else {
      // Show prompt and hint after boot sequence
      promptLine.style.display = "flex";
      promptHint.classList.remove('hidden');
      fakeInput.focus();
      output.textContent += "Type HELP for a list of commands.\n";
      enableFakeInput();
    }
  }

  // Hide header initially
  header.classList.add('hidden');
  // Show header after 1s, then start boot after another 1s
  setTimeout(() => {
    header.classList.remove('hidden');
    setTimeout(typeLine, 1000);
  }, 1000);

  // Play audio on first user interaction (required by browsers)
  function playAudioOnce() {
    if (audio) audio.play();
    document.removeEventListener('click', playAudioOnce);
    document.removeEventListener('keydown', playAudioOnce);
  }
  document.addEventListener('click', playAudioOnce);
  document.addEventListener('keydown', playAudioOnce);

  // Custom terminal input logic
  function enableFakeInput() {
    let buffer = "";
    let caretPos = 0;

    // Focus fake input on click anywhere
    document.body.addEventListener('mousedown', () => {
      fakeInput.focus();
    });

    // Make fake input focusable
    fakeInput.setAttribute('tabindex', '0');
    fakeInput.focus();

    // Handle key events
    fakeInput.addEventListener('keydown', function(e) {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Printable character
        buffer = buffer.slice(0, caretPos) + e.key + buffer.slice(caretPos);
        caretPos++;
        e.preventDefault();
      } else if (e.key === "Backspace") {
        if (caretPos > 0) {
          buffer = buffer.slice(0, caretPos - 1) + buffer.slice(caretPos);
          caretPos--;
        }
        e.preventDefault();
      } else if (e.key === "Delete") {
        buffer = buffer.slice(0, caretPos) + buffer.slice(caretPos + 1);
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        if (caretPos > 0) caretPos--;
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        if (caretPos < buffer.length) caretPos++;
        e.preventDefault();
      } else if (e.key === "Home") {
        caretPos = 0;
        e.preventDefault();
      } else if (e.key === "End") {
        caretPos = buffer.length;
        e.preventDefault();
      } else if (e.key === "Enter") {
        handleCommand(buffer);
        buffer = "";
        caretPos = 0;
        e.preventDefault();
      }
      renderFakeInput();
    });

    function renderFakeInput() {
      // Insert the block cursor at the caret position
      const before = buffer.slice(0, caretPos);
      const after = buffer.slice(caretPos);
      fakeInput.innerHTML = before + '<span class="cursor">█</span>' + after;
    }

    function handleCommand(cmd) {
      output.textContent += `> ${cmd}\n`;
      const upperCmd = cmd.trim().toUpperCase();
      if (upperCmd === "HELP") {
        output.textContent += "AVAILABLE COMMANDS: HELP, ABOUT, CONTACT, PROJECTS\n";
      } else if (upperCmd === "ABOUT") {
        output.textContent += "SHATIVELL (AIRBOEINGBUS): PENTUMULATE CSE @ AMRITA VISHWA VIDYAPEETHAM CHENNAI CAMPUS\n";
      } else if (upperCmd === "CONTACT") {
        output.textContent += "EMAIL: your@email.com\n";
      } else if (upperCmd === "PROJECTS") {
        output.textContent += "PROJECT 1: ...\nPROJECT 2: ...\n";
      } else if (upperCmd === "") {
        // Do nothing for empty input
      } else {
        output.textContent += "SYNTAX ERROR\n";
      }
      window.scrollTo(0, document.body.scrollHeight);
    }

    // Initial render
    renderFakeInput();
  }
});