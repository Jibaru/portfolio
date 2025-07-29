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
 * @interface DataSource
 */
class DataSource {
  /**
   * @returns {Promise<RoadmapRecord[]>}
   */
  async getRecords() {
    throw new Error("Method must be implemented");
  }
}

/**
 * @implements {DataSource}
 */
class GoogleSheetsDataSource extends DataSource {
  /**
   * @type {string}
   */
  url;

  /**
   * @param {string} spreadsheetUrl
   */
  constructor(spreadsheetUrl) {
    super();
    this.url = spreadsheetUrl;
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
   * @param {RawRecord} rawRecord
   * @returns {RoadmapRecord}
   */
  transformRecord(rawRecord) {
    let resourceURL = rawRecord.resource_url ?? null;
    if (resourceURL !== null) {
      resourceURL = resourceURL.replace(
        "https://www.google.com/url?q=",
        ""
      );
    }

    return {
      topic: rawRecord.topic ?? null,
      type: rawRecord.type ?? null,
      resourceName: rawRecord.resource_name ?? null,
      authors: rawRecord.authors ?? null,
      resourceURL: resourceURL,
      startedAt: rawRecord.from_utc_5 ?? null,
      finishedAt: rawRecord.to_utc_5 ?? null,
      status: rawRecord.status ?? null,
    };
  }

  /**
   * @returns {Promise<RoadmapRecord[]>}
   */
  async getRecords() {
    try {
      const response = await fetch(this.url);
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
      console.error("Error getting information from Google Sheets:", error);
      return [];
    }
  }
}

/**
 * @implements {DataSource}
 */
class CacheDecorator extends DataSource {
  /**
   * @type {DataSource}
   */
  dataSource;

  /**
   * @type {string}
   */
  cacheKey;

  /**
   * @type {number}
   */
  cacheDuration;

  /**
   * @param {DataSource} dataSource
   * @param {string} cacheKey
   * @param {number} cacheDuration
   */
  constructor(dataSource, cacheKey, cacheDuration = 10 * 60 * 1000) {
    super();
    this.dataSource = dataSource;
    this.cacheKey = cacheKey;
    this.cacheDuration = cacheDuration;
  }

  /**
   * @returns {RoadmapRecord[]|null}
   */
  getCachedData() {
    const cachedData = localStorage.getItem(this.cacheKey);
    const cachedTimestamp = localStorage.getItem(this.cacheKey + "_timestamp");

    if (cachedData && cachedTimestamp) {
      const now = Date.now();
      if (now - parseInt(cachedTimestamp, 10) < this.cacheDuration) {
        return JSON.parse(cachedData);
      }
    }

    return null;
  }

  /**
   * @param {RoadmapRecord[]} data
   * @returns {void}
   */
  setCachedData(data) {
    localStorage.setItem(this.cacheKey, JSON.stringify(data));
    localStorage.setItem(this.cacheKey + "_timestamp", Date.now().toString());
  }

  /**
   * @returns {void}
   */
  clearCache() {
    localStorage.removeItem(this.cacheKey);
    localStorage.removeItem(this.cacheKey + "_timestamp");
  }

  /**
   * @returns {Promise<RoadmapRecord[]>}
   */
  async getRecords() {
    const cachedData = this.getCachedData();
    if (cachedData) {
      return cachedData;
    }

    const freshData = await this.dataSource.getRecords();
    this.setCachedData(freshData);
    return freshData;
  }
}

/** @type {string} */
const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/1866xFA77c1ymrhO4aQrKHuWYX_G4pxdb-GodViIkMsQ/pubhtml?gid=0&single=true";

/** @type {string} */
const CACHE_KEY = "ROADMAP_RECORDS";

/** @type {number} */
const DEFAULT_CACHE_DURATION = 10 * 60 * 1000;

/**
 * @type {DataSource}
 */
const dataSource = new CacheDecorator(
  new GoogleSheetsDataSource(GOOGLE_SHEETS_URL),
  CACHE_KEY,
  DEFAULT_CACHE_DURATION
);

/**
 * @returns {Promise<RoadmapRecord[]>}
 */
export const getRecords = async () => {
  return await dataSource.getRecords();
};

/**
 * @returns {Promise<RoadmapRecord[]>}
 */
export const fetchRecords = async () => {
  const googleSheetsSource = new GoogleSheetsDataSource(GOOGLE_SHEETS_URL);
  return await googleSheetsSource.getRecords();
};

export { DataSource, GoogleSheetsDataSource, CacheDecorator };
