import { getRecords } from "./data.js";

const table = document.getElementById("roadmap-table");
const tbody = document.getElementById("roadmap");
const loader = document.getElementById("loader");

document.addEventListener("DOMContentLoaded", async () => {
  loader.style.display = "block";
  table.style.display = "none";

  const records = await getRecords();

  const recordTypeIcons = {
    book: "📚",
    documentation: "📄",
    "youtube video": "📹",
    "course video": "🎥",
    "web page": "🌐",
    post: "📝",
    "github repository": "📦",
  };

  records.forEach((record) => {
    const tr = document.createElement("tr");

    const icon = recordTypeIcons[record.type.toLowerCase()] ?? "";
    let authors = "";

    if (record.authors) {
      authors = `by ${record.authors}`;
    }

    tr.innerHTML = `
        <td class="td-status">${record.status}</td>
        <td class="td-resource-name">${icon} ${record.resourceName} ${authors}</td>
        <td class="td-resource-url"><a href="${record.resourceURL}" target="_blank">${record.resourceURL}</a></td>
        `;
    tbody.appendChild(tr);
  });

  loader.style.display = "none";
  table.style.display = "table";
});
