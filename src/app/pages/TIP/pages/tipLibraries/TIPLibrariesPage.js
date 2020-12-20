import React from "react";
import { Route } from "react-router-dom";
import { TIPLibrariesLoadingDialog } from "./tipLibraries-loading-dialog/TIPLibrariesLoadingDialog";
import { TIPLibraryEditDialog } from "./tipLibrary-edit-dialog/TIPLibraryEditDialog";
import { TIPLibraryDeleteDialog } from "./tipLibrary-delete-dialog/TIPLibraryDeleteDialog";
import { TIPLibrariesDeleteDialog } from "./tipLibraries-delete-dialog/TIPLibrariesDeleteDialog";
import { TIPLibrariesFetchDialog } from "./tipLibraries-fetch-dialog/TIPLibrariesFetchDialog";
import { TIPLibrariesUpdateStateDialog } from "./tipLibraries-update-status-dialog/TIPLibrariesUpdateStateDialog";
import { TIPLibrariesUIProvider } from "./TIPLibrariesUIContext";
import { TIPLibrariesCard } from "./TIPLibrariesCard";

export function TIPLibrariesPage({ history }) {
  const tipLibrariesUIEvents = {
    newTIPLibraryButtonClick: () => {
      history.push("/tip-libraries/cti/new");
    },
    openEditTIPLibraryDialog: (id) => {
      history.push(`/tip-libraries/cti/${id}/edit`);
    },
    openDeleteTIPLibraryDialog: (id) => {
      history.push(`/tip-libraries/cti/${id}/delete`);
    },
    openDeleteTIPLibrariesDialog: () => {
      history.push(`/tip-libraries/cti/deleteTIPLibraries`);
    },
    openFetchTIPLibrariesDialog: () => {
      history.push(`/tip-libraries/cti/fetch`);
    },
    openUpdateTIPLibrariesStatusDialog: () => {
      history.push("/tip-libraries/cti/updateStatus");
    }
  }

  return (
    <TIPLibrariesUIProvider tipLibrariesUIEvents={tipLibrariesUIEvents}>
      <TIPLibrariesLoadingDialog />
      <Route path="/tip-libraries/cti/new">
        {({ history, match }) => (
          <TIPLibraryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/tip-libraries/cti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/cti/:id/edit">
        {({ history, match }) => (
          <TIPLibraryEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tip-libraries/cti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/cti/deleteTIPLibraries">
        {({ history, match }) => (
          <TIPLibrariesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/tip-libraries/cti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/cti/:id/delete">
        {({ history, match }) => (
          <TIPLibraryDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tip-libraries/cti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/cti/fetch">
        {({ history, match }) => (
          <TIPLibrariesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/tip-libraries/cti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/cti/updateStatus">
        {({ history, match }) => (
          <TIPLibrariesUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/tip-libraries/cti");
            }}
          />
        )}
      </Route>
      <TIPLibrariesCard />
    </TIPLibrariesUIProvider>
  );
}
