import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  TIPLibraryStatusCssClasses,
  TIPLibraryStatusTitles,
} from "../TIPLibrariesUIHelpers";
import { useTIPLibrariesUIContext } from "../TIPLibrariesUIContext";

const selectedTIPLibraries = (entities, ids) => {
  const _tipLibraries = [];
  ids.forEach((id) => {
    const tipLibrary = entities.find((el) => el.id === id);
    if (tipLibrary) {
      _tipLibraries.push(tipLibrary);
    }
  });
  return _tipLibraries;
};

export function TIPLibrariesFetchDialog({ show, onHide }) {
  // TIPLibraries UI Context
  const tipLibrariesUIContext = useTIPLibrariesUIContext();
  const tipLibrariesUIProps = useMemo(() => {
    return {
      ids: tipLibrariesUIContext.ids,
    };
  }, [tipLibrariesUIContext]);

  // TIPLibraries Redux state
  const { tipLibraries } = useSelector(
    (state) => ({
      tipLibraries: selectedTIPLibraries(
        state.tipLibraries.entities,
        tipLibrariesUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if tipLibraries weren't selected we should close modal
  useEffect(() => {
    if (!tipLibrariesUIProps.ids || tipLibrariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipLibrariesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>TIPLIBRARY</th>
            </tr>
          </thead>
          <tbody>
            {tipLibraries.map((tipLibrary) => (
              <tr key={`id${tipLibrary.id}`}>
                <td>{tipLibrary.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      TIPLibraryStatusCssClasses[tipLibrary.status]
                      } label-inline`}
                  >
                    {" "}
                    {TIPLibraryStatusTitles[tipLibrary.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {tipLibrary.lastName}, {tipLibrary.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
