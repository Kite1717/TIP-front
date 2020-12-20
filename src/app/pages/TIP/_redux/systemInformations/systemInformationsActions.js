import * as requestFromServer from "./systemInformationsCrud";
import { systemInformationsSlice, callTypes } from "./systemInformationsSlice";

const { actions } = systemInformationsSlice;

export const fetchSystemInformations = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSystemInformations(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.systemInformationsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find systemInformations";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSystemInformation = id => dispatch => {
  if (!id) {
    return dispatch(actions.systemInformationFetched({ systemInformationForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getSystemInformationById(id)
    .then(response => {
      const systemInformation = response.data;
      dispatch(actions.systemInformationFetched({ systemInformationForEdit: systemInformation }));
    })
    .catch(error => {
      error.clientMessage = "Can't find systemInformation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSystemInformation = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSystemInformation(id)
    .then(response => {
      dispatch(actions.systemInformationDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete systemInformation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createSystemInformation = systemInformationForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createSystemInformation(systemInformationForCreation)
    .then(response => {
      console.log(response.data.systemInformation)
      const { systemInformation } = response.data;
      dispatch(actions.systemInformationCreated({ systemInformation }));
    })
    .catch(error => {
      error.clientMessage = "Can't create systemInformation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSystemInformation = systemInformation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateSystemInformation(systemInformation)
    .then(() => {
      dispatch(actions.systemInformationUpdated({ systemInformation }));
    })
    .catch(error => {
      error.clientMessage = "Can't update systemInformation";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateSystemInformationsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForSystemInformations(ids, status)
    .then(() => {
      dispatch(actions.systemInformationsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update systemInformations status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteSystemInformations = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteSystemInformations(ids)
    .then(() => {
      dispatch(actions.systemInformationsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete systemInformations";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
