// Achievement data
const achievements = [
  {
    id: 1,
    title: "Techathon 2.0 - First Place Winner",
    issuer: "AMC FOSS",
    association: "Amrita Vishwa Vidyapeetham",
    date: "Feb 2026",
    category: "hackathon",
    rank: "[★] 1ST PLACE WINNER",
    description: "Won first place at Techathon 2.0, a 24-hour hackathon as part of Tantrotsav, a National level Tech Fest. Demonstrated innovative problem-solving and technical excellence.",
    stats: [
      { label: "Duration", value: "24 Hours" },
      { label: "Event Type", value: "National Hackathon" },
      { label: "Status", value: "Champion" }
    ]
  },
  {
    id: 2,
    title: "Open Source Hackathon - Third Prize",
    issuer: "Certify0",
    association: "Amrita Vishwa Vidyapeetham",
    date: "Aug 2025",
    category: "hackathon",
    rank: "[■] 3RD PLACE WINNER",
    description: "Secured Third Prize at Certify0 Open Source Hackathon (100+ competing teams). Identified and resolved critical bugs across multiple projects including a food ordering platform, LeetCode AI assistant, and quiz site.",
    stats: [
      { label: "Teams Competed", value: "100+" },
      { label: "Category", value: "Bug Fixing" },
      { label: "Impact", value: "UX Improvement" }
    ]
  },
  {
    id: 3,
    title: "AGRIAI Innovation Challenge Prize Winner",
    issuer: "IIIT Sri City",
    association: "Amrita Vishwa Vidyapeetham",
    date: "Mar 2025",
    category: "award",
    rank: "[◆] PRIZE WINNER",
    description: "Won prize at AGRIAI innovation challenge, part of Abhisarga 2025. 700+ registrations, 50 teams shortlisted, 15 finalist teams in final pitching. Recognized for innovative agricultural AI solution.",
    stats: [
      { label: "Registrations", value: "700+" },
      { label: "Finalists", value: "15 Teams" },
      { label: "Placement", value: "Prize Winner" }
    ]
  },
  {
    id: 4,
    title: "Best Pitch Award - Sustainable Innovation",
    issuer: "E-Cell, Amrita Vishwa Vidyapeetham",
    association: "Amrita Vishwa Vidyapeetham",
    date: "Jan 2025",
    category: "award",
    rank: "[◈] BEST PITCH AWARD",
    description: "Best Pitch Award for presenting an innovative autonomous waste sorting bin. Selected as top entry out of 100+ teams. Recognized for technical innovation and potential impact on waste management automation.",
    stats: [
      { label: "Competition", value: "100+ Teams" },
      { label: "Category", value: "Sustainability" },
      { label: "Recognition", value: "Innovation Award" }
    ]
  },
  {
    id: 5,
    title: "Certificate of Merit - IEEE Conference",
    issuer: "IEEE",
    association: "Amrita Vishwa Vidyapeetham",
    date: "Dec 2024",
    category: "paper",
    rank: "[▲] CERTIFICATE OF MERIT",
    description: "Won Certificate of Merit for presenting research paper on 'IOT-Based ECG Monitoring System for Remote Healthcare Applications' at 2024 International Conference on Power, Energy, Control and Transmission Systems (ICPECTS 2024).",
    stats: [
      { label: "Topic", value: "IoT Healthcare" },
      { label: "Conference", value: "ICPECTS 2024" },
      { label: "Date Presented", value: "Oct 8-9, 2024" }
    ]
  },
  {
    id: 6,
    title: "Best Research Paper Award - IEEE",
    issuer: "IEEE",
    association: "Amrita Vishwa Vidyapeetham",
    date: "Oct 2024",
    category: "paper",
    rank: "[◉] BEST PAPER AWARD",
    description: "Won Best Research Paper Award at International Conference on Power, Energy, Control and Transmission Systems. Recognition for exceptional research contributions and presentation quality.",
    stats: [
      { label: "Award Type", value: "Research Paper" },
      { label: "Conference", value: "ICPECTS 2024" },
      { label: "Prestige", value: "International" }
    ]
  },
  {
    id: 7,
    title: "Sustainathon - First Place Winner",
    issuer: "Sri Sairam Engineering College",
    association: "Amrita Vishwa Vidyapeetham",
    date: "Sep 2024",
    category: "hackathon",
    rank: "[★] 1ST PLACE WINNER",
    description: "Won first place in Sustainathon, a national-level hackathon at Sri Sairam Engineering College. Project: 'Autonomous Waste Sorting Bot' - highlighted waste management issues and provided cost-effective solution addressing sustainable development principles.",
    stats: [
      { label: "Event Level", value: "National" },
      { label: "Project", value: "Waste Bot AI" },
      { label: "Impact", value: "Sustainability" }
    ]
  }
];

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");
  const container = document.getElementById("achievements-container");
  const header = document.querySelector(".c64-header");
  const grid = document.getElementById("achievements-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const backBtn = document.getElementById("back-btn");

  // Boot sequence
  const bootSequence = [
    "READY.",
    "",
    "> LOAD \"ACHIEVEMENTS\",8,1",
    "SEARCHING FOR ACHIEVEMENTS",
    "LOADING",
    "READY.",
    "> RUN",
    "",
    "[SYSTEM BOOTING...]",
    "PROFILE LOADER ............ OK",
    "ACHIEVEMENT DATABASE ...... LOADED",
    "CERTIFICATION INDEX ....... LOADED",
    "RECOGNITION ARCHIVE ....... LOADED",
    "",
    "════════════════════════════════════════",
    "     ACHIEVEMENT & CERTIFICATION INDEX",
    "════════════════════════════════════════",
    ""
  ];

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex < bootSequence.length) {
      output.textContent += bootSequence[lineIndex++] + "\n";
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(typeLine, 300);
    } else {
      container.style.display = "block";
      renderAchievements();
    }
  }

  // Boot animation
  header.classList.add("hidden");
  setTimeout(() => {
    header.classList.remove("hidden");
    setTimeout(typeLine, 500);
  }, 500);

  // Render achievements based on filter
  function renderAchievements(filter = "all") {
    currentFilter = filter;
    grid.innerHTML = "";

    const filtered = filter === "all" 
      ? achievements 
      : achievements.filter(a => a.category === filter);

    if (filtered.length === 0) {
      grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 2em; color: #80ffff;">NO ACHIEVEMENTS FOUND IN THIS CATEGORY</div>';
      return;
    }

    filtered.forEach((achievement, index) => {
      const card = document.createElement("div");
      card.className = "achievement-card";
      card.style.animationDelay = `${index * 0.1}s`;

      const statsHTML = achievement.stats
        .map(s => `<div class="stat-item"><span class="stat-label">${s.label}:</span> ${s.value}</div>`)
        .join("");

      card.innerHTML = `
        <div class="achievement-rank">${achievement.rank}</div>
        <div class="achievement-title">${achievement.title}</div>
        <div class="achievement-issuer">
          <span>Issued by: <span class="achievement-issuer-name">${achievement.issuer}</span></span>
          <span class="achievement-date">${achievement.date}</span>
        </div>
        <div>
          <span class="achievement-category">${achievement.category.toUpperCase()}</span>
          <span class="achievement-category">${achievement.association}</span>
        </div>
        <div class="achievement-description">
          ${achievement.description}
        </div>
        <div class="achievement-stats">
          ${statsHTML}
        </div>
        <div class="achievement-footer">
          <div class="achievement-verification">Verified & Active</div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // Filter button listeners
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      renderAchievements(filter);
    });
  });

  // Back button
  backBtn.addEventListener("click", () => {
    sessionStorage.setItem("lastCommand", "ACHIEVEMENTS");
    window.location.href = "../index.html";
  });

  // Initial render
  setTimeout(() => {
    renderAchievements();
  }, 100);
});
