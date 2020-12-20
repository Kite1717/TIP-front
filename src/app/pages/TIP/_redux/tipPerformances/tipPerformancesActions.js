import * as requestFromServer from "./tipPerformancesCrud";
import { tipPerformancesSlice, callTypes } from "./tipPerformancesSlice";
import Swal from 'sweetalert2'
const { actions } = tipPerformancesSlice;

export const fetchTIPPerformances = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTIPPerformances(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.tipPerformancesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find tipPerformances";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTIPPerformance = id => dispatch => {
  if (!id) {
    return dispatch(actions.tipPerformanceFetched({ tipPerformanceForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getTIPPerformanceById(id)
    .then(response => {
      const { tipPerformance } = response.data;
      dispatch(actions.tipPerformanceFetched({ tipPerformanceForEdit: tipPerformance }));
    })
    .catch(error => {
      error.clientMessage = "Can't find tipPerformance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTIPPerformance = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTIPPerformance(id)
    .then(response => {
      dispatch(actions.tipPerformanceDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete tipPerformance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createTIPPerformance = tipPerformanceForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTIPPerformance(tipPerformanceForCreation)
    .then(response => {
      const { tipPerformance } = response.data;


      dispatch(actions.tipPerformanceCreated({ tipPerformance }));
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



      error.clientMessage = "Can't create tipPerformance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTIPPerformance = tipPerformance => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTIPPerformance(tipPerformance)
    .then(() => {
      dispatch(actions.tipPerformanceUpdated({ tipPerformance }));
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

      error.clientMessage = "Can't update tipPerformance";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTIPPerformancesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForTIPPerformances(ids, status)
    .then(() => {
      dispatch(actions.tipPerformancesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update tipPerformances status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTIPPerformances = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTIPPerformances(ids)
    .then(() => {
      dispatch(actions.tipPerformancesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete tipPerformances";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
