import * as requestFromServer from "./individualReportsCrud";
import {individualReportsSlice, callTypes} from "./individualReportsSlice";
import Swal from 'sweetalert2'
const {actions} = individualReportsSlice;

export const fetchIndividualReports = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findIndividualReports(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.individualReportsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find individualReports";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchIndividualReport = id => dispatch => {
  if (!id) {
    return dispatch(actions.individualReportFetched({ individualReportForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getIndividualReportById(id)
    .then(response => {
      const {individualReport} = response.data;
      dispatch(actions.individualReportFetched({ individualReportForEdit: individualReport }));
    })
    .catch(error => {
      error.clientMessage = "Can't find individualReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

//fetch individualReport IO Recods

export const fetchIndividualReportIORecords = deviceIdNo => dispatch => {

  
  return requestFromServer
    .getIndividualReportIORecords(deviceIdNo)
    .then(response => {
      const {totalCount,entities} = response.data;
      dispatch(actions.individualReportIORecordsFetched({ entities,totalCount }));
    })
    .catch(error => {
      error.clientMessage = "Can't find individualReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};


//fetch individualReport monthly infos



export const fetchIndividualReportMonthlyReport = deviceIdNo => dispatch => {

  
  return requestFromServer
    .getIndividualReportInfosMonthly(deviceIdNo)
    .then(response => {
      const {totalCount,entities} = response.data;
      dispatch(actions.individualReportMonthlyInfoFetched({ entities,totalCount }));
    })
    .catch(error => {
      error.clientMessage = "Can't find individualReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

//fetch individualReport invidual infos


export const fetchIndividualReportIndividualReport = deviceIdNo => dispatch => {

  
  return requestFromServer
    .getIndividualReportInfosIndividual(deviceIdNo)
    .then(response => {
      const {totalCount,entities} = response.data;
      
      dispatch(actions.individualReportInvidualInfoFetched({ entities,totalCount }));
    })
    .catch(error => {
      error.clientMessage = "Can't find individualReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};



export const deleteIndividualReport = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIndividualReport(id)
    .then(response => {
      dispatch(actions.individualReportDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete individualReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createIndividualReport = individualReportForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createIndividualReport(individualReportForCreation)
    .then(response => {
      const { individualReport } = response.data;
    
      
      dispatch(actions.individualReportCreated({ individualReport }));
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
       
 

      error.clientMessage = "Can't create individualReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateIndividualReport = individualReport => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateIndividualReport(individualReport)
    .then(() => {
      dispatch(actions.individualReportUpdated({ individualReport }));
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

      error.clientMessage = "Can't update individualReport";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateIndividualReportsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForIndividualReports(ids, status)
    .then(() => {
      dispatch(actions.individualReportsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update individualReports status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteIndividualReports = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteIndividualReports(ids)
    .then(() => {
      dispatch(actions.individualReportsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete individualReports";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
