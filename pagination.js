let page = 1;
let rowStart = 0;
let pageSize = 10;
let rowEnd = rowStart + pageSize - 1;

function showOnly5buttons(page) {
  const pagesBtnList = document.querySelector("#pages-btn-list");
  pagesBtnList.innerHTML = "";

  if (Math.ceil(rows.length / pageSize) > 5) {
    let start;
    let end;

    if (page === 1) {
      start = page - 1;
      end = start + 5;
    }
    if (page === 2) {
      start = page - 2;
      end = start + 5;
    }
    if (page > 2) {
      start = page - 3;
      end = start + 5;
    }
    if (page >= Math.ceil(rows.length / pageSize) - 1) {
      start = Math.ceil(rows.length / pageSize) - 5;
      end = Math.ceil(rows.length / pageSize);
    }

    for (let i = start; i < end; i++) {
      pagesBtnList.innerHTML += `
      <li>
        <button onclick="changePage(parseInt(this.innerHTML));" class="btn btn-outline-primary page-${
          i + 1
        }-btn">${i + 1}</button>
      </li>
    `;
    }
  } else {
    for (let i = 0; i < Math.ceil(rows.length / pageSize); i++) {
      pagesBtnList.innerHTML += `
      <li>
        <button onclick="changePage(parseInt(this.innerHTML));" class="btn btn-outline-primary page-${
          i + 1
        }-btn">${i + 1}</button>
      </li>
    `;
    }
  }
}

function changePage(newPageNumber) {
  page = newPageNumber;
  rowStart = (page - 1) * pageSize;
  rowEnd = page * pageSize - 1;

  executeNewTableBody();
}

function changePageSize(newSize) {
  page = 1;

  if (newSize === "all") pageSize = rows.length;
  else pageSize = parseInt(newSize);
  rowStart = (page - 1) * pageSize;
  rowEnd = page * pageSize - 1;

  executeNewTableBody();
}

function goToPreviousPage() {
  page--;

  rowStart = (page - 1) * pageSize;
  rowEnd = page * pageSize - 1;

  executeNewTableBody();
}

function goToNextPage() {
  page++;

  rowStart = (page - 1) * pageSize;
  rowEnd = page * pageSize - 1;

  executeNewTableBody();
}
