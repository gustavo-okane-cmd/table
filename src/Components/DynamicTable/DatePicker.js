import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { setDateValue, selectDates } from "../../store/reducers/tabelaSlice";

const DatePicker = (props) => {
  const id = props.id;
  const dates = useSelector(selectDates);
  const dispatch = useDispatch();
  let [instantDate, setInstantDate] = useState(
    new Date(dates[id])
  );

  return (
    <KeyboardDatePicker
      style={{ width: "150px" }}
      variant="inline"
      format="dd/MM/yyyy"
      value={instantDate}
      id={`inputdate${id}`}
      onChange={(date) => setInstantDate(date)}
      onClose={() => {
        dispatch(
          setDateValue({
            value: format(instantDate, "dd/MM/yyyy"),
            dateId: id,
          })
        );
      }}
      onBlur={() => {
        dispatch(
          setDateValue({
            value: instantDate,
            dateId: id,
          })
        );
      }}
    />
  );
};

export default DatePicker;
