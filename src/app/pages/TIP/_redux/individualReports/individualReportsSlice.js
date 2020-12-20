import { createSlice } from "@reduxjs/toolkit";

const initialIndividualReportsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  individualReportForEdit: undefined,
  lastError: null,
  monhtlyInfoSelectedIndividualReport : null,
  monthlyTotalCount : 0,
  individualInfoSelectedIndividualReport:null,
  invidualTotalCount:0,
  ioRecords : null,
  ioTotalCount : 0,
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const individualReportsSlice = createSlice({
  name: "individualReports",
  initialState: initialIndividualReportsState,
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
    // getIndividualReportById
    individualReportFetched: (state, action) => {
      state.actionsLoading = false;
      state.individualReportForEdit = action.payload.individualReportForEdit;
      state.error = null;
    },
    // findIndividualReports
    individualReportsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },


    //monthly infos
    individualReportMonthlyInfoFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      
      state.monhtlyInfoSelectedIndividualReport = entities;
      state.monthlyTotalCount = totalCount;
    },

    //invidual infos
    individualReportInvidualInfoFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      
      state.individualInfoSelectedIndividualReport = entities;
      state.invidualTotalCount = totalCount;
    },

    individualReportIORecordsFetched: (state, action) => {
      const { totalCount, entities } = action.payload;
      
      state.ioRecords = entities;
      state.ioTotalCount = totalCount;
    },

    
    
    // createIndividualReport
    individualReportCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.individualReport);
    },
    // updateIndividualReport
    individualReportUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.individualReport.id) {
          return action.payload.individualReport;
        }
        return entity;
      });
    },
    // deleteIndividualReport
    individualReportDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteIndividualReports
    individualReportsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // individualReportsUpdateState
    individualReportsStatusUpdated: (state, action) => {
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
