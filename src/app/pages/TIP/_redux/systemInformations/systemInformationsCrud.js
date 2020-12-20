import axios from "axios";

export const SYSTEMINFORMATIONS_URL = "/tip-device-info";

// CREATE =>  POST: add a new systemInformation to the server
export function createSystemInformation(systemInformation) {
  return axios.post(`${SYSTEMINFORMATIONS_URL}/new`, { systemInformation });
}

// READ
export function getAllSystemInformations() {
  return axios.get(SYSTEMINFORMATIONS_URL);
}

export function getSystemInformationById(systemInformationId) {
  return axios.get(`${SYSTEMINFORMATIONS_URL}/${systemInformationId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findSystemInformations(queryParams) {
  return axios.post(`${SYSTEMINFORMATIONS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the systemInformation on the server
export function updateSystemInformation(systemInformation) {
  return axios.put(`${SYSTEMINFORMATIONS_URL}/${systemInformation.id}`, { systemInformation });
}

// UPDATE Status
export function updateStatusForSystemInformations(ids, status) {
  return axios.post(`${SYSTEMINFORMATIONS_URL}/updateStatusForSystemInformations`, {
    ids,
    status
  });
}

// DELETE => delete the systemInformation from the server
export function deleteSystemInformation(systemInformationId) {
  return axios.delete(`${SYSTEMINFORMATIONS_URL}/${systemInformationId}`);
}

// DELETE SystemInformations by ids
export function deleteSystemInformations(ids) {
  return axios.post(`${SYSTEMINFORMATIONS_URL}/deleteSystemInformations`, { ids });
}
