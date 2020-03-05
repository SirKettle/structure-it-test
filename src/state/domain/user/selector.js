import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const domainSelector = state => state.user;

export const selectUsers = createSelector(
  domainSelector,
  prop('data'),
);

export const selectLoadingStatus = createSelector(
  domainSelector,
  prop('loading'),
);

export const selectError = createSelector(
  domainSelector,
  prop('error'),
);
