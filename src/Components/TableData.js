import React, { useState, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  Table,
  Divider,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Container,
  Button,
} from "@material-ui/core";

import styled from "styled-components";

const TableContainer = styled(Container)`
  padding: 0;
  margin: 0;
  width: 100%;
  overflow-x: auto;
`;

const PlusButton = styled(Button)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  visibility: hidden;
`;

const PlusCell = styled(TableCell)`
  width: 20px;
  min-width: 20px;
  padding: 0;
  &:hover {
    ${PlusButton} {
      visibility: visible;
    }
  }
`;

const SingleColumnCell = styled(TableCell)`
  width: 20px;
  min-width: 20px;
  padding: 0;
`;

const initialData = [
  ["1", "2", "3"],
  ["11", "22", "33"],
  ["111", "222", "333"],
];

const TabelaDados = () => {
  const [data, setData] = useState(initialData);

  const changeHandler = (value, index, index2) => {
    let newData = [...data];
    newData[index][index2] = value;
    setData(newData);
  };

  const addColumnhandler = (newindex) => {
    let newData = [...data];
    newData.forEach((arr) => arr.splice(newindex, 0, ""));
    setData(newData);
    console.log(data);
  };

  const addRowhandler = (newindex) => {
    let newData = [...data];
    newData.splice(newindex, 0, Array(data[0].length).fill(""));
    setData(newData);
    console.log(data);
  };

  const CriaButtonAddColumn = ({ index }) => (
    <PlusCell align="right" colSpan={1}>
      {index == 0 ? undefined : (
        <PlusButton onClick={() => addColumnhandler(index)} style={{}}>
          +
        </PlusButton>
      )}
    </PlusCell>
  );

  const CriaButtonAddRow = ({ index }) => (
    <PlusCell align="right" colSpan={1}>
      <PlusButton onClick={() => addRowhandler(index + 1)} style={{}}>
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
                <TableCell align="left" colSpan={3}></TableCell>
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
              {/* <SingleColumnCell align="left" colSpan={1}></SingleColumnCell> */}
              <CriaButtonAddRow index={index}></CriaButtonAddRow>
              {row.map((item, index2) => (
                <Fragment key={`${index}-${index2}`}>
                  <TableCell
                    align="left"
                    colSpan={3}
                    key={`cell${index}-${index2}`}
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
                  </TableCell>
                  <SingleColumnCell align="left" colSpan={1}></SingleColumnCell>
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
