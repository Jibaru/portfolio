const CACHE_KEY = "ROADMAP_RECORDS";
const CACHE_DURATION = 10 * 60 * 1000;

/**
 * Get roadmap records
 *
 * @returns {Promise<Array<{
 *   topic: string,
 *   type: string,
 *   resourceName: string,
 *   authors: string,
 *   resourceURL: string,
 *   startedAt: string,
 *   finishedAt: string,
 *   status: string
 * }>>}
 */
export const getRecords = async () => {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTimestamp = localStorage.getItem(CACHE_KEY + "_timestamp");

  if (cachedData && cachedTimestamp) {
    const now = Date.now();
    if (now - parseInt(cachedTimestamp, 10) < CACHE_DURATION) {
      return JSON.parse(cachedData);
    }
  }

  const records = await fetchRecords();

  localStorage.setItem(CACHE_KEY, JSON.stringify(records));
  localStorage.setItem(CACHE_KEY + "_timestamp", Date.now().toString());

  return records;
};

/**
 * Query the Google Sheet roadmap records
 *
 * @returns {Promise<Array<{
 *   topic: string,
 *   type: string,
 *   resourceName: string,
 *   authors: string,
 *   resourceURL: string,
 *   startedAt: string,
 *   finishedAt: string,
 *   status: string
 * }>>}
 */
export const fetchRecords = async () => {
  const url =
    "https://docs.google.com/spreadsheets/d/1866xFA77c1ymrhO4aQrKHuWYX_G4pxdb-GodViIkMsQ/pubhtml?gid=0&single=true";

  try {
    const response = await fetch(url);
    const text = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    const tbody = doc.querySelector("tbody");
    if (!tbody) {
      return;
    }

    return parseTableToJSON(tbody)
      .filter((row) => row.resource_name && row.resource_url)
      .map((row) => {
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
      });
  } catch (error) {
    console.error("error getting information from google sheets:", error);
    return [];
  }
};

/**
 * @param {HTMLTableSectionElement} tbody
 * @returns {Array<{
 *   topic: string,
 *   type: string,
 *   resource_name: string,
 *   authors: string,
 *   resource_url: string,
 *   from_utc_5: string,
 *   to_utc_5: string,
 *   status: string
 * }>}
 */
const parseTableToJSON = (tbody) => {
  const rows = tbody.querySelectorAll("tr");
  if (rows.length < 2) return [];

  const headers = [...rows[0].querySelectorAll("td")].map((td) =>
    td.textContent.trim()
  );

  const data = [...rows].slice(2).map((row) => {
    const cells = row.querySelectorAll("td");
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
};
