import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import {
  SystemInformationStatusCssClasses,
  SystemInformationStatusTitles,
} from "../SystemInformationsUIHelpers";
import { useSystemInformationsUIContext } from "../SystemInformationsUIContext";

const selectedSystemInformations = (entities, ids) => {
  const _systemInformations = [];
  ids.forEach((id) => {
    const systemInformation = entities.find((el) => el.id === id);
    if (systemInformation) {
      _systemInformations.push(systemInformation);
    }
  });
  return _systemInformations;
};

export function SystemInformationsFetchDialog({ show, onHide }) {
  // SystemInformations UI Context
  const systemInformationsUIContext = useSystemInformationsUIContext();
  const systemInformationsUIProps = useMemo(() => {
    return {
      ids: systemInformationsUIContext.ids,
    };
  }, [systemInformationsUIContext]);

  // SystemInformations Redux state
  const { systemInformations } = useSelector(
    (state) => ({
      systemInformations: selectedSystemInformations(
        state.systemInformations.entities,
        systemInformationsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if systemInformations weren't selected we should close modal
  useEffect(() => {
    if (!systemInformationsUIProps.ids || systemInformationsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemInformationsUIProps.ids]);

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
              <th>SYSTEMINFORMATION</th>
            </tr>
          </thead>
          <tbody>
            {systemInformations.map((systemInformation) => (
              <tr key={`id${systemInformation.id}`}>
                <td>{systemInformation.id}</td>
                <td>
                  <span
                    className={`label label-lg label-light-${
                      SystemInformationStatusCssClasses[systemInformation.status]
                      } label-inline`}
                  >
                    {" "}
                    {SystemInformationStatusTitles[systemInformation.status]}
                  </span>
                </td>
                <td>
                  <span className="ml-3">
                    {systemInformation.lastName}, {systemInformation.firstName}
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
