const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "نام",
    width: 90,
  },
  {
    field: "lastName",
    headerName: "نام خانوادگی",
    width: 90,
  },
  {
    field: "age",
    headerName: "سن",
    width: 90,
  },
  {
    field: "birthDate",
    headerName: "تاریخ تولد",
    width: 90,
  },
];
const rows = [
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
  { id: 1, lastName: "صفرپور", firstName: "علیرضا", age: 35 },
];

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
checkBoxANDtheadConstructor();

const tBody = document.querySelector("#dataGridTbody");
const message = document.querySelector("h1");
const showAllColumnsBtn = document.querySelector("#showAllColumnsBtn");
const hideAllColumnsBtn = document.querySelector("#hideAllColumnsBtn");
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

function showMessage() {
  message.classList.remove("hide");
}

function hideMessage() {
  message.classList.add("hide");
}

function executeNewTableBody() {
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

  const columnsFields = [];
  for (let i = 0; i < columns.length; i++) {
    columnsFields.push(columns[i].field);
  }

  for (let i = 0; i < rows.length; i++) {
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
      td.innerHTML = rows[i][columnsFields[j]] || "---";
      tr.appendChild(td);
    }
    tBody.appendChild(tr);
  }
}

showAllColumnsHandler();
