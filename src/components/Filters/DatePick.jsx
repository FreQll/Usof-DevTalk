import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { setDateFrom, setDateTo } from "../../store/postSlice";

const DatePick = ({ label }) => {
  const dispatch = useDispatch();

  const handleChange = (date) => {
    const dateFormatted = dayjs(date).format("YYYY-MM-DD");
    let isInvalid = false;
    if (dateFormatted === "Invalid Date") isInvalid = true;
    if (label === "From") {
      dispatch(setDateFrom(isInvalid ? "" : dateFormatted));
    } else {
      dispatch(setDateTo(isInvalid ? "" : dateFormatted));
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          format="DD/MM/YYYY"
          onChange={(newValue) => handleChange(newValue)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePick;
