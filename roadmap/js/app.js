import { getRecords } from "./data.js";

const tbody = document.getElementById("roadmap");

document.addEventListener("DOMContentLoaded", async () => {
  const records = await getRecords();

  records.forEach((record) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="td-status">${record.status}</td>
        <td class="td-resource-name">${record.resourceName}</td>
        <td class="td-resource-url"><a href="${record.resourceURL}" target="_blank">${record.resourceURL}</a></td>
        `;
    tbody.appendChild(tr);
  });
});
