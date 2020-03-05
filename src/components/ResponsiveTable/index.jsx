import React from 'react';
import styled, { css } from 'styled-components';
import { isNil } from 'ramda';
import { MOBILE_BREAKPOINT, PRINT_NARROW_BREAKPOINT } from '../../constants';
import { Heading, Paragraph } from '../typography';
import { displayNames } from '../../state/domain/user/constants';
import { Loading, LoadingMessage } from '../Loading';

const Wrapper = styled.div`
  overflow: auto;
  margin: 3em 0 5em;
  padding-top: 2em;
  border-top: solid 1px rgba(0, 0, 0, 0.1);

  @media print {
    overflow: visible;
  }
`;

const TableBody = styled.tbody`
  @media screen and (max-width: ${MOBILE_BREAKPOINT}), print and (max-width: ${PRINT_NARROW_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}), print and (max-width: ${PRINT_NARROW_BREAKPOINT}) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  @media print {
    page-break-inside: avoid;
  }

  @media print and (max-width: ${PRINT_NARROW_BREAKPOINT}) {
    page-break-inside: auto;
  }
`;

const Caption = styled(Heading)`
  text-align: left;
`;

const Row = styled.tr`
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: ${MOBILE_BREAKPOINT}), print and (max-width: ${PRINT_NARROW_BREAKPOINT}) {
    padding: 0.7em 2vw;
    margin: 1em 0 0;
    border-radius: 1em;
    width: 100%;

    &:first-of-type {
      display: none;
    }

    &:nth-child(odd),
    &:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  @media print {
    border-top: 1pt solid #000;
  }

  @media print and (max-width: ${PRINT_NARROW_BREAKPOINT}) {
    page-break-inside: avoid;
  }
`;

const cellStyles = css`
  padding: 0.25em 0.5em 0.25em 1em;
  vertical-align: text-top;
  text-align: left;
  text-indent: -0.5em;
`;

const Cell = styled.td`
  ${cellStyles}
  
  &::before {
    display: none;
  }
  
  @media screen and (max-width: ${MOBILE_BREAKPOINT}), print and (max-width: ${PRINT_NARROW_BREAKPOINT}) {
    &::before {
      display: block;
      font-weight: bold;
      content: "${props => props.label}";
      flex: 0 0 40%;
      padding-right: 0.25em;
    }
    display: flex;
  }
`;

const HeaderCell = styled.th`
  ${cellStyles}

  vertical-align: bottom;
  background-color: #2f4f50;
  color: #fff;
  font-weight: bold;

  @media screen and (max-width: ${MOBILE_BREAKPOINT}), print and (max-width: ${PRINT_NARROW_BREAKPOINT}) {
    display: none;
  }

  @media print {
    color: #000;
    background-color: #fff;
    border-bottom: 1pt solid #000;
  }
`;

const getDisplayName = key => displayNames[key] || key;

const isNilOrEmpty = val => isNil(val) || val === '';

const TableRow = ({ fieldNames, rowData, index }) => (
  <Row role="row">
    {fieldNames.map(fieldName => (
      <Cell key={`td-data-${index}-${fieldName}`} role="cell" label={getDisplayName(fieldName)}>
        {isNilOrEmpty(rowData[fieldName]) ? '-' : rowData[fieldName]}
      </Cell>
    ))}
  </Row>
);

export const ResponsiveTable = ({
  id = 'responsive-table',
  caption = '',
  fieldNames = [],
  rowsData = [],
  error,
  loadingStatus,
}) => (
  <Wrapper role="region" aria-labelledby={`${id}-caption`}>
    <Loading loadingStatus={loadingStatus} error={error}>
      <Table id={id} role="table">
        <Caption as="caption" id={`${id}-caption`}>
          {caption}
        </Caption>
        <TableBody role="rowgroup">
          {rowsData.length > 0 && (
            <Row role="row">
              {fieldNames.map(fieldName => (
                <HeaderCell key={`th-${fieldName}`} role="columnheader">
                  {getDisplayName(fieldName)}
                </HeaderCell>
              ))}
            </Row>
          )}
          {rowsData.map((rowData, index) => (
            <TableRow key={`tr-data-${index}`} fieldNames={fieldNames} rowData={rowData} index={index} />
          ))}
        </TableBody>
      </Table>
      {rowsData.length === 0 && <LoadingMessage>No results</LoadingMessage>}
    </Loading>
  </Wrapper>
);
