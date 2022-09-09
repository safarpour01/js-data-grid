function checkBoxANDtheadConstructor() {
  const allCheckBoxContainer = document.querySelector(
    "#all-checkboxes-container"
  );
  const theadTr = document.querySelector("#TableheadingRow");

  for (let i = 0; i < columns.length; i++) {
    const div = document.createElement("div");
    div.className = "form-check form-switch";
    div.setAttribute("onclick", "executeNewTableBody()");
    div.innerHTML = `<label class="form-check-label" for="col${i + 1}">${
      columns[i].headerName
    }</label><input class="form-check-input" type="checkbox" id="col${
      i + 1
    }" />`;
    allCheckBoxContainer.appendChild(div);
    ////////////////////////
    const th = document.createElement("th");
    th.className = `col${i + 1} hide`;
    th.innerHTML = `${columns[i].headerName}`;
    theadTr.appendChild(th);
  }
}
