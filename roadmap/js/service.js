import { RoadmapRepository } from './repository.js';

/**
 * @typedef {import('./repository.js').RoadmapRecord} RoadmapRecord
 */

/**
 * @typedef {Object} RecordTypeIcon
 * @property {string} book
 * @property {string} documentation
 * @property {string} "youtube video"
 * @property {string} "course video"
 * @property {string} "web page"
 * @property {string} post
 * @property {string} "github repository"
 */

/**
 * @typedef {Object} EnrichedRecord
 * @property {string|null} topic
 * @property {string|null} type
 * @property {string|null} resourceName
 * @property {string|null} authors
 * @property {string|null} resourceURL
 * @property {string|null} startedAt
 * @property {string|null} finishedAt
 * @property {string|null} status
 * @property {string} icon
 * @property {string} authorsText
 */

class RoadmapService {
  /**
   * @type {RoadmapRepository}
   */
  repository;

  /**
   * @type {Record<string, string>}
   */
  recordTypeIcons;

  constructor() {
    this.repository = new RoadmapRepository();
    this.recordTypeIcons = {
      book: "📚",
      documentation: "📄",
      "youtube video": "📹",
      "course video": "🎥",
      "web page": "🌐",
      post: "📝",
      "github repository": "📦",
    };
  }

  /**
   * @param {string|null} type
   * @returns {string}
   */
  getIconForType(type) {
    if (!type) return "";
    return this.recordTypeIcons[type.toLowerCase()] ?? "";
  }

  /**
   * @param {string|null} authors
   * @returns {string}
   */
  formatAuthors(authors) {
    return authors ? `by ${authors}` : "";
  }

  /**
   * @param {RoadmapRecord} record
   * @returns {EnrichedRecord}
   */
  enrichRecord(record) {
    return {
      ...record,
      icon: this.getIconForType(record.type),
      authorsText: this.formatAuthors(record.authors)
    };
  }

  /**
   * @returns {Promise<EnrichedRecord[]>}
   */
  async getEnrichedRecords() {
    const records = await this.repository.getRecords();
    return records.map(record => this.enrichRecord(record));
  }

  /**
   * @param {string} status
   * @returns {Promise<EnrichedRecord[]>}
   */
  async getRecordsByStatus(status) {
    const records = await this.getEnrichedRecords();
    return records.filter(record => record.status === status);
  }

  /**
   * @param {string} type
   * @returns {Promise<EnrichedRecord[]>}
   */
  async getRecordsByType(type) {
    const records = await this.getEnrichedRecords();
    return records.filter(record => record.type === type);
  }
}

export { RoadmapService };