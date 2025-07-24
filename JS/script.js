document.addEventListener("DOMContentLoaded", () => {
  const output      = document.getElementById("output");
  const header      = document.querySelector(".c64-header");
  const promptLine  = document.getElementById("prompt-line");
  const fakeInput   = document.getElementById("fake-input");
  const bootAudio   = document.getElementById("boot-audio");
  const typingAudio = document.getElementById("key-audio");

  // set typing‐click volume
  typingAudio.volume = 0.4;

  // unlock audio contexts on first interaction
  function unlockAudio() {
    bootAudio.play().catch(()=>{});
    typingAudio.play().catch(()=>{});
    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  }
  document.addEventListener("click", unlockAudio);
  document.addEventListener("keydown", unlockAudio);

  // the C64‐style boot lines
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
    "TYPE HELP FOR A LIST OF COMMANDS"
  ];

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex < lines.length) {
      output.textContent += lines[lineIndex++] + "\n";
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(typeLine, 400);
    } else {
      // show prompt once boot is done
      promptLine.style.display = "flex";
      enableFakeInput();
    }
  }

  // start the boot sequence
  header.classList.add("hidden");
  setTimeout(() => {
    header.classList.remove("hidden");
    setTimeout(typeLine, 1000);
  }, 1000);

  // handle user typing in the fake terminal
  function enableFakeInput() {
    let buffer   = "";
    let caretPos = 0;

    fakeInput.setAttribute("tabindex", "0");
    fakeInput.focus();
    document.body.addEventListener("mousedown", () => fakeInput.focus());

    fakeInput.addEventListener("keydown", e => {
      const printable = e.key.length === 1
                        && !e.ctrlKey && !e.metaKey && !e.altKey;
      const editing   = ["Backspace", "Delete",
                         "ArrowLeft", "ArrowRight",
                         "Home", "End"].includes(e.key);

      // play click for any printable or editing key
      if (printable || editing) {
        playClick();
      }

      if (printable) {
        buffer = buffer.slice(0, caretPos) +
                 e.key +
                 buffer.slice(caretPos);
        caretPos++;
        e.preventDefault();
      } else if (e.key === "Backspace") {
        if (caretPos > 0) {
          buffer = buffer.slice(0, caretPos - 1) +
                   buffer.slice(caretPos);
          caretPos--;
        }
        e.preventDefault();
      } else if (e.key === "Delete") {
        buffer = buffer.slice(0, caretPos) +
                 buffer.slice(caretPos + 1);
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        caretPos = Math.max(0, caretPos - 1);
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        caretPos = Math.min(buffer.length, caretPos + 1);
        e.preventDefault();
      } else if (e.key === "Home") {
        caretPos = 0;
        e.preventDefault();
      } else if (e.key === "End") {
        caretPos = buffer.length;
        e.preventDefault();
      } else if (e.key === "Enter") {
        handleCommand(buffer);
        buffer   = "";
        caretPos = 0;
        e.preventDefault();
      }

      renderFakeInput();
    });

    function playClick() {
      typingAudio.currentTime = 0;
      typingAudio.play().catch(()=>{});
    }

    function renderFakeInput() {
      const before = buffer.slice(0, caretPos);
      const after  = buffer.slice(caretPos);
      fakeInput.innerHTML = before
                          + '<span class="cursor">█</span>'
                          + after;
    }

    function handleCommand(cmd) {
      output.textContent += `> ${cmd}\n`;
      const key = cmd.trim().toUpperCase();

      if (key === "HELP") {
        output.textContent +=
          "AVAILABLE COMMANDS: HELP, ABOUT, CONTACT, PROJECTS\n";
      }
      else if (key === "ABOUT") {
        output.textContent +=
          "SHATIVELL (AIRBOEINGBUS): PENTUMULATE CSE @ AMRITA VISHWA VIDYAPEETHAM CHENNAI CAMPUS\n";
      }
      else if (key === "CONTACT") {
        output.textContent += "EMAIL: your@email.com\n";
      }
      else if (key === "PROJECTS") {
        openApplication(
          "PROJECTS",
          "file:///C:/Users/shakt/OneDrive/Documents/retro-portfolio/Pages/projects.html"
        );
        return; // skip re-rendering prompt here
      }
      else if (key === "") {
        // nothing
      }
      else {
        output.textContent += "SYNTAX ERROR\n";
      }

      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  // retro “launch” animation + redirect
  function openApplication(name, url) {
    fakeInput.setAttribute("contenteditable", "false");
    output.textContent += `Launching ${name}`;
    window.scrollTo(0, document.body.scrollHeight);

    let dots = 0;
    const interval = setInterval(() => {
      output.textContent += ".";
      window.scrollTo(0, document.body.scrollHeight);
      if (++dots === 8) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = url;
        }, 500);
      }
    }, 200);
  }
});