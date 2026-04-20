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
      else if (lastCommand === "ACHIEVEMENTS") handleCommand("ACHIEVEMENTS");
      else if (lastCommand === "EXPERIENCE") handleCommand("EXPERIENCE");
      else if (lastCommand === "SKILLS") handleCommand("SKILLS");
      else if (lastCommand === "RESUME") handleCommand("RESUME");
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
        output.textContent += "AVAILABLE COMMANDS: HELP, ABOUT, CONTACT, PROJECTS, ACHIEVEMENTS, EXPERIENCE, SKILLS, RESUME, CRT\n";
      }
      else if (key === "ABOUT") {
        output.textContent += "INITIATING ABOUT MODULE .......... OK\n";
        output.textContent += "LOADING PROFILE INTERFACE ........ OK\n";
        output.textContent += "TRANSITIONING TO VISUAL MODE....\n";
        window.scrollTo(0, document.body.scrollHeight);
        
        setTimeout(() => {
          sessionStorage.setItem("lastCommand", "ABOUT");
          window.location.href = "Pages/about.html";
        }, 1500);
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
      else if (key === "ACHIEVEMENTS") {
        const achievementBootLines = [
          "INITIATING ACHIEVEMENTS MODULE",
          "SECURITY CHECK ............. OK",
          "READING ACHIEVEMENTS.DSK ... OK",
          "ACCESSING CERTIFICATION DB . OK",
          "ALLOCATING MEMORY .......... 4096 BYTES",
          "LINKING EXECUTABLE ......... DONE",
          "READY TO LAUNCH INTERFACE..."
        ];
        let index = 0;
        function printNextLine() {
          if (index < achievementBootLines.length) {
            output.textContent += achievementBootLines[index++] + "\n";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLine, 500);
          } else {
            sessionStorage.setItem("lastCommand", "ACHIEVEMENTS");
            openApplication("ACHIEVEMENTS", "Pages/achievements.html");
          }
        }
        printNextLine();
        return;
      }
      else if (key === "CRT") {
        const crtBootLines = [
          "INITIATING CRT DISPLAY MODULE",
          "ACCESSING VIDEO MEMORY ....... OK",
          "CONFIGURING SCANLINE BUFFER . OK",
          "ENABLING PHOSPHOR DECAY ...... OK",
          "CALIBRATING ELECTRON GUN .... OK",
          ""
        ];
        let index = 0;
        function printNextLine() {
          if (index < crtBootLines.length) {
            output.textContent += crtBootLines[index++] + "\n";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLine, 300);
          } else {
            // Dispatch toggle event
            window.dispatchEvent(new Event('crtToggle'));
            const status = window.crtManager?.getStatus();
            const message = status 
              ? "CRT MODE ..................... ENABLED\nSCANLINES GENERATED .......... ACTIVE\nPHOSPHOR GLOW ................ VISIBLE\n"
              : "CRT MODE ..................... DISABLED\nSCANLINES GENERATED .......... OFF\nDISPLAY NORMAL ............... RESTORED\n";
            output.textContent += message + "READY.\n";
            window.scrollTo(0, document.body.scrollHeight);
          }
        }
        printNextLine();
        return;
      }
      else if (key === "EXPERIENCE") {
        const experienceBootLines = [
          "INITIATING EXPERIENCE MODULE",
          "SECURITY CHECK ............. OK",
          "READING EXPERIENCE.DSK ..... OK",
          "ACCESSING WORK HISTORY DB .. OK",
          "ALLOCATING MEMORY .......... 4096 BYTES",
          "LINKING EXECUTABLE ......... DONE",
          "READY TO LAUNCH INTERFACE..."
        ];
        let index = 0;
        function printNextLine() {
          if (index < experienceBootLines.length) {
            output.textContent += experienceBootLines[index++] + "\n";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLine, 500);
          } else {
            sessionStorage.setItem("lastCommand", "EXPERIENCE");
            openApplication("EXPERIENCE", "Pages/experience.html");
          }
        }
        printNextLine();
        return;
      }
      else if (key === "SKILLS") {
        const skillsBootLines = [
          "INITIATING SKILLS MODULE",
          "SECURITY CHECK ............. OK",
          "READING SKILLS.DSK ......... OK",
          "ACCESSING EXPERTISE DATABASE  OK",
          "ALLOCATING MEMORY .......... 2048 BYTES",
          "LINKING EXECUTABLE ......... DONE",
          "READY TO LAUNCH INTERFACE..."
        ];
        let index = 0;
        function printNextLine() {
          if (index < skillsBootLines.length) {
            output.textContent += skillsBootLines[index++] + "\n";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLine, 500);
          } else {
            sessionStorage.setItem("lastCommand", "SKILLS");
            openApplication("SKILLS", "Pages/skills.html");
          }
        }
        printNextLine();
        return;
      }
      else if (key === "RESUME") {
        const resumeBootLines = [
          "INITIATING DOCUMENT READER",
          "SECURITY CHECK ............. OK",
          "SCANNING RESUME.PDF ........ OK",
          "ACCESSING ARCHIVE .......... OK",
          "PREPARING DOWNLOAD ......... OK",
          "",
          "FILE: RESUME.PDF",
          "SIZE: CALCULATING...",
          "STATUS: READY TO DOWNLOAD"
        ];
        let index = 0;
        function printNextLine() {
          if (index < resumeBootLines.length) {
            output.textContent += resumeBootLines[index++] + "\n";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(printNextLine, 400);
          } else {
            output.textContent += "\n";
            // Trigger PDF download
            setTimeout(() => {
              const link = document.createElement('a');
              link.href = 'Assets/resume.pdf';
              link.download = 'S.P_Shaktivell_Sunder_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              output.textContent += "DOWNLOAD INITIATED .......... OK\nREADY.\n";
              window.scrollTo(0, document.body.scrollHeight);
            }, 500);
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
