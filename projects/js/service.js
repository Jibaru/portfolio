import { ProjectRepository, WEB_TYPE, LIBRARY_TYPE, TOOLING_TYPE } from './repository.js';

/**
 * @typedef {import('./repository.js').Project} Project
 * @typedef {import('./repository.js').GithubInfo} GithubInfo
 */

/**
 * @typedef {Object} EnrichedProject
 * @property {string} name
 * @property {string} summary
 * @property {ProjectLink[]} links
 * @property {string[]} techStack
 * @property {string} githubUsername
 * @property {string} githubRepositoryName
 * @property {string} type
 * @property {GithubInfo} githubInfo
 */

/**
 * @typedef {Object} CategorizedProjects
 * @property {EnrichedProject[]} web
 * @property {EnrichedProject[]} tooling
 * @property {EnrichedProject[]} library
 */

class ProjectService {
  /**
   * @type {ProjectRepository}
   */
  repository;

  constructor() {
    this.repository = new ProjectRepository();
  }

  /**
   * @param {Project} project
   * @returns {Promise<EnrichedProject>}
   */
  async enrichProjectWithGithubData(project) {
    const githubInfo = await this.repository.fetchGithubInformation(
      project.githubUsername, 
      project.githubRepositoryName
    );
    
    return {
      ...project,
      githubInfo
    };
  }

  /**
   * @returns {Promise<EnrichedProject[]>}
   */
  async getAllProjectsWithGithubData() {
    const projects = this.repository.getAllProjects();
    const enrichedProjects = await Promise.all(
      projects.map(project => this.enrichProjectWithGithubData(project))
    );
    return enrichedProjects;
  }

  /**
   * @param {string} type
   * @returns {Promise<EnrichedProject[]>}
   */
  async getProjectsByTypeWithGithubData(type) {
    const projects = this.repository.getProjectsByType(type);
    const enrichedProjects = await Promise.all(
      projects.map(project => this.enrichProjectWithGithubData(project))
    );
    return enrichedProjects;
  }

  /**
   * @param {EnrichedProject[]} projects
   * @returns {CategorizedProjects}
   */
  categorizeProjects(projects) {
    return {
      web: projects.filter(project => project.type === WEB_TYPE),
      tooling: projects.filter(project => project.type === TOOLING_TYPE),
      library: projects.filter(project => project.type === LIBRARY_TYPE)
    };
  }

  /**
   * @returns {Promise<CategorizedProjects>}
   */
  async getCategorizedProjectsWithGithubData() {
    const projects = await this.getAllProjectsWithGithubData();
    return this.categorizeProjects(projects);
  }
}

export { ProjectService };