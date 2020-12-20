export const TIPLibraryStatusCssClasses = ["danger", "success", "info", ""];
export const TIPLibraryStatusTitles = ["Suspended", "Active", "Pending", ""];
export const TIPLibraryTypeCssClasses = ["success", "primary", ""];
export const TIPLibraryTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
     code :null,
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};
