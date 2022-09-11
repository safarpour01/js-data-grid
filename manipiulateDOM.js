const toggleColumnsBtn = document.querySelector("#toggle-columns-btn");
const allCheckboxesContainer = document.querySelector(
  "#all-checkboxes-container"
);

document.addEventListener("click", () => {
  allCheckboxesContainer.style.display = "none";
});

toggleColumnsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  allCheckboxesContainer.style.display = "flex";
});
