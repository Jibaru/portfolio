const projects = [
  {
    name: "Gostore",
    description: "A simplistic and minimalist file storage.",
    links: [{ name: "Github", url: "https://github.com/Jibaru/gostore" }],
    techStack: ["Go", "Echo Framework", "Hexagonal Architecture"],
  },
  {
    name: "Gobeats",
    description: "Google Drive Command Line Player.",
    links: [{ name: "Github", url: "https://github.com/Jibaru/gobeats" }],
    techStack: ["Go", "Docker", "CLI", "Termui"],
  },
  {
    name: "Home Inventory API",
    description: "Organize your items at home in a simple way.",
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
    description: "Document your mysql database on HTML and Markdown with JSON.",
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
    description: "Upload your XML Invoices and get all information you need.",
    links: [
      { name: "Github", url: "https://github.com/Jibaru/purchase-records-api" },
    ],
    techStack: ["PHP", "Docker", "MySQL", "DDD", "XML"],
  },
  {
    name: "Peru Pokemon Tournaments Manager",
    description:
      "An API to manage tournaments inscriptions and tournaments created in Peru.",
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
    description: "Paper publication.",
    links: [{ name: "PDF", url: "https://doi.org/10.52248/eb.Vol4Iss1.125" }],
    techStack: ["Android", "Kotlin", "MySQL", "PDF"],
  },
];

function createProjectElement(project) {
  const li = document.createElement("li");
  li.innerHTML = `
      <div class="card">
        <div class="card-title">
          <h2>
            <strong>${project.name}:</strong>
            <i>${project.description}</i>
          </h2>
        </div>
        <div class="card-body">
          <p>${project.description}</p>
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
                  `<li><a href="${link.url}" target="_blank">${link.name}</a></li>`
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
