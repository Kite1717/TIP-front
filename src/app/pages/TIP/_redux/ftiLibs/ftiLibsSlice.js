import { createSlice } from "@reduxjs/toolkit";

const initialFtiLibsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  ftiLibForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const ftiLibsSlice = createSlice({
  name: "ftiLibs",
  initialState: initialFtiLibsState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getFtiLibById
    ftiLibFetched: (state, action) => {
      state.actionsLoading = false;
      state.ftiLibForEdit = action.payload.ftiLibForEdit;
      state.error = null;
    },
    // findFtiLibs
    ftiLibsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFtiLib
    ftiLibCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.ftiLib);
    },
    // updateFtiLib
    ftiLibUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.ftiLib.id) {
          return action.payload.ftiLib;
        }
        return entity;
      });
    },
    // deleteFtiLib
    ftiLibDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteFtiLibs
    ftiLibsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // ftiLibsUpdateState
    ftiLibsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
