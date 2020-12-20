import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import {customersSlice} from "../app/modules/ECommerce/_redux/customers/customersSlice";
import {productsSlice} from "../app/modules/ECommerce/_redux/products/productsSlice";
import {remarksSlice} from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import {specificationsSlice} from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { usersSlice } from "../app/pages/TIP/_redux/users/usersSlice";
import { systemInformationsSlice } from "../app/pages/TIP/_redux/systemInformations/systemInformationsSlice";
import { tipLibrariesSlice } from "../app/pages/TIP/_redux/tipLibraries/tipLibrariesSlice";
import { ftiLibsSlice } from "../app/pages/TIP/_redux/ftiLibs/ftiLibsSlice";
import { tipPerformancesSlice } from "../app/pages/TIP/_redux/tipPerformances/tipPerformancesSlice";
import { nonTipPerformancesSlice } from "../app/pages/TIP/_redux/NonTipPerformances/NonTipPerformancesSlice";
import { deviceReportsSlice } from "../app/pages/TIP/_redux/deviceReports/deviceReportsSlice";
import { individualReportsSlice } from "../app/pages/TIP/_redux/individualReports/individualReportsSlice";
export const rootReducer = combineReducers({
  auth: auth.reducer,
  systemInformations : systemInformationsSlice.reducer,
  tipPerformances : tipPerformancesSlice.reducer,
  nonTipPerformances : nonTipPerformancesSlice.reducer,
  tipLibraries : tipLibrariesSlice.reducer,
  users : usersSlice.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  ftiLibs : ftiLibsSlice.reducer,
  deviceReports: deviceReportsSlice.reducer,
  individualReports: individualReportsSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
