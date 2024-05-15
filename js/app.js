const projects = [
  {
    name: "Gostore",
    summary: "A simplistic and minimalist file storage similar to AWS S3",
    links: [{ name: "Github", url: "https://github.com/Jibaru/gostore" }],
    techStack: ["Go", "Echo Framework", "Hexagonal Architecture"],
  },
  {
    name: "Gobeats",
    summary:
      "Play songs from Google Drive in your terminal with minimal configuration",
    links: [{ name: "Github", url: "https://github.com/Jibaru/gobeats" }],
    techStack: ["Go", "Docker", "CLI", "Termui"],
  },
  {
    name: "Home Inventory API",
    summary: "Organize your items at home in a simple way",
    links: [
      { name: "Github", url: "https://github.com/Jibaru/home-inventory-api" },
    ],
    techStack: [
      "Go",
      "Docker",
      "MySQL",
      "AWS S3",
      "Gmail",
      "Sentry",
      "Echo Framework",
      "Hexagonal Architecture",
    ],
  },
  {
    name: "SchemaSpy Docker Setup",
    summary: "Document your MySQL database into HTML and Markdown using JSON",
    links: [
      {
        name: "Github",
        url: "https://github.com/Jibaru/schemaspy-docker-setup",
      },
    ],
    techStack: ["Python", "Docker", "Java", "JSON", "XML", "Markdown"],
  },
  {
    name: "Purchase Records API",
    summary:
      "Upload your XML Invoices and get all information you need usingthe UBL 2.0 Sunat standard",
    links: [
      { name: "Github", url: "https://github.com/Jibaru/purchase-records-api" },
    ],
    techStack: ["PHP", "Docker", "MySQL", "DDD", "XML"],
  },
  {
    name: "Peru Pokemon Tournaments Manager",
    summary:
      "An API to manage tournaments inscriptions and tournaments created in Peru",
    links: [
      {
        name: "Github",
        url: "https://github.com/Peru-Pokemon-Tournaments/peru-pokemon-tournaments-api",
      },
    ],
    techStack: ["PHP", "Docker", "MySQL", "Pokemon"],
  },
  {
    name: "Lite Red-Cetario cooking recipes app",
    summary:
      "An app to manage cooking recipes in devices with less resources in times of COVID-19",
    links: [
      {
        name: "PDF",
        url: "https://doi.org/10.52248/eb.Vol4Iss1.125",
      },
      {
        name: "Github",
        url: "https://github.com/jibaru/red-cetario",
      },
    ],
    techStack: ["Android", "Kotlin", "MySQL", "PDF", "Paper publication"],
  },
  {
    name: "OS Processes Planning Explainer",
    summary:
      "Understand step-by-step a bunch of processes planning by the OS kernel",
    links: [
      {
        name: "Website",
        url: "https://jibaru.github.io/process-planning-algorithms/",
      },
      {
        name: "Github",
        url: "https://github.com/Jibaru/process-planning-algorithms",
      },
    ],
    techStack: ["Algorithm", "JS", "OS"],
  },
  {
    name: "Network Segmentation Tool",
    summary: "A tool to help you to segment your IPv4 network",
    links: [
      {
        name: "Website",
        url: "https://jibaru.github.io/network-segmentation/",
      },
      {
        name: "Github",
        url: "https://github.com/Jibaru/network-segmentation",
      },
    ],
    techStack: ["Algorithm", "JS", "Networks", "IPv4"],
  },
  {
    name: "Graphical Computer Algorithms",
    summary: "Many graphical algorithms implemented in C++ with GLUT",
    links: [
      {
        name: "Github",
        url: "https://github.com/Jibaru/graphical-computing-algorithms",
      },
    ],
    techStack: ["Algorithm", "OpenGL/GLUT", "C++", "Graphics"],
  },
];

function createProjectElement(project) {
  const li = document.createElement("li");
  li.innerHTML = `
      <div class="card">
        <div class="card-title">
          <h2>
            <strong>${project.name}</strong>
          </h2>
        </div>
        <div class="card-body">
          <p>${project.summary}</p>
          <ul class="tech-list">
            ${project.techStack.map((tech) => `<li>${tech}</li>`).join("")}
          </ul>
        </div>
        <hr class="separator" />
        <div class="card-footer">
          <ul class="tech-links">
            ${project.links
              .map(
                (link) =>
                  `<li><a href="${link.url}" target="_blank">${link.name}↗</a></li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
    `;
  return li;
}

function loadProjects() {
  const projectsList = document.getElementById("projects");
  projects.forEach((project) => {
    const projectElement = createProjectElement(project);
    projectsList.appendChild(projectElement);
  });
}

document.addEventListener("DOMContentLoaded", loadProjects);
