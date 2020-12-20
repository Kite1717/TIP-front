import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  FtiLibStatusCssClasses,
  FtiLibStatusTitles,
} from "../FtiLibsUIHelpers";
import { useFtiLibsUIContext } from "../FtiLibsUIContext";

const selectedFtiLibs = (entities, ids) => {
  const _ftiLibs = [];
  ids.forEach((id) => {
    const ftiLib = entities.find((el) => el.id === id);
    if (ftiLib) {
      _ftiLibs.push(ftiLib);
    }
  });
  return _ftiLibs;
};

export function FtiLibsFetchDialog({ show, onHide }) {
  // FtiLibs UI Context
  const ftiLibsUIContext = useFtiLibsUIContext();
  const ftiLibsUIProps = useMemo(() => {
    return {
      ids: ftiLibsUIContext.ids,
    };
  }, [ftiLibsUIContext]);

  // FtiLibs Redux state
  const { ftiLibs } = useSelector(
    (state) => ({
      ftiLibs: selectedFtiLibs(
        state.ftiLibs.entities,
        ftiLibsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if ftiLibs weren't selected we should close modal
  useEffect(() => {
    if (!ftiLibsUIProps.ids || ftiLibsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ftiLibsUIProps.ids]);

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
              <th>FTILIB</th>
            </tr>
          </thead>
          <tbody>
            {ftiLibs.map((ftiLib) => (
              <tr key={`id${ftiLib.id}`}>
                <td>{ftiLib.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      FtiLibStatusCssClasses[ftiLib.status]
                      } label-inline`}
                  >
                    {" "}
                    {FtiLibStatusTitles[ftiLib.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {ftiLib.lastName}, {ftiLib.firstName}
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
