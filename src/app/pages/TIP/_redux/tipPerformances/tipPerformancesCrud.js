import axios from "axios";

export const TIPPERFORMANCES_URL = "/tip-performance";

// CREATE =>  POST: add a new tipPerformance to the server
export function createTIPPerformance(tipPerformance) {
  console.log(TIPPERFORMANCES_URL, "  ", TIPPERFORMANCES_URL + "/new")
  return axios.post(`${TIPPERFORMANCES_URL}/new`, { tipPerformance });
}

// READ
export function getAllTIPPerformances() {
  return axios.get(TIPPERFORMANCES_URL);
}

export function getTIPPerformanceById(tipPerformanceId) {
  return axios.get(`${TIPPERFORMANCES_URL}/${tipPerformanceId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findTIPPerformances(queryParams) {
  return axios.post(`${TIPPERFORMANCES_URL}/find/tip`, { queryParams });
}

// UPDATE => PUT: update the tipPerformance on the server
export function updateTIPPerformance(tipPerformance) {
  return axios.put(`${TIPPERFORMANCES_URL}/${tipPerformance.id}`, { tipPerformance });
}

// UPDATE Status
export function updateStatusForTIPPerformances(ids, status) {
  return axios.post(`${TIPPERFORMANCES_URL}/updateStatusForTIPPerformances`, {
    ids,
    status
  });
}

// DELETE => delete the tipPerformance from the server
export function deleteTIPPerformance(tipPerformanceId) {
  return axios.delete(`${TIPPERFORMANCES_URL}/${tipPerformanceId}`);
}

// DELETE TIPPerformances by ids
export function deleteTIPPerformances(ids) {
  return axios.post(`${TIPPERFORMANCES_URL}/deleteTIPPerformances`, { ids });
}
