const toggleColumnsBtn = document.querySelector("#toggle-columns-btn");
const allCheckboxesContainer = document.querySelector(
  "#all-checkboxes-container"
);
const showFilterBtn = document.querySelector("#show-filters-btn");
const filtersContainer = document.querySelector("#filters-container");

document.addEventListener("click", () => {
  allCheckboxesContainer.style.display = "none";
  filtersContainer.style.display = "none";
});

toggleColumnsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  allCheckboxesContainer.style.display = "flex";
  filtersContainer.style.display = "none";
});

showFilterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  filtersContainer.style.display = "flex";
  allCheckboxesContainer.style.display = "none";
});
