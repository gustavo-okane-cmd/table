import React, { useState, Fragment } from "react";
import TextField from "@material-ui/core/TextField";

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

const PlusButton = styled(Button)`
  padding: 0;
  margin: 0;
  min-width: 12px;
  width: 12px;
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

  const clickHandler = (newindex) => {
    let newData = [...data];
    newData.forEach((arr) => arr.splice(newindex, 0, ""));
    setData(newData);
    console.log(data);
  };

  const CriaButtonAddColumn = ({ index }) => (
    <TableCell align="left" colSpan={1}>
      <Button
        onClick={() => {
          console.log(index);
          clickHandler(index);
        }}
      >
        +
      </Button>
    </TableCell>
  );

  return (
    <Container>
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
              <TableCell
                align="left"
                key={`lastheader`}
                colSpan={1}
              ></TableCell>
              {row.map((item, index2) => (
                <Fragment>
                  <TableCell
                    align="left"
                    colSpan={3}
                    key={`${index}-${index2}`}
                  >
                    <TextField
                      value={item}
                      onChange={(e) =>
                        changeHandler(e.target.value, index, index2)
                      }
                    />
                  </TableCell>
                  <TableCell align="left" colSpan={1}></TableCell>
                </Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default TabelaDados;
