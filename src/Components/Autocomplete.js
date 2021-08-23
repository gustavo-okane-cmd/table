import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOptions,
  selectLoadingAutocomplete,
  selectOptions,
  fetchAutocomplete,
} from "../store/reducers/autocompleteSlice";

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
} from "../store/reducers/tabelaSlice";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const ListTitle = styled.h2`
  margin: 0;
  font-size: 0.9em;
  font-weight: 600;
`;

const ListDescription = styled.h3`
  padding-top: 0;
  margin: 0;
  font-weight: 400;
  font-size: 0.75em;
`;

const StyledAutocomplete = styled(Autocomplete)`
  width: 300px;
`;

const AutocompleteField = (props) => {
  const id = props.id;
  const dispatch = useDispatch();
  const loadingAutocomplete = useSelector(selectLoadingAutocomplete);
  const [open, setOpen] = useState(false);
  const options = useSelector(selectOptions);
  let typingTimeout = 0,
    selectTimeout = 0;

  const ativos = useSelector(selectAtivos);
  let [instantValue, setInstantValue] = useState(ativos[id]);
  const initialValue = { ticker: ativos[id], label: ativos[id] };
  let [value, setValue] = useState(initialValue);

  // console.log(ativos);
  // console.log(id);
  // console.log(ativos[id]);
  // console.log(instantValue);
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //     dispatch(addCase(id));
  // }, [id]);

  React.useEffect(() => {
    if (!open) {
      // dispatch(setOptions({id, value: []}));
      console.log(options);
      dispatch(setOptions([]));
    }
  }, [open]);

  return (
    <StyledAutocomplete
      id={`asynchronous-demo${id}`}
      open={open}
      value={value}
      onChange={(_, newValue) => {
        // console.log("value", newValue);
        selectTimeout = setTimeout(() => {
          console.log("Selected an autocomplete option.");
        }, 100);

        setValue(newValue);
      }}
      inputValue={instantValue}
      onInputChange={(event, newInputValue) => {
        console.log("value", newInputValue);
        setInstantValue(newInputValue);

        console.log(typingTimeout);
        if (typingTimeout) {
          clearTimeout(typingTimeout);
          console.log("cleared timeout");
        }
        typingTimeout = setTimeout(() => {
          if (!selectTimeout) dispatch(fetchAutocomplete(newInputValue));
        }, 300);
        console.log(typingTimeout);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.ticker}
      renderOption={(option, state) => (
        <div>
          <ListTitle>{option.title}</ListTitle>
          <ListDescription>{option.description}</ListDescription>
        </div>
      )}
      // autoSelect
      freeSolo="true"
      filterOptions={(x) => x}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={(e) =>
        dispatch(
          setAtivoValue({
            value: e.target.value,
            ativoId: id,
          })
        )
      }
      options={options}
      loading={loadingAutocomplete[id]}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loadingAutocomplete[id] ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
export default AutocompleteField;
