import * as requestFromServer from "./tipLibrariesCrud";
import { tipLibrariesSlice, callTypes } from "./tipLibrariesSlice";
import Swal from 'sweetalert2'
const { actions } = tipLibrariesSlice;

export const fetchTIPLibraries = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findTIPLibraries(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.tipLibrariesFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find tipLibraries";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchTIPLibrary = id => dispatch => {
  if (!id) {
    return dispatch(actions.tipLibraryFetched({ tipLibraryForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getTIPLibraryById(id)
    .then(response => {
      const { tipLibrary } = response.data;
      dispatch(actions.tipLibraryFetched({ tipLibraryForEdit: tipLibrary }));
    })
    .catch(error => {
      error.clientMessage = "Can't find tipLibrary";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTIPLibrary = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTIPLibrary(id)
    .then(response => {
      dispatch(actions.tipLibraryDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete tipLibrary";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createTIPLibrary = tipLibraryForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createTIPLibrary(tipLibraryForCreation)
    .then(response => {
      const { tipLibrary } = response.data;

      dispatch(actions.tipLibraryCreated({ tipLibrary }));
    })
    .catch(error => {


      const data = error.response.data
      if (data.errors[0].message === "tcNo must be unique") {
        Swal.fire({

          icon: 'error',
          title: 'Bu TC Kimlik Numarası ile kayıtlı kullanıcı bulunmaktadır',
          showConfirmButton: false,
          timer: 1500,
        })
      }



      error.clientMessage = "Can't create tipLibrary";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTIPLibrary = tipLibrary => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateTIPLibrary(tipLibrary)
    .then(() => {
      dispatch(actions.tipLibraryUpdated({ tipLibrary }));
    })
    .catch(error => {
      error.clientMessage = "Can't update tipLibrary";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateTIPLibrariesStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForTIPLibraries(ids, status)
    .then(() => {
      dispatch(actions.tipLibrariesStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update tipLibraries status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteTIPLibraries = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteTIPLibraries(ids)
    .then(() => {
      dispatch(actions.tipLibrariesDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete tipLibraries";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
