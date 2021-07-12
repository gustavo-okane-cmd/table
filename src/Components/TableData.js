import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addDelColumn,
  addDelRow,
  setCellValue,
  selectDados,
  selectRowOrder,
  selectColumns,
  selectRows,
} from "../store/reducers/tabelaSlice";

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

import {
  TableContainer,
  DelButton,
  DelRowButton,
  PlusButton,
  PlusCell,
  SingleColumnCell,
  DataCell,
} from "./TableDataStyles";

const TabelaDados = () => {
  const data = useSelector(selectDados);
  const rowOrder = useSelector(selectRowOrder);
  const columns = useSelector(selectColumns);
  const dispatch = useDispatch();

  const CriaRow = (props) => {
    const cells = data[props.att.rowId].array.map((item, index2) => (
      <Fragment key={`${props.att.index}-${index2}`}>
        <EditableCell att={{ rowId: props.att.rowId, index2, item }} />
        <SingleColumnCell align="center" colSpan={1}></SingleColumnCell>
      </Fragment>
    ));
    return (
      <TableRow key={props.att.index}>
        <CriaButtonAddDelRow index={props.att.index}></CriaButtonAddDelRow>
        {cells}
      </TableRow>
    );
  };

  const EditableCell = (props) => {
    let [instantValue, setInstantValue] = useState(props.att.item);
    return (
      <DataCell
        align="left"
        colSpan={1}
        key={`cell-${props.att.rowId}-${props.att.index2}`}
        style={{ margin: "2px" }}
      >
        <TextField
          key={`input${props.att.rowId}-${props.att.index2}`}
          value={instantValue}
          size="small"
          style={{ width: "120px" }}
          // onBlur={(e) =>
          //   onChange={(e) => changeHandler(e.target.value, index, index2)}
          onChange={(e) => setInstantValue(e.target.value)}
          onBlur={(e) =>
            dispatch(
              setCellValue({
                value: e.target.value,
                r: props.att.rowId,
                c: props.att.index2,
              })
            )
          }
        />
      </DataCell>
    );
  };

  const CriaButtonAddColumn = ({ index }) => (
    <PlusCell align="right" colSpan={1}>
      {index == 0 ? undefined : (
        <PlusButton
          //   onClick={() => addDelColumnhandler(index, "add")}
          onClick={() => dispatch(addDelColumn({ index, add_del: "add" }))}
          style={{}}
        >
          +
        </PlusButton>
      )}
    </PlusCell>
  );

  const CriaButtonAddDelRow = ({ index }) => (
    <PlusCell align="right" colSpan={1}>
      {/* linha 0 de ativos, nÃ£o criar botÃ£o de adicionar coluna nem deletar */}
      {index == 0 ? undefined : (
        <DelRowButton
          onClick={() => dispatch(addDelRow({ index, add_del: "del" }))}
        >
          <DeleteForeverIcon></DeleteForeverIcon>
        </DelRowButton>
      )}
      {/* <PlusButton onClick={() => addDelRowhandler(index + 1, 'add')}> */}
      <PlusButton
        onClick={() =>
          dispatch(addDelRow({ index: index + 1, add_del: "add" }))
        }
      >
        <ExpandMoreIcon></ExpandMoreIcon>
      </PlusButton>
    </PlusCell>
  );

  //   const headRow = data[0].map((row, index) => (
  //     <Fragment key={`${index}header`}>
  //       <CriaButtonAddColumn index={index}></CriaButtonAddColumn>
  //       <TableCell align="left" colSpan={1}>
  //         {/* coluna 0 de datas, nÃ£o criar botÃ£o de adicionar coluna nem deletar */}
  //         {index == 0 ? undefined : (
  //           <DelButton
  //             onClick={() => dispatch(addDelColumn({ index, add_del: "del" }))}
  //           >
  //             <DeleteForeverIcon></DeleteForeverIcon>
  //           </DelButton>
  //         )}
  //       </TableCell>
  //     </Fragment>
  //   ));
  const headRow = [];
  for (let i = 0; i < columns; i++) {
    headRow.push(
      <Fragment key={`${i}header`}>
        <CriaButtonAddColumn index={i}></CriaButtonAddColumn>
        <TableCell align="left" colSpan={1}>
          {/* coluna 0 de datas, nÃ£o criar botÃ£o de adicionar coluna nem deletar */}
          {i == 0 ? undefined : (
            <DelButton
              onClick={() => dispatch(addDelColumn({ i, add_del: "del" }))}
            >
              <DeleteForeverIcon></DeleteForeverIcon>
            </DelButton>
          )}
        </TableCell>
      </Fragment>
    );
  }

  const tableData = rowOrder.map((rowId, index) => (
    <CriaRow att={{ rowId, index }} key={`tablerow${index}`} />
  ));

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headRow}
            <CriaButtonAddColumn index={columns}></CriaButtonAddColumn>
          </TableRow>
        </TableHead>

        <TableBody>{tableData}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(TabelaDados);
