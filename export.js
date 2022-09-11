function html_table_to_excel(type) {
  var data = document.getElementById("export-table");

  var file = XLSX.utils.table_to_book(data, { sheet: "sheet1" });

  XLSX.write(file, { bookType: type, bookSST: true, type: "base64" });

  XLSX.writeFile(file, "data-grid-table." + type);
}

const export_button = document.getElementById("excel-export-button");

export_button.addEventListener("click", () => {
  html_table_to_excel("xlsx");
});
