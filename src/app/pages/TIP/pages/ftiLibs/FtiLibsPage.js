import React from "react";
import { Route } from "react-router-dom";
import { FtiLibsLoadingDialog } from "./ftiLibs-loading-dialog/FtiLibsLoadingDialog";
import { FtiLibEditDialog } from "./ftiLib-edit-dialog/FtiLibEditDialog";
import { FtiLibDeleteDialog } from "./ftiLib-delete-dialog/FtiLibDeleteDialog";
import { FtiLibsDeleteDialog } from "./ftiLibs-delete-dialog/FtiLibsDeleteDialog";
import { FtiLibsFetchDialog } from "./ftiLibs-fetch-dialog/FtiLibsFetchDialog";
import { FtiLibsUpdateStateDialog } from "./ftiLibs-update-status-dialog/FtiLibsUpdateStateDialog";
import { FtiLibsUIProvider } from "./FtiLibsUIContext";
import { FtiLibsCard } from "./FtiLibsCard";

export function FtiLibsPage({ history }) {
  const ftiLibsUIEvents = {
    newFtiLibButtonClick: () => {
      history.push("/tip-libraries/fti/new");
    },
    openEditFtiLibDialog: (id) => {
      history.push(`/tip-libraries/fti/${id}/edit`);
    },
    openDeleteFtiLibDialog: (id) => {
      history.push(`/tip-libraries/fti/${id}/delete`);
    },
    openDeleteFtiLibsDialog: () => {
      history.push(`/tip-libraries/fti/deleteFtiLibs`);
    },
    openFetchFtiLibsDialog: () => {
      history.push(`/tip-libraries/fti/fetch`);
    },
    openUpdateFtiLibsStatusDialog: () => {
      history.push("/tip-libraries/fti/updateStatus");
    }
  }

  return (
    <FtiLibsUIProvider ftiLibsUIEvents={ftiLibsUIEvents}>
      <FtiLibsLoadingDialog />
      <Route path="/tip-libraries/fti/new">
        {({ history, match }) => (
          <FtiLibEditDialog
            show={match != null}
            onHide={() => {
              history.push("/tip-libraries/fti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/fti/:id/edit">
        {({ history, match }) => (
          <FtiLibEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tip-libraries/fti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/fti/deleteFtiLibs">
        {({ history, match }) => (
          <FtiLibsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/tip-libraries/fti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/fti/:id/delete">
        {({ history, match }) => (
          <FtiLibDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/tip-libraries/fti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/fti/fetch">
        {({ history, match }) => (
          <FtiLibsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/tip-libraries/fti");
            }}
          />
        )}
      </Route>
      <Route path="/tip-libraries/fti/updateStatus">
        {({ history, match }) => (
          <FtiLibsUpdateStateDialog
            show={match != null}
            onHide={() => {
              history.push("/tip-libraries/fti");
            }}
          />
        )}
      </Route>
      <FtiLibsCard />
    </FtiLibsUIProvider>
  );
}
