const GITHUB_INFORMATION_URL =
  "https://api.github.com/repos/{username}/{repository}";

const projects = [
  {
    name: "Gostore",
    summary: "A simplistic and minimalist file storage similar to AWS S3",
    links: [
      { name: "Github", url: "https://github.com/Jibaru/gostore" },
      {
        name: "YouTube",
        url: "https://youtu.be/KePrxWgED30?si=OPSe8FniN7YMfHf5",
      },
    ],
    techStack: ["Go", "Echo Framework", "Hexagonal Architecture"],
    githubUsername: "jibaru",
    githubRepositoryName: "gostore",
  },
  {
    name: "Gobeats",
    summary:
      "Play songs from Google Drive in your terminal with minimal configuration",
    links: [{ name: "Github", url: "https://github.com/Jibaru/gobeats" }],
    techStack: ["Go", "Docker", "CLI", "Termui"],
    githubUsername: "jibaru",
    githubRepositoryName: "gobeats",
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
    githubUsername: "jibaru",
    githubRepositoryName: "home-inventory-api",
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
    githubUsername: "jibaru",
    githubRepositoryName: "schemaspy-docker-setup",
  },
  {
    name: "Purchase Records API",
    summary:
      "Upload your XML Invoices and get all information you need usingthe UBL 2.0 Sunat standard",
    links: [
      { name: "Github", url: "https://github.com/Jibaru/purchase-records-api" },
    ],
    techStack: ["PHP", "Docker", "MySQL", "DDD", "XML"],
    githubUsername: "jibaru",
    githubRepositoryName: "purchase-records-api",
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
    githubUsername: "Peru-Pokemon-Tournaments",
    githubRepositoryName: "peru-pokemon-tournaments-api",
  },
  {
    name: "Go Data Structures Library",
    summary:
      "Stacks, Queues, Linked Lists, Trees and more data structures made in Go",
    links: [
      {
        name: "Github",
        url: "https://github.com/Jibaru/golang-data-structures",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/playlist?list=PLFUBk0vf6VP9tm4T4d5-tnutLFwtq6lo0",
      },
    ],
    techStack: ["Go", "Data Structures", "Algorithms"],
    githubUsername: "jibaru",
    githubRepositoryName: "golang-data-structures",
  },
  {
    name: "Gofind",
    summary:
      "Find files faster in your computer in your CLI with the power of concurrency",
    links: [
      {
        name: "Github",
        url: "https://github.com/Jibaru/gofind",
      },
    ],
    techStack: ["Go", "Concurrency", "File Searching", "CLI"],
    githubUsername: "jibaru",
    githubRepositoryName: "gofind",
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
    githubUsername: "jibaru",
    githubRepositoryName: "red-cetario",
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
    githubUsername: "jibaru",
    githubRepositoryName: "process-planning-algorithms",
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
    githubUsername: "jibaru",
    githubRepositoryName: "network-segmentation",
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
    githubUsername: "jibaru",
    githubRepositoryName: "graphical-computing-algorithms",
  },
];

const fetchGithubInformation = async (githubUsername, repositoryName) => {
  const resp = await fetch(
    GITHUB_INFORMATION_URL.replace("{repository}", repositoryName).replace(
      "{username}",
      githubUsername
    )
  );
  const data = await resp.json();

  return {
    stars: data.stargazers_count ?? 0,
    forks: data.forks_count ?? 0,
  };
};

const createProjectElement = async (project) => {
  const li = document.createElement("li");

  const githubInformation = await fetchGithubInformation(
    project.githubUsername,
    project.githubRepositoryName
  );

  li.innerHTML = `
      <div class="card">
        <div class="card-title">
          <h2>
            <strong>${project.name}</strong>
          </h2>
          <div class="github-info"><span class="stars">⭐ ${
            githubInformation.stars
          }</span> <span class="forks">⤴️ ${
    githubInformation.forks
  }</span></div>
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
};

const loadProjects = async () => {
  const projectsList = document.getElementById("projects");

  for (const project of projects) {
    const projectElement = await createProjectElement(project);
    projectsList.appendChild(projectElement);
  }
};

document.addEventListener("DOMContentLoaded", loadProjects);
