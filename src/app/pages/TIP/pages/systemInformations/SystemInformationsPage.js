import React from "react";
import { Route } from "react-router-dom";
import { SystemInformationsLoadingDialog } from "./systemInformations-loading-dialog/SystemInformationsLoadingDialog";
import { SystemInformationEditDialog } from "./systemInformation-edit-dialog/SystemInformationEditDialog";
import { SystemInformationDeleteDialog } from "./systemInformation-delete-dialog/SystemInformationDeleteDialog";
import { SystemInformationsDeleteDialog } from "./systemInformations-delete-dialog/SystemInformationsDeleteDialog";
import { SystemInformationsFetchDialog } from "./systemInformations-fetch-dialog/SystemInformationsFetchDialog";
import { SystemInformationsUpdateStateDialog } from "./systemInformations-update-status-dialog/SystemInformationsUpdateStateDialog";
import { SystemInformationsUIProvider } from "./SystemInformationsUIContext";
import { SystemInformationsCard } from "./SystemInformationsCard";

export function SystemInformationsPage({ history }) {
  const systemInformationsUIEvents = {
    newSystemInformationButtonClick: () => {
      history.push("/system-informations/new");
    },
    openEditSystemInformationDialog: (id) => {
      history.push(`/system-informations/${id}/edit`);
    },
    openDeleteSystemInformationDialog: (id) => {
      history.push(`/system-informations/${id}/delete`);
    },
    openDeleteSystemInformationsDialog: () => {
      history.push(`/system-informations/deleteSystemInformations`);
    },
    openFetchSystemInformationsDialog: () => {
      history.push(`/system-informations/fetch`);
    },
    openUpdateSystemInformationsStatusDialog: () => {
      history.push("/system-informations/updateStatus");
    }
  }

  return (
    <SystemInformationsUIProvider systemInformationsUIEvents={systemInformationsUIEvents}>
      <SystemInformationsLoadingDialog />
      <Route path="/system-informations/new">
        {({ history, match }) => (
          <SystemInformationEditDialog
            show={match != null}
            onHide={() => {
              history.push("/system-informations");
            }}
          />
        )}
      </Route>
      <Route path="/system-informations/:id/edit">
        {({ history, match }) => (
          <SystemInformationEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/system-informations");
            }}
          />
        )}
      </Route>
      <Route path="/system-informations/deleteSystemInformations">
        {({ history, match }) => (
          <SystemInformationsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/system-informations");
            }}
          />
        )}
      </Route>
      <Route path="/system-informations/:id/delete">
        {({ history, match }) => (
          <SystemInformationDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/system-informations");
            }}
          />
        )}
      </Route>
      <Route path="/system-informations/fetch">
        {({ history, match }) => (
          <SystemInformationsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/system-informations");
            }}
          />
        )}
      </Route>
      <Route path="/system-informations/updateStatus">
        {({ history, match }) => (
          <SystemInformationsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/system-informations");
            }}
          />
        )}
      </Route>
      <SystemInformationsCard />
    </SystemInformationsUIProvider>
  );
}
