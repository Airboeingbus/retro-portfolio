document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const header = document.querySelector(".c64-header");
  const promptLine = document.getElementById("prompt-line");
  const promptHint = document.getElementById("prompt-hint");
  const fakeInput = document.getElementById("fake-input");
  const cursor = document.querySelector(".cursor");
  const audio = document.getElementById("boot-audio");

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
    "READY.",
    "TYPE HELP FOR A LIST OF COMMANDS"   // ← Newly added line
  ];

  let line = 0;

  function typeLine() {
    if (line < lines.length) {
      output.textContent += lines[line++] + "\n";
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(typeLine, 400);
    } else {
      // show prompt after boot
      promptLine.style.display = "flex";
      promptHint && promptHint.classList.remove("hidden");
      enableFakeInput();
    }
  }

  // hide header, then start boot-up
  header.classList.add("hidden");
  setTimeout(() => {
    header.classList.remove("hidden");
    setTimeout(typeLine, 1000);
  }, 1000);

  // play audio once on first interaction
  function playAudioOnce() {
    audio && audio.play();
    document.removeEventListener("click", playAudioOnce);
    document.removeEventListener("keydown", playAudioOnce);
  }
  document.addEventListener("click", playAudioOnce);
  document.addEventListener("keydown", playAudioOnce);

  // terminal input logic
  function enableFakeInput() {
    let buffer = "";
    let caretPos = 0;

    document.body.addEventListener("mousedown", () => {
      fakeInput.focus();
    });

    fakeInput.setAttribute("tabindex", "0");
    fakeInput.focus();

    fakeInput.addEventListener("keydown", function (e) {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
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
        caretPos > 0 && caretPos--;
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        caretPos < buffer.length && caretPos++;
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
      const before = buffer.slice(0, caretPos);
      const after = buffer.slice(caretPos);
      fakeInput.innerHTML = before + '<span class="cursor">█</span>' + after;
    }

    function handleCommand(cmd) {
      output.textContent += `> ${cmd}\n`;
      const upperCmd = cmd.trim().toUpperCase();
      switch (upperCmd) {
        case "HELP":
          output.textContent +=
            "AVAILABLE COMMANDS: HELP, ABOUT, CONTACT, PROJECTS\n";
          break;
        case "ABOUT":
          output.textContent +=
            "SHATIVELL (AIRBOEINGBUS): PENTULATE CSE @ AMRITA VISHWA VIDYAPEETHAM CHENNAI CAMPUS\n";
          break;
        case "CONTACT":
          output.textContent += "EMAIL: your@email.com\n";
          break;
        case "PROJECTS":
          output.textContent += "PROJECT 1: ...\nPROJECT 2: ...\n";
          break;
        case "":
          break;
        default:
          output.textContent += "SYNTAX ERROR\n";
      }
      window.scrollTo(0, document.body.scrollHeight);
    }

    renderFakeInput();
  }
});