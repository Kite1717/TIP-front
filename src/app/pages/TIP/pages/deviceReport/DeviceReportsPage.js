import React from "react";
import { Route } from "react-router-dom";
import { DeviceReportsLoadingDialog } from "./deviceReports-loading-dialog/DeviceReportsLoadingDialog";
import { DeviceReportEditDialog } from "./deviceReport-edit-dialog/DeviceReportEditDialog";
import { DeviceReportDeleteDialog } from "./deviceReport-delete-dialog/DeviceReportDeleteDialog";
import { DeviceReportsDeleteDialog } from "./deviceReports-delete-dialog/DeviceReportsDeleteDialog";
import { DeviceReportsFetchDialog } from "./deviceReports-fetch-dialog/DeviceReportsFetchDialog";
import { DeviceReportsUpdateStateDialog } from "./deviceReports-update-status-dialog/DeviceReportsUpdateStateDialog";
import { DeviceReportsUIProvider } from "./DeviceReportsUIContext";
import { DeviceReportsCard } from "./DeviceReportsCard";
import { DeviceReportStatusDialog } from "./deviceReport-status-dialog/DeviceReportStatusDialog";

export function DeviceReportsPage({ history }) {
  const deviceReportsUIEvents = {
    newDeviceReportButtonClick: () => {
      history.push("/reports/device-reports/new");
    },
    openEditDeviceReportDialog: (id) => {
      history.push(`/reports/device-reports/${id}/edit`);
    },
    openDeleteDeviceReportDialog: (id) => {
      history.push(`/reports/device-reports/${id}/delete`);
    },
    openDeleteDeviceReportsDialog: () => {
      history.push(`/reports/device-reports/deleteDeviceReports`);
    },
    openFetchDeviceReportsDialog: () => {
      history.push(`/reports/device-reports/fetch`);
    },
    openUpdateDeviceReportsStatusDialog: () => {
      history.push("/reports/device-reports/updateStatus");
    },

    openStatusDeviceReportDialog: (id) => {
      history.push(`/reports/device-reports/${id}/status`);
    },
    
    

  }

  return (
    <DeviceReportsUIProvider deviceReportsUIEvents={deviceReportsUIEvents}>
      <DeviceReportsLoadingDialog />
      <Route path="/reports/device-reports/new">
        {({ history, match }) => (
          <DeviceReportEditDialog
            show={match != null}
            onHide={() => {
              history.push("/reports/device-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/device-reports/:id/edit">
        {({ history, match }) => (
          <DeviceReportEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/reports/device-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/device-reports/deleteDeviceReports">
        {({ history, match }) => (
          <DeviceReportsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/reports/device-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/device-reports/:id/status">
        {({ history, match }) => (
          <DeviceReportStatusDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/reports/device-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/device-reports/:id/delete">
        {({ history, match }) => (
          <DeviceReportDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/reports/device-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/device-reports/fetch">
        {({ history, match }) => (
          <DeviceReportsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/reports/device-reports");
            }}
          />
        )}
      </Route>

      
      <Route path="/reports/device-reports/updateStatus">
        {({ history, match }) => (
          <DeviceReportsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/reports/device-reports");
            }}
          />
        )}
      </Route>
      <DeviceReportsCard />
    </DeviceReportsUIProvider>
  );
}
