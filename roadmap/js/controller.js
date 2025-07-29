import { RoadmapService } from './service.js';

/**
 * @typedef {import('./service.js').EnrichedRecord} EnrichedRecord
 */

/**
 * @typedef {Object} DOMElements
 * @property {HTMLElement|null} table
 * @property {HTMLElement|null} tbody
 * @property {HTMLElement|null} loader
 */

class RoadmapController {
  /**
   * @type {RoadmapService}
   */
  service;

  /**
   * @type {DOMElements}
   */
  domElements;

  constructor() {
    this.service = new RoadmapService();
    this.domElements = {
      table: null,
      tbody: null,
      loader: null
    };
  }

  /**
   * @returns {void}
   */
  initializeDOMElements() {
    this.domElements.table = document.getElementById("roadmap-table");
    this.domElements.tbody = document.getElementById("roadmap");
    this.domElements.loader = document.getElementById("loader");
  }

  /**
   * @returns {void}
   */
  showLoader() {
    if (this.domElements.loader) {
      this.domElements.loader.style.display = "block";
    }
    if (this.domElements.table) {
      this.domElements.table.style.display = "none";
    }
  }

  /**
   * @returns {void}
   */
  hideLoader() {
    if (this.domElements.loader) {
      this.domElements.loader.style.display = "none";
    }
    if (this.domElements.table) {
      this.domElements.table.style.display = "table";
    }
  }

  /**
   * @param {EnrichedRecord} record
   * @returns {HTMLTableRowElement}
   */
  createRecordElement(record) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="td-status">${record.status}</td>
      <td class="td-resource-name">${record.icon} ${record.resourceName} ${record.authorsText}</td>
      <td class="td-resource-url"><a href="${record.resourceURL}" target="_blank">${record.resourceURL}</a></td>
    `;

    return tr;
  }

  /**
   * @param {EnrichedRecord[]} records
   * @returns {void}
   */
  renderRecords(records) {
    if (!this.domElements.tbody) return;

    records.forEach(record => {
      const recordElement = this.createRecordElement(record);
      this.domElements.tbody.appendChild(recordElement);
    });
  }

  /**
   * @returns {Promise<void>}
   */
  async loadRoadmap() {
    try {
      this.initializeDOMElements();
      this.showLoader();

      const records = await this.service.getEnrichedRecords();
      this.renderRecords(records);

      this.hideLoader();
    } catch (error) {
      console.error('Error loading roadmap:', error);
      this.hideLoader();
    }
  }

  /**
   * @returns {void}
   */
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.loadRoadmap();
    });
  }
}

export { RoadmapController };