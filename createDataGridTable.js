checkBoxANDtheadConstructor();

const checkBoxes = document.querySelectorAll("input[type=checkbox]");
function conditionsConstructor() {
  const conditions = [];
  for (let i = 0; i < checkBoxes.length; i++) {
    conditions.push(checkBoxes[i].checked);
  }
  return conditions;
}
function showAllColumnsHandler() {
  disActivateShowAllColumnsBtn();
  activateHideAllColumnsBtn();
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].checked = true;
  }
  executeNewTableBody();
}
function hideAllColumnsHandler() {
  disActivateHideAllColumnsBtn();
  activateShowAllColumnsBtn();
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].checked = false;
  }
  executeNewTableBody();
}

const showAllColumnsBtn = document.querySelector("#showAllColumnsBtn");
const hideAllColumnsBtn = document.querySelector("#hideAllColumnsBtn");
function activateButtons() {
  showAllColumnsBtn.disabled = false;
  hideAllColumnsBtn.disabled = false;
}
function activateShowAllColumnsBtn() {
  showAllColumnsBtn.disabled = false;
}
function disActivateShowAllColumnsBtn() {
  showAllColumnsBtn.disabled = true;
}
function activateHideAllColumnsBtn() {
  hideAllColumnsBtn.disabled = false;
}
function disActivateHideAllColumnsBtn() {
  hideAllColumnsBtn.disabled = true;
}

const message = document.querySelector("h1");
const pagination = document.querySelector("#pagination-container");
const exportBtn = document.querySelector("#excel-export-button");
const result = document.querySelector("#result");
const sortStatus = document.querySelector("#sort-status");
function showMessage() {
  message.classList.remove("hide");
  pagination.style = "display:none";
  exportBtn.style = "display:none";
  result.style = "display:none";
  sortStatus.style = "display:none";
}
function hideMessage() {
  message.classList.add("hide");
  pagination.style = "display:flex";
  exportBtn.style = "display:block";
  result.style = "display:block";
  sortStatus.style = "display:block";
}

const previousBtn = document.querySelector("#previous-page-btn");
const nextBtn = document.querySelector("#next-page-btn");
function activatePreviousBtn() {
  previousBtn.disabled = false;
}
function activateNextBtn() {
  nextBtn.disabled = false;
}
function disActivatePreviousBtn() {
  previousBtn.disabled = true;
}
function disActivateNextBtn() {
  nextBtn.disabled = true;
}

let sortedColumnName;
function toggleSortedColumn(selectedColumn) {
  if (!sortedColumnName) {
    sortedColumnName = {
      column: selectedColumn.getAttribute("name"),
      label: selectedColumn.getAttribute("value"),
      ascending: true,
    };
  } else if (selectedColumn.getAttribute("name") === sortedColumnName.column) {
    sortedColumnName = {
      column: selectedColumn.getAttribute("name"),
      label: selectedColumn.getAttribute("value"),
      ascending: !sortedColumnName.ascending,
    };
  } else {
    sortedColumnName = {
      column: selectedColumn.getAttribute("name"),
      label: selectedColumn.getAttribute("value"),
      ascending: true,
    };
  }
  executeNewTableBody();
}

function sortBySelectedColumn(selectedColumn) {
  tempArr = [];
  for (let i = 0; i < rows.length; i++) {
    tempArr.push({
      data: rows[i],
      sortIndex: rows[i][selectedColumn.getAttribute("name")],
    });
  }

  if (typeof tempArr[0].sortIndex === "number") {
    tempArr.sort(function compareFunc(a, b) {
      return a.sortIndex - b.sortIndex;
    });
  } else {
    tempArr.sort(function compareFunc(a, b) {
      if (a.sortIndex > b.sortIndex) return 1;
      else if (a.sortIndex < b.sortIndex) return -1;
      else return 0;
    });
  }

  rows = [];
  for (let i = 0; i < tempArr.length; i++) {
    rows.push(tempArr[i].data);
  }
  executeNewTableBody();

  if (sortedColumnName) {
    tempArr = [];
    for (let i = 0; i < rows.length; i++) {
      tempArr.push({
        data: rows[i],
        sortIndex: rows[i][sortedColumnName.column],
      });
    }

    if (typeof tempArr[0].sortIndex === "number") {
      if (sortedColumnName.ascending)
        tempArr.sort(function compareFunc(a, b) {
          if (sortedColumnName.ascending) return b.sortIndex - a.sortIndex;
          else return b.sortIndex - a.sortIndex;
        });
    } else {
      tempArr.sort(function compareFunc(a, b) {
        if (sortedColumnName.ascending) {
          if (a.sortIndex > b.sortIndex) return 1;
          else if (a.sortIndex < b.sortIndex) return -1;
          else return 0;
        } else {
          if (a.sortIndex > b.sortIndex) return -1;
          else if (a.sortIndex < b.sortIndex) return 1;
          else return 0;
        }
      });
    }

    rows = [];
    for (let i = 0; i < tempArr.length; i++) {
      rows.push(tempArr[i].data);
    }
    executeNewTableBody();
  }
}

