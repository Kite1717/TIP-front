import axios from "axios";

export const FTILIBS_URL = "/fti-library";

// CREATE =>  POST: add a new ftiLib to the server
export function createFtiLib(ftiLib) {
  console.log(FTILIBS_URL,"  ",FTILIBS_URL + "/new")
  return axios.post(`${FTILIBS_URL}/new`, { ftiLib });
}

// READ
export function getAllFtiLibs() {
  return axios.get(FTILIBS_URL);
}

export function getFtiLibById(ftiLibId) {
  return axios.get(`${FTILIBS_URL}/${ftiLibId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findFtiLibs(queryParams) {
  return axios.post(`${FTILIBS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the ftiLib on the server
export function updateFtiLib(ftiLib) {
  return axios.put(`${FTILIBS_URL}/${ftiLib.id}`, { ftiLib });
}

// UPDATE Status
export function updateStatusForFtiLibs(ids, status) {
  return axios.post(`${FTILIBS_URL}/updateStatusForFtiLibs`, {
    ids,
    status
  });
}

// DELETE => delete the ftiLib from the server
export function deleteFtiLib(ftiLibId) {
  return axios.delete(`${FTILIBS_URL}/${ftiLibId}`);
}

// DELETE FtiLibs by ids
export function deleteFtiLibs(ids) {
  return axios.post(`${FTILIBS_URL}/deleteFtiLibs`, { ids });
}
