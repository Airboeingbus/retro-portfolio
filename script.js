document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

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
    "Retro Gaming ............... ENGAGED",
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
      setTimeout(typeLine, 200);
    }
  }
  typeLine();
});