function showSortedStatus() {
  console.log("sortedColumnName", sortedColumnName);
  if (sortedColumnName) {
    sortStatus.innerHTML = `جدول براساس ستون <b><u><i>${
      sortedColumnName.label
    }</i></u></b> به صورت <b><u><i>${
      sortedColumnName.ascending ? "صعودی" : "نزولی"
    }</i></u></b> مرتب شده است!`;
  } else {
    sortStatus.innerHTML =
      "با کلیک بر روی هر سرستون، جدول را به شکل دلخواه مرتب سازی نمائید!";
  }
}

//////////////////////////////////
function executeNewTableBody() {
  const loading = document.querySelector("#loading");
  loading.style.display = "flex";

  setTimeout(() => {
    const tBody = document.querySelector("#dataGridTbody");
    tBody.innerHTML = "";

    let checkBoxesAreDifferent = false;
    const conditions = conditionsConstructor();

    for (let i = 1; i < conditions.length; i++) {
      if (conditions[0] !== conditions[i]) {
        checkBoxesAreDifferent = true;
        break;
      }
    }
    if (checkBoxesAreDifferent) {
      activateButtons();
      hideMessage();
    }
    //all checkboxes are checked
    if (!checkBoxesAreDifferent && conditions[0]) {
      activateHideAllColumnsBtn();
      disActivateShowAllColumnsBtn();
      hideMessage();
    }
    //all checkboxes are unchecked
    if (!checkBoxesAreDifferent && !conditions[0]) {
      activateShowAllColumnsBtn();
      disActivateHideAllColumnsBtn();
      showMessage();
    }

    /////////////////////////////////////////
    const showState = document.querySelector("#show-state");
    showState.innerHTML = `${rowStart + 1} تا ${
      rows.length < rowEnd ? rows.length : rowEnd + 1
    } از ${rows.length}`;

    showOnly5buttons(page);

    document
      .querySelector(`.page-${page}-btn`)
      .classList.remove("btn-outline-primary", "disabled");
    document
      .querySelector(`.page-${page}-btn`)
      .classList.add("btn-primary", "disabled");

    if (rowStart <= 0) disActivatePreviousBtn();
    else activatePreviousBtn();
    if (rowEnd + 1 >= rows.length) disActivateNextBtn();
    else activateNextBtn();

    const columnsFields = [];
    for (let i = 0; i < columns.length; i++) {
      columnsFields.push(columns[i].field);
    }

    for (let i = rowStart; i <= rowEnd; i++) {
      if (!rows[i]) break;
      const tr = document.createElement("tr");
      for (let j = 0; j < columnsFields.length; j++) {
        const td = document.createElement("td");
        const th = document.querySelector(`th.col${j + 1}`);

        if (conditions[j]) {
          th.classList.remove("hide");
          td.className = `col${j + 1}`;
        } else {
          th.classList.add("hide");
          td.className = `col${j + 1} hide`;
        }
        td.innerHTML = rows[i][columnsFields[j]] || " --- ";
        td.setAttribute("name", columns[j].field);
        tr.appendChild(td);
      }
      tBody.appendChild(tr);
    }
    loading.style.display = "none";
  }, 1);

  showSortedStatus();
}

showAllColumnsHandler();
