import axios from "axios";

export const DEVICEREPORTS_URL = "/device-report";

// CREATE =>  POST: add a new deviceReport to the server
export function createDeviceReport(deviceReport) {
  console.log(DEVICEREPORTS_URL,"  ",DEVICEREPORTS_URL + "/new")
  return axios.post(`${DEVICEREPORTS_URL}/new`, { deviceReport });
}

// READ
export function getAllDeviceReports() {
  return axios.get(DEVICEREPORTS_URL);
}

export function getDeviceReportById(deviceReportId) {
  return axios.get(`${DEVICEREPORTS_URL}/${deviceReportId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findDeviceReports(queryParams) {
  return axios.post(`${DEVICEREPORTS_URL}/input-output/find`, { queryParams });
}

// UPDATE => PUT: update the deviceReport on the server
export function updateDeviceReport(deviceReport) {
  return axios.put(`${DEVICEREPORTS_URL}/${deviceReport.id}`, { deviceReport });
}

// UPDATE Status
export function updateStatusForDeviceReports(ids, status) {
  return axios.post(`${DEVICEREPORTS_URL}/updateStatusForDeviceReports`, {
    ids,
    status
  });
}

// DELETE => delete the deviceReport from the server
export function deleteDeviceReport(deviceReportId) {
  return axios.delete(`${DEVICEREPORTS_URL}/${deviceReportId}`);
}


export function getDeviceReportInfosMonthly(deviceIdNo) {
  return axios.get(`${DEVICEREPORTS_URL}/monthly-info/${deviceIdNo}`);
}



// DELETE DeviceReports by ids
export function deleteDeviceReports(ids) {
  return axios.post(`${DEVICEREPORTS_URL}/deleteDeviceReports`, { ids });
}
