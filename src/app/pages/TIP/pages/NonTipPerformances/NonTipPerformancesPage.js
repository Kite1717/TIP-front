import React from "react";
import { Route } from "react-router-dom";
import { NonTipPerformancesLoadingDialog } from "./nonTipPerformances-loading-dialog/NonTipPerformancesLoadingDialog";
import { NonTipPerformanceEditDialog } from "./nonTipPerformance-edit-dialog/NonTipPerformanceEditDialog";
import { NonTipPerformanceDeleteDialog } from "./nonTipPerformance-delete-dialog/NonTipPerformanceDeleteDialog";
import { NonTipPerformancesDeleteDialog } from "./nonTipPerformances-delete-dialog/NonTipPerformancesDeleteDialog";
import { NonTipPerformancesFetchDialog } from "./nonTipPerformances-fetch-dialog/NonTipPerformancesFetchDialog";
import { NonTipPerformancesUpdateStateDialog } from "./nonTipPerformances-update-status-dialog/NonTipPerformancesUpdateStateDialog";
import { NonTipPerformancesUIProvider } from "./NonTipPerformancesUIContext";
import { NonTipPerformancesCard } from "./NonTipPerformancesCard";

export function NonTipPerformancesPage({ history }) {
  const nonTipPerformancesUIEvents = {
    newNonTipPerformanceButtonClick: () => {
      history.push("/tipPerformances/non-tip/new");
    },
    openEditNonTipPerformanceDialog: (id) => {
      history.push(`/tipPerformances/non-tip/${id}/edit`);
    },
    openDeleteNonTipPerformanceDialog: (id) => {
      history.push(`/tipPerformances/non-tip/${id}/delete`);
    },
    openDeleteNonTipPerformancesDialog: () => {
      history.push(`/tipPerformances/non-tip/deleteNonTipPerformances`);
    },
    openFetchNonTipPerformancesDialog: () => {
      history.push(`/tipPerformances/non-tip/fetch`);
    },
    openUpdateNonTipPerformancesStatusDialog: () => {
      history.push("/tipPerformances/non-tip/updateStatus");
    }
  }

  return (
    <NonTipPerformancesUIProvider nonTipPerformancesUIEvents={nonTipPerformancesUIEvents}>
      <NonTipPerformancesLoadingDialog />
      <Route path="/tipPerformances/non-tip/new">
        {({ history, match }) => (
          <NonTipPerformanceEditDialog
            show={match != null}
            onHide={() => {
              history.push("/tipPerformances/non-tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/non-tip/:id/edit">
        {({ history, match }) => (
          <NonTipPerformanceEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tipPerformances/non-tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/non-tip/deleteNonTipPerformances">
        {({ history, match }) => (
          <NonTipPerformancesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/tipPerformances/non-tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/non-tip/:id/delete">
        {({ history, match }) => (
          <NonTipPerformanceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tipPerformances/non-tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/non-tip/fetch">
        {({ history, match }) => (
          <NonTipPerformancesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/tipPerformances/non-tip");
            }}
          />
        )}
      </Route>
      <Route path="/tipPerformances/non-tip/updateStatus">
        {({ history, match }) => (
          <NonTipPerformancesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/tipPerformances/non-tip");
            }}
          />
        )}
      </Route>
      <NonTipPerformancesCard />
    </NonTipPerformancesUIProvider>
  );
}
