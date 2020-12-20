import axios from "axios";

export const TIPLIBRARIES_URL = "/cti-library";

// CREATE =>  POST: add a new tipLibrary to the server
export function createTIPLibrary(tipLibrary) {
  console.log(TIPLIBRARIES_URL, "  ", TIPLIBRARIES_URL + "/new")
  return axios.post(`${TIPLIBRARIES_URL}/new`, { tipLibrary });
}

// READ
export function getAllTIPLibraries() {
  return axios.get(TIPLIBRARIES_URL);
}

export function getTIPLibraryById(tipLibraryId) {
  return axios.get(`${TIPLIBRARIES_URL}/${tipLibraryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findTIPLibraries(queryParams) {
  return axios.post(`${TIPLIBRARIES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the tipLibrary on the server
export function updateTIPLibrary(tipLibrary) {
  return axios.put(`${TIPLIBRARIES_URL}/${tipLibrary.id}`, { tipLibrary });
}

// UPDATE Status
export function updateStatusForTIPLibraries(ids, status) {
  return axios.post(`${TIPLIBRARIES_URL}/updateStatusForTIPLibraries`, {
    ids,
    status
  });
}

// DELETE => delete the tipLibrary from the server
export function deleteTIPLibrary(tipLibraryId) {
  return axios.delete(`${TIPLIBRARIES_URL}/${tipLibraryId}`);
}

// DELETE TIPLibraries by ids
export function deleteTIPLibraries(ids) {
  return axios.post(`${TIPLIBRARIES_URL}/deleteTIPLibraries`, { ids });
}
