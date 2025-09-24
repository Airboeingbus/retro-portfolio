document.addEventListener("DOMContentLoaded", () => {
  const output      = document.getElementById("output");
  const header      = document.querySelector(".c64-header");
  const promptLine  = document.getElementById("prompt-line");
  const fakeInput   = document.getElementById("fake-input");
  const bootAudio   = document.getElementById("boot-audio");
  const typingAudio = document.getElementById("key-audio");

  typingAudio.volume = 0.4;

  function unlockAudio() {
    bootAudio.play().catch(()=>{});
    typingAudio.play().catch(()=>{});
    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  }
  document.addEventListener("click", unlockAudio);
  document.addEventListener("keydown", unlockAudio);

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
    "Mounting Profile .......... SYSTEM CORE",
    "",
    "Initializing Core Modules...",
    "SYSTEM ...................... ACTIVE",
    "NETWORK ..................... LOADED",
    "STORAGE ..................... LOADED",
    "INPUT/OUTPUT ................ MONITORED",
    "SECURITY .................... ENGAGED",
    "RETRO UI .................... ACTIVE",
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
      promptLine.style.display = "flex";
      enableFakeInput();
    }
  }

  // Check for saved terminal state
  const savedState = sessionStorage.getItem('terminalState');
  
  if (savedState) {
    // Resume from saved state
    const state = JSON.parse(savedState);
    output.textContent = state.output;
    promptLine.style.display = "flex";
    enableFakeInput();
    header.classList.remove("hidden");
  } else {
    // Start fresh boot sequence
    header.classList.add("hidden");
    setTimeout(() => {
      header.classList.remove("hidden");
      setTimeout(typeLine, 1000);
    }, 1000);
  }

  // Save state when navigating away
  window.addEventListener('beforeunload', saveTerminalState);

  const lastCommand = sessionStorage.getItem("lastCommand");
  if (lastCommand) {
    setTimeout(() => {
      if (lastCommand === "CONTACT") handleCommand("CONTACT");
      else if (lastCommand === "PROJECTS") handleCommand("PROJECTS");
    }, 1500);
  }

  function enableFakeInput() {
    let buffer   = "";
    let caretPos = 0;
    fakeInput.setAttribute("tabindex", "0");
    fakeInput.focus();
    document.body.addEventListener("mousedown", () => fakeInput.focus());

    fakeInput.addEventListener("keydown", e => {
      const printable = e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
      const editing   = ["Backspace","Delete","ArrowLeft","ArrowRight","Home","End"].includes(e.key);

      if (printable || editing) playClick();

      if (printable) { buffer = buffer.slice(0, caretPos) + e.key + buffer.slice(caretPos); caretPos++; e.preventDefault(); }
      else if (e.key === "Backspace") { if (caretPos > 0) { buffer = buffer.slice(0, caretPos - 1) + buffer.slice(caretPos); caretPos--; } e.preventDefault(); }
      else if (e.key === "Delete") { buffer = buffer.slice(0, caretPos) + buffer.slice(caretPos + 1); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { caretPos = Math.max(0, caretPos - 1); e.preventDefault(); }
      else if (e.key === "ArrowRight") { caretPos = Math.min(buffer.length, caretPos + 1); e.preventDefault(); }
      else if (e.key === "Home") { caretPos = 0; e.preventDefault(); }
      else if (e.key === "End") { caretPos = buffer.length; e.preventDefault(); }
      else if (e.key === "Enter") { handleCommand(buffer); buffer = ""; caretPos = 0; e.preventDefault(); }

      renderFakeInput();
    });

    function playClick() { typingAudio.currentTime = 0; typingAudio.play().catch(()=>{}); }
    function renderFakeInput() {
      const before = buffer.slice(0, caretPos);
      const after  = buffer.slice(caretPos);
      fakeInput.innerHTML = before + '<span class="cursor">█</span>' + after;
    }

    function handleCommand(cmd) {
      output.textContent += `> ${cmd}\n`;
      const key = cmd.trim().toUpperCase();

      if (key === "HELP") {
        output.textContent += "AVAILABLE COMMANDS: HELP, ABOUT, CONTACT, PROJECTS\n";
      }
      else if (key === "ABOUT") {
        const aboutLines = [
          "INITIATING ABOUT MODULE .......... OK",
          "SCANNING DIGITAL BIOS ............ OK",
          "ACCESSING PROFILE INFORMATION..... OK",
          "LOADING MODULES [25%] ........ OK",
          "LOADING MODULES [50%] ........ OK",
          "LOADING MODULES [75%] ........ OK",
          "LOADING MODULES [100%] ....... OK",
          "Name: S.P Shaktivell Sunder",
          "Status: Student @ Amrita Vishwa Vidyapeetham Chennai Campus",
          "Location: 13.0843° N, 80.2705° E",
          "Last Login: 2025-09-24 14:32:18",
          "INTERFACING WITH ART-TECH SYSTEMS",
          "Loading Interests Modules...",
          "Homebrew Development ............ LOADED",
          "Game Development ................ LOADED",
          "Avionics Engineering ............ ACTIVE",
          "Flight Simulation ................ INITIALIZED",
          "Music ............................ LOADED",
          "Cinema ........................... LOADED",
          "Gaming ........................... LOADED",
          "Literature ....................... LOADED",
          "Comic Panels ..................... LOADED",
          "Aviation Tracking ................ ACTIVE",
          "Flight Systems ................... MONITORED",
          "Writing [Story] .................. INITIALIZED",
          "Retro Tech ....................... ENGAGED",
          "PROFILE STATUS: READY"
        ];

        let index = 0;

        function printNextLine() {
          if (index < aboutLines.length) {  // Changed from aboutBootLines to aboutLines
            output.textContent += aboutLines[index++] + "\n";  // Changed from aboutBootLines to aboutLines
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLine, 500);
          } else {
            output.textContent += "\nREADY.\n";
            window.scrollTo(0, document.body.scrollHeight);
          }
        }
        printNextLine();
        return;
      }
      else if (key === "CONTACT") {
        const contactBootLines = [
          "INITIATING CONTACT MODULE",
          "SECURITY CHECK ............. OK",
          "READING CONTACTS.DSK ....... OK",
          "ALLOCATING MEMORY .......... 2048 BYTES",
          "LINKING EXECUTABLE ......... DONE",
          "TRANSITIONING TO WINDOWS DOS ENVIRONMENT...",
          "READY TO LAUNCH INTERFACE..."
        ];
        let index = 0;

        function printNextLine() {
          if (index < contactBootLines.length) {
            output.textContent += contactBootLines[index++] + "\n";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLine, 500);
          } else {
            sessionStorage.setItem("lastCommand", "CONTACT");
            openApplication("CONTACT", "Pages/contact.html");
          }
        }
        printNextLine();
        return;
      }
      else if (key === "PROJECTS") {
        const projectBootLines = [
          "INITIATING PROJECTS MODULE",
          "SECURITY CHECK ............. OK",
          "READING PROJECTS.DSK ....... OK",
          "ALLOCATING MEMORY .......... 8192 BYTES",
          "LINKING EXECUTABLE ......... DONE",
          "READY TO LAUNCH INTERFACE..."
        ];
        let index = 0;
        function printNextLine() {
          if (index < projectBootLines.length) {
            output.textContent += projectBootLines[index++] + "\n";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLine, 500);
          } else {
            sessionStorage.setItem("lastCommand", "PROJECTS");
            openApplication("PROJECTS", "Pages/projects.html");
          }
        }
        printNextLine();
        return;
      }
      else if (key === "") {}
      else { output.textContent += "SYNTAX ERROR\n"; }

      window.scrollTo(0, document.body.scrollHeight);
    }
  }

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
          saveTerminalState(); // Save state before navigation
          window.location.href = url; 
        }, 500);
      }
    }, 200);
  }

  function saveTerminalState() {
    const terminalState = {
      output: output.textContent,
      bootComplete: true
    };
    sessionStorage.setItem('terminalState', JSON.stringify(terminalState));
  }
});
