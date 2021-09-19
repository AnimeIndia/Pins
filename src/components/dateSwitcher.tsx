import { LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import React, { useState } from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { pixivDateState, pixivOffsetState } from "../shared/globalState";
import { useSetRecoilState } from "recoil";


export const DateSwitcher = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  var maxDatePickable: Date = new Date();
  maxDatePickable.setDate(maxDatePickable.getDate() - 2);
  const setPixivDate = useSetRecoilState(pixivDateState);
  const setOffset = useSetRecoilState(pixivOffsetState);
  // const maxDateToShow = Date.;
  return (
    <div className="flex justify-center pt-5 items-center w-full">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          disableFuture={true}
          showTodayButton={true}
          label="Date"
          // openTo="year"
          views={['year', 'month', 'day']}
          maxDate={maxDatePickable}
          value={(value?value:maxDatePickable)>maxDatePickable?maxDatePickable:value}
          onChange={(newValue) => {
            setValue(newValue);
            setPixivDate(newValue);
            setOffset(0);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  )

};