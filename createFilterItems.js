function createFirstFilter() {
  let deleteIcon = `
    <svg
        onclick="resetTable()"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-x-square"
        viewBox="0 0 16 16"
    >
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
  `;

  let columnsOptions;
  for (let i = 0; i < columns.length; i++) {
    columnsOptions += `
      <option value="${columns[i].field}">${columns[i].headerName}</option>
      `;
  }

  let columnsSelect = `
    <select class='form-select'>
        ${columnsOptions}
    </select>  
  `;

  let conditionsSelect = `
    <select class='form-select' onchange='setFilterValueStatus(this)'>
        <option value='contains'>شامل</option>
        <option value='equals'>برابر با</option>
        <option value='isEmpty'>خالی باشد</option>
        <option value='isNotEmpty'>خالی نباشد</option>
    </select> 
   `;

  let filterValue = `<input type="text" class="form-control" placeholder="مقدار">`;

  let submitBtn = `<button class="btn btn-primary" onclick="applyFilter(this.parentNode)">اعمال</button>`;

  const result = `<div class='filter-row'>${deleteIcon}${columnsSelect}${conditionsSelect}${filterValue}${submitBtn}</div>`;
  return result;
}

filtersContainer.innerHTML = createFirstFilter();

function setFilterValueStatus(selectTag) {
  if (selectTag.value === "isEmpty" || selectTag.value === "isNotEmpty") {
    selectTag.parentNode.querySelector("input").style.display = "none";
    selectTag.parentNode.querySelector("input").value = "";
  } else selectTag.parentNode.querySelector("input").style.display = "flex";
}

function applyFilter(filterRow) {
  rows = defaultRows;
  const column = filterRow.querySelectorAll("select")[0].value;
  const condition = filterRow.querySelectorAll("select")[1].value;
  const filterValue = filterRow.querySelector("input").value.trim();

  if (condition === "equals") {
    rows = rows.filter((row) => {
      if (typeof row[column] !== "string") row[column] = row[column].toString();
      if (row[column].trim() === filterValue) return row;
    });
  }

  if (condition === "isEmpty") {
    rows = rows.filter((row) => {
      return !row[column]?.toString().trim().length;
    });
  }

  if (condition === "isNotEmpty") {
    rows = rows.filter((row) => {
      return row[column]?.toString().trim().length;
    });
  }

  if (rows.length) executeNewTableBody();
  else alert("بدون نتیجه");
}

function resetTable() {
  rows = defaultRows;
  executeNewTableBody();
}
