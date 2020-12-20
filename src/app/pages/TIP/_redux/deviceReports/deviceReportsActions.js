import * as requestFromServer from "./deviceReportsCrud";
import {deviceReportsSlice, callTypes} from "./deviceReportsSlice";
import Swal from 'sweetalert2'
const {actions} = deviceReportsSlice;

export const fetchDeviceReports = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findDeviceReports(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.deviceReportsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find deviceReports";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchDeviceReport = id => dispatch => {
  if (!id) {
    return dispatch(actions.deviceReportFetched({ deviceReportForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getDeviceReportById(id)
    .then(response => {
      const {deviceReport} = response.data;
      dispatch(actions.deviceReportFetched({ deviceReportForEdit: deviceReport }));
    })
    .catch(error => {
      error.clientMessage = "Can't find deviceReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

//fetch deviceReport monthly infos



export const fetchDeviceReportMonthlyReport = deviceIdNo => dispatch => {

  
  return requestFromServer
    .getDeviceReportInfosMonthly(deviceIdNo)
    .then(response => {
      const {deviceReport} = response.data;
      dispatch(actions.deviceReportMonthlyInfoFetched({ deviceReportForEdit: deviceReport }));
    })
    .catch(error => {
      error.clientMessage = "Can't find deviceReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDeviceReport = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDeviceReport(id)
    .then(response => {
      dispatch(actions.deviceReportDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete deviceReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createDeviceReport = deviceReportForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createDeviceReport(deviceReportForCreation)
    .then(response => {
      const { deviceReport } = response.data;
    
      
      dispatch(actions.deviceReportCreated({ deviceReport }));
    })
    .catch(error => {
     

        const data = error.response.data
        if(data.errors[0].message === "tcNo must be unique")
        {
         Swal.fire({
        
           icon: 'error',
           title: 'Bu TC Kimlik Numarası ile kayıtlı kullanıcı bulunmaktadır',
           confirmButtonColor: '#3085d6',
           confirmButtonText: 'Tamam'
         })
        }
      else if(data.errors[0].message === "deviceIdNo must be unique")
      {
        Swal.fire({
        
          icon: 'error',
          title: 'Bu Cihaz Kimlik Numarası ile kayıtlı kullanıcı bulunmaktadır',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'
        })
      }
       
 

      error.clientMessage = "Can't create deviceReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDeviceReport = deviceReport => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateDeviceReport(deviceReport)
    .then(() => {
      dispatch(actions.deviceReportUpdated({ deviceReport }));
    })
    .catch(error => {
      if(!error.response.data.type)
      {
        Swal.fire({
        
          icon: 'error',
          title: 'Girdiğiniz TC numarası veya cihaz kimlik numarası başka bir kullancıya aittir',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'

        })

      }

      error.clientMessage = "Can't update deviceReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateDeviceReportsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForDeviceReports(ids, status)
    .then(() => {
      dispatch(actions.deviceReportsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update deviceReports status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteDeviceReports = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteDeviceReports(ids)
    .then(() => {
      dispatch(actions.deviceReportsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete deviceReports";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
