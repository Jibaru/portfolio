const GITHUB_INFORMATION_URL =
  "https://api.github.com/repos/{username}/{repository}";

const WEB_TYPE = "web";
const LIBRARY_TYPE = "library";
const TOOLING_TYPE = "tooling";

const projects = [
  {
    name: "Monitoring",
    summary:
      "Monitor, analyze, and manage logs from all your applications in one place. Get logs insights and never miss critical issues.",
    links: [{ name: "Website", url: "https://try-monitoring.vercel.app" }],
    techStack: [
      "Go",
      "Vercel",
      "React",
      "Shadcn",
      "Tailwind",
      "MongoDB",
      "API REST",
      "OAuth2",
      "JWT",
    ],
    githubUsername: "jibaru",
    githubRepositoryName: "monitoring-landing",
    type: WEB_TYPE,
  },
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
    type: TOOLING_TYPE,
  },
  {
    name: "Gobeats",
    summary:
      "Play songs from Google Drive in your terminal with minimal configuration",
    links: [{ name: "Github", url: "https://github.com/Jibaru/gobeats" }],
    techStack: ["Go", "Docker", "CLI", "Termui"],
    githubUsername: "jibaru",
    githubRepositoryName: "gobeats",
    type: TOOLING_TYPE,
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
    type: WEB_TYPE,
  },
  {
    name: "Do",
    summary: 'Custom "programming language" to do HTTP requests in plain text',
    links: [
      {
        name: "Github",
        url: "https://github.com/Jibaru/do",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/watch?v=o66AymeA4m0",
      },
    ],
    techStack: ["Go", "CLI", "HTTP", "JSON", "Pipeline", "vscode"],
    githubUsername: "jibaru",
    githubRepositoryName: "do",
    type: TOOLING_TYPE,
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
    type: TOOLING_TYPE,
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
    type: WEB_TYPE,
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
    type: WEB_TYPE,
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
    type: LIBRARY_TYPE,
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
    type: TOOLING_TYPE,
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
    type: WEB_TYPE,
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
    type: WEB_TYPE,
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
    type: WEB_TYPE,
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
    type: TOOLING_TYPE,
  },
  {
    name: "Patterns of Enterprise Applications in Go",
    summary: "A bunch of examples of the patterns described by Fowler in Go",
    links: [
      {
        name: "Github",
        url: "https://github.com/Jibaru/patterns-of-enterprise-application-in-go",
      },
    ],
    techStack: ["Patterns", "Go", "Examples"],
    githubUsername: "jibaru",
    githubRepositoryName: "patterns-of-enterprise-application-in-go",
    type: LIBRARY_TYPE,
  },
  {
    name: "GoMiniwin",
    summary:
      "Mini-set of GUI functions for Windows & Linux to start creating videogames",
    links: [
      {
        name: "Github",
        url: "https://github.com/Jibaru/gominiwin",
      },
    ],
    techStack: [
      "Go",
      "Win32 API",
      "X11 Linux API",
      "Concurrency",
      "Videogames",
    ],
    githubUsername: "jibaru",
    githubRepositoryName: "gominiwin",
    type: LIBRARY_TYPE,
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
  const webProjects = document.getElementById("web");
  const libraryProjects = document.getElementById("libraries");
  const toolingProjects = document.getElementById("tooling");

  for (const project of projects) {
    let selectedList = null;
    switch (project.type) {
      case WEB_TYPE:
        selectedList = webProjects;
        break;
      case TOOLING_TYPE:
        selectedList = toolingProjects;
        break;
      case LIBRARY_TYPE:
        selectedList = libraryProjects;
        break;
      default:
        selectedList = webProjects;
    }

    const projectElement = await createProjectElement(project);
    selectedList.appendChild(projectElement);
  }
};

document.addEventListener("DOMContentLoaded", loadProjects);
