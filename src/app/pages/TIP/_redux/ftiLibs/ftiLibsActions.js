import * as requestFromServer from "./ftiLibsCrud";
import {ftiLibsSlice, callTypes} from "./ftiLibsSlice";
import Swal from 'sweetalert2'
const {actions} = ftiLibsSlice;

export const fetchFtiLibs = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findFtiLibs(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.ftiLibsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ftiLibs";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchFtiLib = id => dispatch => {
  if (!id) {
    return dispatch(actions.ftiLibFetched({ ftiLibForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getFtiLibById(id)
    .then(response => {
      const {ftiLib} = response.data;
      dispatch(actions.ftiLibFetched({ ftiLibForEdit: ftiLib }));
    })
    .catch(error => {
      error.clientMessage = "Can't find ftiLib";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteFtiLib = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteFtiLib(id)
    .then(response => {
      dispatch(actions.ftiLibDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ftiLib";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createFtiLib = ftiLibForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createFtiLib(ftiLibForCreation)
    .then(response => {
      const { ftiLib } = response.data;
    
      
      dispatch(actions.ftiLibCreated({ ftiLib }));
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
       
 

      error.clientMessage = "Can't create ftiLib";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateFtiLib = ftiLib => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateFtiLib(ftiLib)
    .then(() => {
      dispatch(actions.ftiLibUpdated({ ftiLib }));
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

      error.clientMessage = "Can't update ftiLib";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateFtiLibsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForFtiLibs(ids, status)
    .then(() => {
      dispatch(actions.ftiLibsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update ftiLibs status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteFtiLibs = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteFtiLibs(ids)
    .then(() => {
      dispatch(actions.ftiLibsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete ftiLibs";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
