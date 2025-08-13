/**
 * Class representing a Google Sheets Reader.
 */
export class Reader {
  /**
   * Creates a new Reader instance.
   * @param {Object} config - Configuration object.
   * @param {string} config.id - The Google Sheets document ID.
   */
  constructor(config) {
    this._id = config.id;
  }

  /**
   * Retrieves a specific sheet from the Google Sheets document.
   * @param {string|number} sheetId - The sheet ID (gid) to fetch.
   * @returns {Promise<Sheet>} A promise that resolves to a Sheet instance.
   */
  async sheet(sheetId) {
    const data = await this._fetchData("csv", sheetId);
    return new Sheet(data);
  }

  /**
   * Fetches data from the Google Sheets document.
   * @param {string} [format="csv"] - The format of the data to fetch.
   * @param {string|number|null} [guid=null] - The sheet ID (gid), if applicable.
   * @returns {Promise<string>} A promise that resolves to the raw sheet data as a string.
   * @throws {Error} If the request fails.
   * @private
   */
  async _fetchData(format = "csv", guid = null) {
    let url = `https://docs.google.com/spreadsheets/d/${this._id}/pub`;
    let params = `?output=${format}`;

    if (guid !== null) {
      params += `&gid=${guid}&single=true`;
    }

    try {
      const resp = await fetch(url + params, {
        method: "GET",
      });

      return await resp.text();
    } catch (error) {
      throw new Error(`getting sheet information failed: ${error}`);
    }
  }
}

/**
 * Class representing a parsed Google Sheets sheet.
 */
export class Sheet {
  /**
   * Creates a new Sheet instance.
   * @param {string} content - The raw CSV content of the sheet.
   */
  constructor(content) {
    this._records = parseCSV(content);
  }

  /**
   * Gets the parsed records from the sheet.
   * @returns {Array<Object>} An array of objects representing the sheet records.
   */
  get records() {
    return this._records;
  }
}

const parseLine = (line) => {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
};

/**
 * Parse records from a sheet csv string.
 * @returns {Array<Object>} An array of objects representing the sheet records.
 */
export const parseCSV = (csvString) => {
  const lines = csvString.split(/\r?\n/).filter((line) => line.trim() !== "");
  const headers = parseLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const obj = {};
    headers.forEach((header, index) => {
      const val = values[index];
      let realVal = val;

      if (val === "TRUE") {
        realVal = true;
      } else if (val === "FALSE") {
        realVal = false;
      }

      obj[header] = realVal;
    });
    return obj;
  });
};
