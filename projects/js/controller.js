import { ProjectService } from './service.js';

/**
 * @typedef {import('./service.js').EnrichedProject} EnrichedProject
 * @typedef {import('./service.js').CategorizedProjects} CategorizedProjects
 */

/**
 * @typedef {Object} DOMElements
 * @property {HTMLElement|null} web
 * @property {HTMLElement|null} libraries
 * @property {HTMLElement|null} tooling
 */

class ProjectController {
  /**
   * @type {ProjectService}
   */
  service;
  
  /**
   * @type {DOMElements}
   */
  domElements;

  constructor() {
    this.service = new ProjectService();
    this.domElements = {
      web: null,
      libraries: null,
      tooling: null
    };
  }

  /**
   * @returns {void}
   */
  initializeDOMElements() {
    this.domElements.web = document.getElementById("web");
    this.domElements.libraries = document.getElementById("libraries");
    this.domElements.tooling = document.getElementById("tooling");
  }

  /**
   * @param {EnrichedProject} project
   * @returns {HTMLLIElement}
   */
  createProjectElement(project) {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="card">
        <div class="card-title">
          <h2>
            <strong>${project.name}</strong>
          </h2>
          <div class="github-info">
            <span class="stars">⭐ ${project.githubInfo.stars}</span> 
            <span class="forks">⤴️ ${project.githubInfo.forks}</span>
          </div>
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

  /**
   * @param {CategorizedProjects} categorizedProjects
   * @returns {void}
   */
  renderProjectsToDOM(categorizedProjects) {
    const { web, tooling, library } = categorizedProjects;

    web.forEach(project => {
      const projectElement = this.createProjectElement(project);
      this.domElements.web.appendChild(projectElement);
    });

    tooling.forEach(project => {
      const projectElement = this.createProjectElement(project);
      this.domElements.tooling.appendChild(projectElement);
    });

    library.forEach(project => {
      const projectElement = this.createProjectElement(project);
      this.domElements.libraries.appendChild(projectElement);
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async loadProjects() {
    try {
      this.initializeDOMElements();
      const categorizedProjects = await this.service.getCategorizedProjectsWithGithubData();
      this.renderProjectsToDOM(categorizedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  /**
   * @returns {void}
   */
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.loadProjects();
    });
  }
}

export { ProjectController };