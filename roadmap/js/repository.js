/** @type {string} */
const CACHE_KEY = "ROADMAP_RECORDS";

/** @type {number} */
const CACHE_DURATION = 10 * 60 * 1000;

/** @type {string} */
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1866xFA77c1ymrhO4aQrKHuWYX_G4pxdb-GodViIkMsQ/pubhtml?gid=0&single=true";

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
   * @param {HTMLTableSectionElement} tbody
   * @returns {RawRecord[]}
   */
  parseTableToJSON(tbody) {
    const rows = tbody.querySelectorAll("tr");
    if (rows.length < 2) return [];

    const headers = [...rows[0].querySelectorAll("td")].map((td) =>
      td.textContent.trim()
    );

    const data = [...rows].slice(2).map((row) => {
      const cells = row.querySelectorAll("td");
      /** @type {any} */
      let obj = {};

      headers.forEach((header, index) => {
        let cell = cells[index];
        if (!cell) return;

        let link = cell.querySelector("a");
        obj[header] = link ? link.href : cell.textContent.trim();
      });

      return obj;
    });

    return data;
  }

  /**
   * @param {RawRecord} row
   * @returns {RoadmapRecord}
   */
  transformRecord(row) {
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
      startedAt: row.from_utc_5 ?? null,
      finishedAt: row.to_utc_5 ?? null,
      status: row.status ?? null,
    };
  }

  /**
   * @returns {Promise<RoadmapRecord[]>}
   */
  async fetchRecords() {
    try {
      const response = await fetch(GOOGLE_SHEET_URL);
      const text = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const tbody = doc.querySelector("tbody");
      if (!tbody) {
        return [];
      }

      const rawRecords = this.parseTableToJSON(tbody);
      return rawRecords
        .filter((row) => row.resource_name && row.resource_url)
        .map(row => this.transformRecord(row));
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