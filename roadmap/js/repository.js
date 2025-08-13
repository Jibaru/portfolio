import { Reader } from "./gsheet.js";

/** @type {string} */
const CACHE_KEY = "ROADMAP_RECORDS";

/** @type {number} */
const CACHE_DURATION = 10 * 60 * 1000;

/**
 * @typedef {Object} RawRecord
 * @property {string} topic
 * @property {string} type
 * @property {string} resource_name
 * @property {string} authors
 * @property {string} resource_url
 * @property {string} from_utc_5
 * @property {string} to_utc_5
 * @property {string} status
 */

/**
 * @typedef {Object} RoadmapRecord
 * @property {string|null} topic
 * @property {string|null} type
 * @property {string|null} resourceName
 * @property {string|null} authors
 * @property {string|null} resourceURL
 * @property {string|null} startedAt
 * @property {string|null} finishedAt
 * @property {string|null} status
 */

class RoadmapRepository {
  /**
   * @returns {RoadmapRecord[]|null}
   */
  getCachedRecords() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_KEY + "_timestamp");

    if (cachedData && cachedTimestamp) {
      const now = Date.now();
      if (now - parseInt(cachedTimestamp, 10) < CACHE_DURATION) {
        return JSON.parse(cachedData);
      }
    }

    return null;
  }

  /**
   * @param {RoadmapRecord[]} records
   * @returns {void}
   */
  cacheRecords(records) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(records));
    localStorage.setItem(CACHE_KEY + "_timestamp", Date.now().toString());
  }

  /**
   * @returns {Promise<RoadmapRecord[]>}
   */
  async fetchRecords() {
    try {
      const reader = new Reader({ id: "1866xFA77c1ymrhO4aQrKHuWYX_G4pxdb-GodViIkMsQ" });
      const table = await reader.sheet("0");

      /**
       * @typedef {Object} Resource
       * @property {string} authors - Author(s) of the resource.
       * @property {string} from_utc-5 - Start date/time in UTC-5 timezone.
       * @property {string} resource_name - Name/title of the resource.
       * @property {string} resource_url - URL to the resource.
       * @property {string} status - Current status (e.g., "✅").
       * @property {string} to_utc-5 - End date/time in UTC-5 timezone.
       * @property {string} topic - Topic or subject area.
       * @property {string} type - Type of resource (e.g., "book").
       */
      /** @type {Resource[]} */
      const records = table.records;
      
      return records.map((row) => {
        let resourceURL = row.resource_url ?? null;
        if (resourceURL !== null) {
          resourceURL = resourceURL.replace(
            "https://www.google.com/url?q=",
            ""
          );
        }
      
        return {
          topic: row.topic ?? null,
          type: row.type ?? null,
          resourceName: row.resource_name ?? null,
          authors: row.authors ?? null,
          resourceURL: resourceURL,
          startedAt: row["from_utc-5"] ?? null,
          finishedAt: row["to_utc-5"] ?? null,
          status: row.status ?? null,
        };
      }).filter((row) => row.resourceName && row.resourceURL);
    } catch (error) {
      console.error("Error fetching records from Google Sheets:", error);
      return [];
    }
  }

  /**
   * @returns {Promise<RoadmapRecord[]>}
   */
  async getRecords() {
    const cachedRecords = this.getCachedRecords();
    if (cachedRecords) {
      return cachedRecords;
    }

    const records = await this.fetchRecords();
    this.cacheRecords(records);
    return records;
  }
}

export { RoadmapRepository };