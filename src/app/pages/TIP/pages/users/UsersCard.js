import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { UsersFilter } from "./users-filter/UsersFilter";
import { UsersTable } from "./users-table/UsersTable";
import { UsersGrouping } from "./users-grouping/UsersGrouping";
import { useUsersUIContext } from "./UsersUIContext";
import { useIntl } from "react-intl";
import { shallowEqual,  useSelector } from "react-redux";

export function UsersCard() {
  const usersUIContext = useUsersUIContext();
  const usersUIProps = useMemo(() => {
    return {
      ids: usersUIContext.ids,
      newUserButtonClick: usersUIContext.newUserButtonClick,
    };
  }, [usersUIContext]);

  const {currentUser } = useSelector(
    (state) => ({ 
                  currentUser: state.auth.user.user}),
    shallowEqual
  );

 

  const intl = useIntl();
  return (
    <Card>
      <CardHeader  title={intl.formatMessage({ id: "MENU.USERS" })}>
        {
         currentUser !== null &&  currentUser !== undefined && (  currentUser.role === 0 || currentUser.role === 2) &&
          <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={usersUIProps.newUserButtonClick}
          >
            
            {intl.formatMessage({ id: "MENU.USERS.NEW_USER" })}
          </button>
        </CardHeaderToolbar>
        }
        
      </CardHeader>
      <CardBody>
        <UsersFilter />
        {usersUIProps.ids.length > 0 && <UsersGrouping />}
        <UsersTable />
      </CardBody>
    </Card>
  );
}
