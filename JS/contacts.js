document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const promptLine = document.getElementById("prompt-line");
  const fakeInput = document.getElementById("fake-input");

  const lines = [
    "Microsoft(R) MS-DOS(R) Version 6.22",
    "(C)Copyright 1981-1994 Microsoft Corp.",
    "",
    "C:\\CONTACTS>",
    "Type HELP for list of commands",
    ""
  ];

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex < lines.length) {
      output.textContent += lines[lineIndex++] + "\n";
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(typeLine, 300);
    } else {
      promptLine.style.display = "flex";
      enableFakeInput();
    }
  }

  setTimeout(typeLine, 500);

  function enableFakeInput() {
    let buffer = "";
    let caretPos = 0;

    fakeInput.setAttribute("tabindex", "0");
    fakeInput.focus();
    document.body.addEventListener("mousedown", () => fakeInput.focus());

    fakeInput.addEventListener("keydown", e => {
      const printable = e.key.length === 1;
      if (printable) {
        buffer = buffer.slice(0, caretPos) + e.key + buffer.slice(caretPos);
        caretPos++;
        e.preventDefault();
      } else if (e.key === "Backspace") {
        if (caretPos > 0) {
          buffer = buffer.slice(0, caretPos - 1) + buffer.slice(caretPos);
          caretPos--;
        }
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
      const key = cmd.trim().toUpperCase();
      output.textContent += `\nC:\\CONTACTS> ${cmd}\n`;

      if (key === "HELP") {
        output.textContent += "AVAILABLE COMMANDS: HELP, EMAIL, GITHUB, LINKEDIN, EXIT\n";
      }
      else if (key === "EMAIL") {
        output.textContent += "EMAIL: spshaktivellsunder@gmail.com\n";
      }
      else if (key === "GITHUB") {
        output.textContent += "GITHUB: https://github.com/Airboeingbus\n";
      }
      else if (key === "LINKEDIN") {
        output.textContent += "LINKEDIN: https://www.linkedin.com/in/s-p-shaktivell-sunder\n";
      }
      else if (key === "EXIT") {
        output.textContent += "Exiting CONTACTS.EXE...\n";
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 800);
      }
      else {
        output.textContent += "Bad command or file name\n";
      }

      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  // Navigation key — only when NOT typing
  document.addEventListener("keydown", e => {
    const active = document.activeElement;
    if (e.key.toLowerCase() === "a" && active !== fakeInput) {
      window.location.href = "../index.html";
    }
  });
});
