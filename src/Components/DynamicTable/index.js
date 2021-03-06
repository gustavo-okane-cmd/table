import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addDelColumn,
  addDelRow,
  setCellValue,
  setAtivoValue,
  setDateValue,
  selectDates,
  selectAtivos,
  selectDatesOrder,
  selectAtivosOrder,
  selectData,
} from "../../store/reducers/tabelaSlice";

import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { format } from "date-fns";
import { pt, en } from 'date-fns/locale'
// import en from 'date-fns/locales/en';
// import pt from 'date-fns/locales/pt';
// import pt from '@date-io/date-fns/locales/pt';
import DateFnsUtils from "@date-io/date-fns";
// import MomentUtils from "@date-io/moment";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import {
  TableContainer,
  DelButton,
  DelRowButton,
  PlusButton,
  PlusCell,
  SingleColumnCell,
  DataCell,
} from "./styles";

import AutocompleteField from "./Autocomplete";
import DatePicker from "./DatePicker";

const AutoCompleteCell = (props) => {
  return (
    <DataCell
      align="left"
      colSpan={1}
      key={`cellativo-${props.att.ativoId}`}
      style={{ margin: "2px" }}
    >
      <AutocompleteField key={props.att.ativoId} id={props.att.ativoId} />
    </DataCell>
  );
};

const DateCell = (props) => {
  return (
    <DataCell
      align="left"
      colSpan={1}
      key={`celldate-${props.att.dateId}`}
      style={{ margin: "2px" }}
    >
      {/* <KeyboardDatePicker
        style={{ width: "150px" }}
        variant="inline"
        format="dd/MM/yyyy"
        value={instantDate}
        id={`inputdate${props.att.dateId}`}
        onChange={(date) => setInstantDate(date)}
        onClose={() => {
          dispatch(
            setDateValue({
              value: format(instantDate, "dd/MM/yyyy"),
              dateId: props.att.dateId,
            })
          );
        }}
        onBlur={() => {
          dispatch(
            setDateValue({
              value: instantDate,
              dateId: props.att.dateId,
            })
          );
        }}
      /> */}
      <DatePicker key={props.att.dateId} id={props.att.dateId} />
    </DataCell>
  );
};

const EditableCell = (props) => {
  const data = useSelector(selectData);
  const dispatch = useDispatch();
  let [instantValue, setInstantValue] = useState(
    data[props.att.ativoId][props.att.dateId]
  );
  return (
    <DataCell
      align="left"
      colSpan={1}
      key={`cell-${props.att.ativoId}-${props.att.dateId}`}
      style={{ margin: "2px" }}
    >
      <TextField
        key={`input${props.att.ativoId}-${props.att.dateId}`}
        id={`${props.att.ativoId}-${props.att.dateId}`}
        value={instantValue}
        size="small"
        style={{ width: "150px" }}
        onChange={(e) => setInstantValue(e.target.value)}
        onBlur={(e) =>
          dispatch(
            setCellValue({
              value: e.target.value,
              ativoId: props.att.ativoId,
              dateId: props.att.dateId,
            })
          )
        }
      />
    </DataCell>
  );
};

const CriaButtonAddDelRow = ({ index }) => {
  const dispatch = useDispatch();
  return (
    <PlusCell align="right" colSpan={1}>
      <DelRowButton
        onClick={() => dispatch(addDelRow({ i: index, add_del: "del" }))}
      >
        <DeleteForeverIcon></DeleteForeverIcon>
      </DelRowButton>
      <PlusButton
        onClick={() => dispatch(addDelRow({ i: index + 1, add_del: "add" }))}
      >
        <ExpandMoreIcon></ExpandMoreIcon>
      </PlusButton>
    </PlusCell>
  );
};

const TabelaDados = () => {
  const datesOrder = useSelector(selectDatesOrder);
  const ativosOrder = useSelector(selectAtivosOrder);
  const dispatch = useDispatch();

  const headerRow = [];
  headerRow.push(
    <PlusCell key={`header-2`} align="right" colSpan={1}></PlusCell>
  );
  for (let i = -1; i < datesOrder.length; i++) {
    headerRow.push(
      <Fragment key={`${i}header`}>
        <TableCell align="left" colSpan={1}>
          {/* coluna 0 de datas, naum criar botaum de deletar */}
          {i == -1 ? undefined : (
            <DelButton
              onClick={() => dispatch(addDelColumn({ i: i, add_del: "del" }))}
            >
              <DeleteForeverIcon></DeleteForeverIcon>
            </DelButton>
          )}
        </TableCell>
        <PlusCell align="right" colSpan={1}>
          <PlusButton
            onClick={() => dispatch(addDelColumn({ i: i + 1, add_del: "add" }))}
          >
            +
          </PlusButton>
        </PlusCell>
      </Fragment>
    );
  }

  const firstRow = (
    <TableRow>
      <PlusCell align="right" colSpan={1}>
        <PlusButton
          onClick={() => dispatch(addDelRow({ i: 0, add_del: "add" }))}
        >
          <ExpandMoreIcon></ExpandMoreIcon>
        </PlusButton>
      </PlusCell>
      {/* <TextField disabled={true} /> */}
      <TableCell align="left" colSpan={1} />
      <SingleColumnCell align="center" colSpan={1}></SingleColumnCell>
      {datesOrder.map((dateId) => (
        <Fragment key={`frag${dateId}`}>
          <DateCell att={{ dateId }} />
          <SingleColumnCell align="center" colSpan={1}></SingleColumnCell>
        </Fragment>
      ))}
    </TableRow>
  );

  const tableData = ativosOrder.map((ativoId, index) => (
    <TableRow key={`tablerow${index}`}>
      <CriaButtonAddDelRow index={index}></CriaButtonAddDelRow>
      <AutoCompleteCell key={`ativo${ativoId}`} att={{ ativoId }} />
      <SingleColumnCell align="center" colSpan={1}></SingleColumnCell>
      {datesOrder.map((dateId) => (
        <Fragment key={`frag${dateId}-${ativoId}`}>
          <EditableCell att={{ ativoId, dateId }} />
          <SingleColumnCell align="center" colSpan={1}></SingleColumnCell>
        </Fragment>
      ))}
    </TableRow>
  ));

  return (
    <TableContainer>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pt}>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
        <Table>
          <TableHead>
            <TableRow>{headerRow}</TableRow>
          </TableHead>

          <TableBody>
            {firstRow}
            {tableData}
          </TableBody>
        </Table>
      </MuiPickersUtilsProvider>
    </TableContainer>
  );
};

export default TabelaDados;
