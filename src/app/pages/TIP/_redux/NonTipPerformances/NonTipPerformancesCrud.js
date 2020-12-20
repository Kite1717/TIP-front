import axios from "axios";

export const NONTIPPERFORMANCES_URL = "/tip-performance";

// CREATE =>  POST: add a new nonTipPerformance to the server
export function createNonTipPerformance(nonTipPerformance) {
  console.log(NONTIPPERFORMANCES_URL, "  ", NONTIPPERFORMANCES_URL + "/new")
  return axios.post(`${NONTIPPERFORMANCES_URL}/new`, { nonTipPerformance });
}

// READ
export function getAllNonTipPerformances() {
  return axios.get(NONTIPPERFORMANCES_URL);
}

export function getNonTipPerformanceById(nonTipPerformanceId) {
  return axios.get(`${NONTIPPERFORMANCES_URL}/${nonTipPerformanceId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findNonTipPerformances(queryParams) {
  return axios.post(`${NONTIPPERFORMANCES_URL}/find/non-tip`, { queryParams });
}

// UPDATE => PUT: update the nonTipPerformance on the server
export function updateNonTipPerformance(nonTipPerformance) {
  return axios.put(`${NONTIPPERFORMANCES_URL}/${nonTipPerformance.id}`, { nonTipPerformance });
}

// UPDATE Status
export function updateStatusForNonTipPerformances(ids, status) {
  return axios.post(`${NONTIPPERFORMANCES_URL}/updateStatusForNonTipPerformances`, {
    ids,
    status
  });
}

// DELETE => delete the nonTipPerformance from the server
export function deleteNonTipPerformance(nonTipPerformanceId) {
  return axios.delete(`${NONTIPPERFORMANCES_URL}/${nonTipPerformanceId}`);
}

// DELETE NonTipPerformances by ids
export function deleteNonTipPerformances(ids) {
  return axios.post(`${NONTIPPERFORMANCES_URL}/deleteNonTipPerformances`, { ids });
}
