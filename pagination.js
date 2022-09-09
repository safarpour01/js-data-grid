let page = 1;
let rowStart = 0;
let pageSize = 5;
let rowEnd = rowStart + pageSize - 1;

function changePage(newPageNumber) {
  page = newPageNumber;
  rowStart = (page - 1) * pageSize;
  rowEnd = page * pageSize - 1;

  executeNewTableBody();
}

function changePageSize(newSize) {
  page = 1;
  pageSize = parseInt(newSize);
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
