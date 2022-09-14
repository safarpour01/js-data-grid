const allCheckBoxContainer = document.querySelector(
  "#all-checkboxes-container"
);
allCheckBoxContainer.style.boxShadow = "0px 0px 2000px 50px black";
const theadTr = document.querySelector("#TableheadingRow");

for (let i = 0; i < columns.length; i++) {
  const div = document.createElement("div");
  div.className = "form-check form-switch d-flex justify-content-between";
  div.innerHTML = `<label class="form-check-label" for="col${i + 1}">${
    columns[i].headerName
  }</label><input class="form-check-input" type="checkbox" id="col${i + 1}" />`;
  div.setAttribute("onclick", "executeNewTableBody()");
  allCheckBoxContainer.appendChild(div);
  ////////////////////////
  const th = document.createElement("th");
  th.className = `col${i + 1} hide`;
  th.innerHTML = `${columns[i].headerName}`;
  th.setAttribute("name", columns[i].field);
  th.setAttribute("value", columns[i].headerName);
  th.addEventListener("click", () => {
    toggleSortedColumn(th);
  });
  th.addEventListener("click", () => {
    sortBySelectedColumn(th);
  });
  th.style.cursor = "pointer";
  theadTr.appendChild(th);
}
