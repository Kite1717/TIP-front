export const FtiLibStatusCssClasses = ["danger", "success", "info", ""];
export const FtiLibStatusTitles = ["Suspended", "Active", "Pending", ""];
export const FtiLibTypeCssClasses = ["success", "primary", ""];
export const FtiLibTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    code :null,
    catId : null,
    subCatId : null,
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};
