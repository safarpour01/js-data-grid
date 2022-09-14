let filterColumnsOptions;

for (let i = 0; i < columns.length; i++) {
  filterColumnsOptions += `
    <option value="${columns[i]}">${columns[i].headerName}</option>
   `;
}

const filterConditionsOptions = `
    <select
        class="form-select"
        style="width: 95px"
    >
        <option value="contains">شامل</option>
        <option value="equals">برابر باشد با</option>
        <option value="isEmpty">خالی باشد</option>
        <option value="isNotEmpty">خالی نباشد</option>
    </select>
`;

filtersContainer.innerHTML = `
<div class="filterRow">
    <svg
        onclick="removeFilter(this)"
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        class="bi bi-x-square"
        viewBox="0 0 16 16"
    >
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>

    <select
        class="form-select"
        style="width: 95px"
    >
    ${filterColumnsOptions}
    </select>

    ${filterConditionsOptions}

    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
</div>
`;

function removeFilter(removeBtn) {
  if (removeBtn?.parentElement?.parentNode?.children?.length > 1)
    removeBtn.parentElement.remove();
  else {
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      filtersContainer.style.display = "none";
    });
    for (let i = 1; i < removeBtn.parentElement.children; i++) {
      removeBtn.parentElement.children[i].value = "";
      console.log(removeBtn.parentElement.children[1]);
    }
  }
}
