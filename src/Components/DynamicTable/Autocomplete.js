import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setOptions,
  selectLoadingAutocomplete,
  selectOptions,
  fetchAutocomplete,
} from "../../store/reducers/autocompleteSlice";

import { setAtivoValue, selectAtivos } from "../../store/reducers/tabelaSlice";

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
  width: 210px;
  padding: 0px;
`;

const AutocompleteField = (props) => {
  const id = props.id;
  const dispatch = useDispatch();
  const loadingAutocomplete = useSelector(selectLoadingAutocomplete);
  const [open, setOpen] = useState(false);
  const options = useSelector(selectOptions);
  const [typingTimeout, setTypingTimeout] = useState(0);

  const ativos = useSelector(selectAtivos);
  let [instantValue, setInstantValue] = useState(ativos[id]);
  const initialValue = { ticker: ativos[id], label: ativos[id] };
  let [value, setValue] = useState(initialValue);


  return (
    <StyledAutocomplete
      id={`asynchronous-demo${id}`}
      open={open}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      inputValue={instantValue}
      onInputChange={(event, newInputValue) => {
        setInstantValue(newInputValue);

        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        setTypingTimeout(
          setTimeout(() => {
            if (open) dispatch(fetchAutocomplete(newInputValue));
          }, 300)
        );
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
      freeSolo={true}
      filterOptions={(x) => x}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={(e) => {
        dispatch(setOptions([]));
        dispatch(
          setAtivoValue({
            value: e.target.value,
            ativoId: id,
          })
        );
      }}
      size="small"
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
