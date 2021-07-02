import React, { useState, Fragment } from "react";
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
  DelButtonRow,
  PlusButton,
  PlusCell,
  SingleColumnCell,
  DataCell,
} from "./TableDataStyles";

const initialData = [
  ["", "PETR4", "VALE3", "ITUB4"],
  ["04/02/1998", "100", "50", "50"],
  ["04/02/2010", "0", "50", "25"],
  ["04/02/2021", "0", "0", "25"],
];

const TabelaDados = () => {
  const [data, setData] = useState(initialData);

  const changeHandler = (value, index, index2) => {
    let newData = [...data];
    newData[index][index2] = value;
    setData(newData);
    console.log(data);
  };

  const addDelColumnhandler = (index, add_del) => {
    let newData = [...data];
    if(add_del=='add') {
        newData.forEach((arr) => arr.splice(index, 0, ""));
    } else {
        newData.forEach(
          (arr, ind) => (newData[ind] = arr.filter((e, i) => i != index))
        );
    }
    setData(newData);
    console.log(data);
  };

  const addDelRowhandler = (index, add_del) => {
    let newData = [...data];
    if(add_del=='add') {
        newData.splice(index, 0, Array(data[0].length).fill(""));
    } else {
        newData = newData.filter((e, i) => i != index);
    }
    setData(newData);
  };

  const CriaButtonAddColumn = ({ index }) => (
    <PlusCell align="right" colSpan={1}>
      {index == 0 ? undefined : (
        <PlusButton onClick={() => addDelColumnhandler(index, 'add')} style={{}}>
          +
        </PlusButton>
      )}
    </PlusCell>
  );

  const CriaButtonAddDelRow = ({ index }) => (
    <PlusCell align="right" colSpan={1}>
      {/* linha 0 de ativos, não criar botão de adicionar coluna nem deletar */}
      {index == 0 ? undefined : (
        <DelButtonRow onClick={() => addDelRowhandler(index, 'del')}>
          <DeleteForeverIcon></DeleteForeverIcon>
        </DelButtonRow>
      )}
      <PlusButton onClick={() => addDelRowhandler(index + 1, 'add')}>
        <ExpandMoreIcon></ExpandMoreIcon>
      </PlusButton>
    </PlusCell>
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {data[0].map((row, index) => (
              <Fragment key={`${index}header`}>
                <CriaButtonAddColumn index={index}></CriaButtonAddColumn>
                <TableCell align="left" colSpan={1}>
                  {/* coluna 0 de datas, não criar botão de adicionar coluna nem deletar */}
                  {index == 0 ? undefined : (
                    <DelButton onClick={() => addDelColumnhandler(index,'del')}>
                      <DeleteForeverIcon></DeleteForeverIcon>
                    </DelButton>
                  )}
                </TableCell>
              </Fragment>
            ))}
            <CriaButtonAddColumn
              index={data[0].length + 1}
            ></CriaButtonAddColumn>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <CriaButtonAddDelRow index={index}></CriaButtonAddDelRow>
              {row.map((item, index2) => (
                <Fragment key={`${index}-${index2}`}>
                  <DataCell
                    align="left"
                    colSpan={1}
                    key={`cell${index}-${index2}`}
                    style={{ margin: "2px" }}
                  >
                    <TextField
                      key={`input${index}-${index2}`}
                      value={item}
                      size="small"
                      style={{ width: "120px" }}
                      onChange={(e) =>
                        changeHandler(e.target.value, index, index2)
                      }
                    />
                  </DataCell>
                  <SingleColumnCell
                    align="center"
                    colSpan={1}
                  ></SingleColumnCell>
                </Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaDados;
