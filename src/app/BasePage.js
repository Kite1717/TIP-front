import React, { Suspense } from "react";
import { Redirect, Switch} from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
// import { BuilderPage } from "./pages/BuilderPage";
// import { MyPage } from "./pages/MyPage";
// import { DashboardPage } from "./pages/DashboardPage";
import { UsersPage } from "./pages/TIP/pages/users/UsersPage";
import { SystemInformationsPage } from "./pages/TIP/pages/systemInformations/SystemInformationsPage";
import JexcelMir from "./pages/TIP/dataOptions/JexcelMir";
import JexcelIr from "./pages/TIP/dataOptions/JexcelIr";
import JexcelGlhr from "./pages/TIP/dataOptions/JexcelGlhr";
import JexcelIO from "./pages/TIP/dataOptions/JexcelIO";
import JexcelTvr from "./pages/TIP/dataOptions/JexcelTvr";
import { TIPLibrariesPage } from "./pages/TIP/pages/tipLibraries/TIPLibrariesPage";
import { FtiLibsPage } from "./pages/TIP/pages/ftiLibs/FtiLibsPage";
import { TIPPerformancesPage } from "./pages/TIP/pages/tipPerformances/TIPPerformancesPage"
import { NonTipPerformancesPage } from "./pages/TIP/pages/NonTipPerformances/NonTipPerformancesPage";
import { DeviceReportsPage } from "./pages/TIP/pages/deviceReport/DeviceReportsPage";
import { IndividualReportsPage } from "./pages/TIP/pages/individualReports/IndividualReportsPage";


// const GoogleMaterialPage = lazy(() =>
//   import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
// );
// const ReactBootstrapPage = lazy(() =>
//   import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
// );
// const ECommercePage = lazy(() =>
//   import("./modules/ECommerce/pages/eCommercePage")
// );
// const UserProfilepage = lazy(() =>
//   import("./modules/UserProfile/UserProfilePage")
// );

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/users" />
        }
        {/* <ContentRoute path="/dashboard" component={DashboardPage} /> */}
        <ContentRoute path="/users" component={UsersPage} />
        <ContentRoute path="/system-informations" component={SystemInformationsPage} />
        <ContentRoute path="/data-entries/mir" component={JexcelMir} />
        <ContentRoute path="/data-entries/ir" component={JexcelIr} />
        <ContentRoute path="/data-entries/glhr" component={JexcelGlhr} />
        <ContentRoute path="/data-entries/io" component={JexcelIO} />
        <ContentRoute path="/data-entries/tvr" component={JexcelTvr} />
        <ContentRoute path="/tip-libraries/cti" component={TIPLibrariesPage} />
        <ContentRoute path="/tip-libraries/fti" component={FtiLibsPage} />
        <ContentRoute path="/tipPerformances/tip" component={TIPPerformancesPage} />
        <ContentRoute path="/tipPerformances/non-tip" component={NonTipPerformancesPage} />
        <ContentRoute path="/reports/device-reports" component={DeviceReportsPage} />
        <ContentRoute path="/reports/individual-reports" component={IndividualReportsPage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
