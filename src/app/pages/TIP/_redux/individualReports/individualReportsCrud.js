import axios from "axios";

export const INDIVIDUALREPORTS_URL = "/device-report";

// CREATE =>  POST: add a new individualReport to the server
export function createIndividualReport(individualReport) {
  console.log(INDIVIDUALREPORTS_URL,"  ",INDIVIDUALREPORTS_URL + "/new")
  return axios.post(`${INDIVIDUALREPORTS_URL}/new`, { individualReport });
}

// READ
export function getAllIndividualReports() {
  return axios.get(INDIVIDUALREPORTS_URL);
}

export function getIndividualReportById(individualReportId) {
  return axios.get(`${INDIVIDUALREPORTS_URL}/${individualReportId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findIndividualReports(queryParams) {
  return axios.post(`${INDIVIDUALREPORTS_URL}/ind-result/device/find`, { queryParams });
}

// UPDATE => PUT: update the individualReport on the server
export function updateIndividualReport(individualReport) {
  return axios.put(`${INDIVIDUALREPORTS_URL}/${individualReport.id}`, { individualReport });
}

// UPDATE Status
export function updateStatusForIndividualReports(ids, status) {
  return axios.post(`${INDIVIDUALREPORTS_URL}/updateStatusForIndividualReports`, {
    ids,
    status
  });
}

// DELETE => delete the individualReport from the server
export function deleteIndividualReport(individualReportId) {
  return axios.delete(`${INDIVIDUALREPORTS_URL}/${individualReportId}`);
}


export function getIndividualReportInfosMonthly(deviceIdNo) {
  return axios.get(`${INDIVIDUALREPORTS_URL}/monthly-info/${deviceIdNo}`);
}

export function getIndividualReportInfosIndividual(deviceIdNo) {
  return axios.get(`${INDIVIDUALREPORTS_URL}/invidual-info/${deviceIdNo}`);
}

export function getIndividualReportIORecords(deviceIdNo) {
  return axios.get(`${INDIVIDUALREPORTS_URL}/input-output/${deviceIdNo}`);
}





// DELETE IndividualReports by ids
export function deleteIndividualReports(ids) {
  return axios.post(`${INDIVIDUALREPORTS_URL}/deleteIndividualReports`, { ids });
}
