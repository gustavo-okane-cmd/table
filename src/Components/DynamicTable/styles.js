import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    Container,
    Button,
  } from "@material-ui/core";

import styled from "styled-components";

export const TableContainer = styled(Container)`
  padding: 0;
  margin: 10px 0 0 0;
  width: 100%;
  overflow-x: auto;
`;

export const DelButton = styled(Button)`
  width: 16px;
  height: 16px;
  min-width: 16px;
`;

export const DelRowButton = styled(DelButton)`
  margin: 25px 3px 3px 0;
`;

export const PlusButton = styled(Button)`
  width: 22px;
  height: 22px;
  min-width: 22px;
  visibility: hidden;
`;

export const PlusCell = styled(TableCell)`
  width: 22px;
  min-width: 22px;
  padding: 0;
  &:hover {
    ${PlusButton} {
      visibility: visible;
    }
  }
`;

export const SingleColumnCell = styled(TableCell)`
  width: 20px;
  min-width: 20px;
  padding: 0;
`;

export const DataCell = styled(TableCell)`
  padding: 12px;
`;