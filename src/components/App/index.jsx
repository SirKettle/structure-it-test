import React, { useEffect, Fragment } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createGlobalStyle } from 'styled-components';
import { Headline, SmallPrint } from '../typography';
import { ResponsiveTable } from '../ResponsiveTable';
import { selectError, selectUsers, selectLoadingStatus } from '../../state/domain/user/selector';
import { fieldNames } from '../../state/domain/user/constants';
import { actions as userActions } from '../../state/domain/user/action';
import { MOBILE_BREAKPOINT, PRINT_NARROW_BREAKPOINT } from '../../constants';
import { AddUserForm } from '../AddUserForm';

const GlobalStyle = createGlobalStyle`
  html {
    background: #fafafa;
  }
  
  body {
    background: #fefefe;
    color: #2f4f50;
    line-height: 1.5;
    padding: 1em 1em 2em;
    
    max-width: 1024px;
    margin: 0 auto;
    
    @media screen and (min-width: ${MOBILE_BREAKPOINT}), print and (min-width: ${PRINT_NARROW_BREAKPOINT}) {
      padding: 2em 2em 3em;
    }
  }
`;

export const _App = ({ addUser, getUsers, loadingStatus, error, users }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <main>
        <Headline as="h1">Favourite Pets</Headline>
        <AddUserForm onAddUser={addUser} loadingStatus={loadingStatus} />
        <ResponsiveTable
          fieldNames={fieldNames}
          rowsData={users}
          caption="Records of users and their favourite pets"
          loadingStatus={loadingStatus}
          error={error}
        />
        <SmallPrint>Not so subliminal message - Please give Will Thirkettle the job!</SmallPrint>
      </main>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  loadingStatus: selectLoadingStatus,
  error: selectError,
});

const mapDispatchToProps = {
  getUsers: userActions.getUsers,
  addUser: userActions.addUser,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
