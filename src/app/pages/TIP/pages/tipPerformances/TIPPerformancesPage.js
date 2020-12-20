import React from "react";
import { Route } from "react-router-dom";
import { TIPPerformancesLoadingDialog } from "./tipPerformances-loading-dialog/TIPPerformancesLoadingDialog";
import { TIPPerformanceEditDialog } from "./tipPerformance-edit-dialog/TIPPerformanceEditDialog";
import { TIPPerformanceDeleteDialog } from "./tipPerformance-delete-dialog/TIPPerformanceDeleteDialog";
import { TIPPerformancesDeleteDialog } from "./tipPerformances-delete-dialog/TIPPerformancesDeleteDialog";
import { TIPPerformancesFetchDialog } from "./tipPerformances-fetch-dialog/TIPPerformancesFetchDialog";
import { TIPPerformancesUpdateStateDialog } from "./tipPerformances-update-status-dialog/TIPPerformancesUpdateStateDialog";
import { TIPPerformancesUIProvider } from "./TIPPerformancesUIContext";
import { TIPPerformancesCard } from "./TIPPerformancesCard";

export function TIPPerformancesPage({ history }) {
  const tipPerformancesUIEvents = {
    newTIPPerformanceButtonClick: () => {
      history.push("/tipPerformances/tip/new");
    },
    openEditTIPPerformanceDialog: (id) => {
      history.push(`/tipPerformances/tip/${id}/edit`);
    },
    openDeleteTIPPerformanceDialog: (id) => {
      history.push(`/tipPerformances/tip/${id}/delete`);
    },
    openDeleteTIPPerformancesDialog: () => {
      history.push(`/tipPerformances/tip/deleteTIPPerformances`);
    },
    openFetchTIPPerformancesDialog: () => {
      history.push(`/tipPerformances/tip/fetch`);
    },
    openUpdateTIPPerformancesStatusDialog: () => {
      history.push("/tipPerformances/tip/updateStatus");
    }
  }

  return (
    <TIPPerformancesUIProvider tipPerformancesUIEvents={tipPerformancesUIEvents}>
      <TIPPerformancesLoadingDialog />
      <Route path="/tipPerformances/tip/new">
        {({ history, match }) => (
          <TIPPerformanceEditDialog
            show={match != null}
            onHide={() => {
              history.push("/tipPerformances/tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/tip/:id/edit">
        {({ history, match }) => (
          <TIPPerformanceEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tipPerformances/tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/tip/deleteTIPPerformances">
        {({ history, match }) => (
          <TIPPerformancesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/tipPerformances/tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/tip/:id/delete">
        {({ history, match }) => (
          <TIPPerformanceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tipPerformances/tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/tip/fetch">
        {({ history, match }) => (
          <TIPPerformancesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/tipPerformances/tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/tip/updateStatus">
        {({ history, match }) => (
          <TIPPerformancesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/tipPerformances/tip");
            }}
          />
        )}
      </Route>
      <TIPPerformancesCard />
    </TIPPerformancesUIProvider>
  );
}
