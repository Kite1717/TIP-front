import * as requestFromServer from "./NonTipPerformancesCrud";
import { nonTipPerformancesSlice, callTypes } from "./NonTipPerformancesSlice";
import Swal from 'sweetalert2'
const { actions } = nonTipPerformancesSlice;

export const fetchNonTipPerformances = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findNonTipPerformances(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.nonTipPerformancesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find nonTipPerformances";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchNonTipPerformance = id => dispatch => {
  if (!id) {
    return dispatch(actions.nonTipPerformanceFetched({ nonTipPerformanceForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getNonTipPerformanceById(id)
    .then(response => {
      const { nonTipPerformance } = response.data;
      dispatch(actions.nonTipPerformanceFetched({ nonTipPerformanceForEdit: nonTipPerformance }));
    })
    .catch(error => {
      error.clientMessage = "Can't find nonTipPerformance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteNonTipPerformance = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteNonTipPerformance(id)
    .then(response => {
      dispatch(actions.nonTipPerformanceDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete nonTipPerformance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createNonTipPerformance = nonTipPerformanceForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createNonTipPerformance(nonTipPerformanceForCreation)
    .then(response => {
      const { nonTipPerformance } = response.data;


      dispatch(actions.nonTipPerformanceCreated({ nonTipPerformance }));
    })
    .catch(error => {


      const data = error.response.data
      if (data.errors[0].message === "tcNo must be unique") {
        Swal.fire({

          icon: 'error',
          title: 'Bu TC Kimlik Numarası ile kayıtlı kullanıcı bulunmaktadır',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'
        })
      }
      else if (data.errors[0].message === "deviceIdNo must be unique") {
        Swal.fire({

          icon: 'error',
          title: 'Bu Cihaz Kimlik Numarası ile kayıtlı kullanıcı bulunmaktadır',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'
        })
      }



      error.clientMessage = "Can't create nonTipPerformance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateNonTipPerformance = nonTipPerformance => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateNonTipPerformance(nonTipPerformance)
    .then(() => {
      dispatch(actions.nonTipPerformanceUpdated({ nonTipPerformance }));
    })
    .catch(error => {
      if (!error.response.data.type) {
        Swal.fire({

          icon: 'error',
          title: 'Girdiğiniz TC numarası veya cihaz kimlik numarası başka bir kullancıya aittir',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Tamam'

        })

      }

      error.clientMessage = "Can't update nonTipPerformance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateNonTipPerformancesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForNonTipPerformances(ids, status)
    .then(() => {
      dispatch(actions.nonTipPerformancesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update nonTipPerformances status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteNonTipPerformances = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteNonTipPerformances(ids)
    .then(() => {
      dispatch(actions.nonTipPerformancesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete nonTipPerformances";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
