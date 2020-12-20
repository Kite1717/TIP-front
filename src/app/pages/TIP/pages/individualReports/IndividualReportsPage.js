import React from "react";
import { Route } from "react-router-dom";
import { IndividualReportsLoadingDialog } from "./individualReports-loading-dialog/IndividualReportsLoadingDialog";
import { IndividualReportEditDialog } from "./individualReport-edit-dialog/IndividualReportEditDialog";
import { IndividualReportDeleteDialog } from "./individualReport-delete-dialog/IndividualReportDeleteDialog";
import { IndividualReportsDeleteDialog } from "./individualReports-delete-dialog/IndividualReportsDeleteDialog";
import { IndividualReportsFetchDialog } from "./individualReports-fetch-dialog/IndividualReportsFetchDialog";
import { IndividualReportsUpdateStateDialog } from "./individualReports-update-status-dialog/IndividualReportsUpdateStateDialog";
import { IndividualReportsUIProvider } from "./IndividualReportsUIContext";
import { IndividualReportsCard } from "./IndividualReportsCard";
import { IndividualReportStatusDialog } from "./individualReport-status-dialog/IndividualReportStatusDialog";

export function IndividualReportsPage({ history }) {
  const individualReportsUIEvents = {
    newIndividualReportButtonClick: () => {
      history.push("/reports/individual-reports/new");
    },
    openEditIndividualReportDialog: (id) => {
      history.push(`/reports/individual-reports/${id}/edit`);
    },
    openDeleteIndividualReportDialog: (id) => {
      history.push(`/reports/individual-reports/${id}/delete`);
    },
    openDeleteIndividualReportsDialog: () => {
      history.push(`/reports/individual-reports/deleteIndividualReports`);
    },
    openFetchIndividualReportsDialog: () => {
      history.push(`/reports/individual-reports/fetch`);
    },
    openUpdateIndividualReportsStatusDialog: () => {
      history.push("/reports/individual-reports/updateStatus");
    },

    openStatusIndividualReportDialog: (id) => {
      history.push(`/reports/individual-reports/${id}/status`);
    },
    
    

  }

  return (
    <IndividualReportsUIProvider individualReportsUIEvents={individualReportsUIEvents}>
      <IndividualReportsLoadingDialog />
      <Route path="/reports/individual-reports/new">
        {({ history, match }) => (
          <IndividualReportEditDialog
            show={match != null}
            onHide={() => {
              history.push("/reports/individual-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/individual-reports/:id/edit">
        {({ history, match }) => (
          <IndividualReportEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/reports/individual-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/individual-reports/deleteIndividualReports">
        {({ history, match }) => (
          <IndividualReportsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/reports/individual-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/individual-reports/:id/status">
        {({ history, match }) => (
          <IndividualReportStatusDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/reports/individual-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/individual-reports/:id/delete">
        {({ history, match }) => (
          <IndividualReportDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/reports/individual-reports");
            }}
          />
        )}
      </Route>
      <Route path="/reports/individual-reports/fetch">
        {({ history, match }) => (
          <IndividualReportsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/reports/individual-reports");
            }}
          />
        )}
      </Route>

      
      <Route path="/reports/individual-reports/updateStatus">
        {({ history, match }) => (
          <IndividualReportsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/reports/individual-reports");
            }}
          />
        )}
      </Route>
      <IndividualReportsCard />
    </IndividualReportsUIProvider>
  );
}
