import React from 'react';
import styled from 'styled-components';
import { LOADING_STATUS } from '../../state/loadingStatus';
import { Paragraph } from '../typography';

export const LoadingMessage = styled(Paragraph)`
  text-align: center;
  padding: 6em 0;
`;

const ErrorMessage = styled(LoadingMessage)`
  color: #aa0000;
`;

export const Loading = ({ loadingStatus, error, children }) => {
  if (loadingStatus === LOADING_STATUS.SUCCESS) {
    return children;
  }

  if (loadingStatus === LOADING_STATUS.ERROR) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return <LoadingMessage>Loading...</LoadingMessage>;
};
