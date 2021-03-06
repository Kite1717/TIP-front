import { createSlice } from "@reduxjs/toolkit";

const initialUsersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userForEdit: undefined,
  lastError: null,
  monhtlyInfoSelectedUser : null,
  monthlyTotalCount : 0,
  individualInfoSelectedUser:null,
  invidualTotalCount:0,
  ioRecords : null,
  ioTotalCount : 0,
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
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
    // getUserById
    userFetched: (state, action) => {
      state.actionsLoading = false;
      state.userForEdit = action.payload.userForEdit;
      state.error = null;
    },
    // findUsers
    usersFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },


    //monthly infos
    userMonthlyInfoFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      
      state.monhtlyInfoSelectedUser = entities;
      state.monthlyTotalCount = totalCount;
    },

    //invidual infos
    userInvidualInfoFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      
      state.individualInfoSelectedUser = entities;
      state.invidualTotalCount = totalCount;
    },

    userIORecordsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      
      state.ioRecords = entities;
      state.ioTotalCount = totalCount;
    },

    
    
    // createUser
    userCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.user);
    },
    // updateUser
    userUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.user.id) {
          return action.payload.user;
        }
        return entity;
      });
    },
    // deleteUser
    userDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteUsers
    usersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // usersUpdateState
    usersStatusUpdated: (state, action) => {
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
