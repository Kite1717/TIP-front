import { createSlice } from "@reduxjs/toolkit";

const initialTIPLibrariesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  tipLibraryForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const tipLibrariesSlice = createSlice({
  name: "tipLibraries",
  initialState: initialTIPLibrariesState,
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
    // getTIPLibraryById
    tipLibraryFetched: (state, action) => {
      state.actionsLoading = false;
      state.tipLibraryForEdit = action.payload.tipLibraryForEdit;
      state.error = null;
    },
    // findTIPLibraries
    tipLibrariesFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTIPLibrary
    tipLibraryCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.tipLibrary);
    },
    // updateTIPLibrary
    tipLibraryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.tipLibrary.id) {
          return action.payload.tipLibrary;
        }
        return entity;
      });
    },
    // deleteTIPLibrary
    tipLibraryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteTIPLibraries
    tipLibrariesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // tipLibrariesUpdateState
    tipLibrariesStatusUpdated: (state, action) => {
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
