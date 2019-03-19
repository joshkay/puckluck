import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DateSelection from './DateSelection';
import { Grid, IconButton } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import { InlineDatePicker } from "material-ui-pickers";

let DatePicker = ({ classes, currentDate, activeDate, numDatesBefore, numDatesAfter, onDateSelect }) =>
{
  const pickerRef = useRef(null);

  const openPicker = useCallback((e) =>
  {
    if (pickerRef.current)
    {
      pickerRef.current.open(e);
    }
  }, [pickerRef.current]);

  const isActive = (date, activeDate) =>
  {
    if (activeDate)
    {
      return date.isSame(activeDate, 'day');
    }
  };

  let datesBefore = [];
  for (let i = numDatesBefore; i > 0; i--)
  {
    const date = moment(currentDate).subtract(i, 'days');
    datesBefore.push(
      <DateSelection key={i} onClick={onDateSelect} 
        date={date} badge={isActive(date, activeDate)} />
    );
  }

  let datesAfter = [];
  for (let i = 1; i <= numDatesAfter; i++)
  {
    const date = moment(currentDate).add(i, 'days');
    datesAfter.push(
      <DateSelection key={i} onClick={onDateSelect}
        date={date} badge={isActive(date, activeDate)} />
    );
  }

  const date = moment(currentDate);

  return (
    <Grid container alignItems="center">
      <IconButton onClick={openPicker} data-cy="calendar-date-picker">
        <CalendarToday />
      </IconButton>
      <InlineDatePicker value={currentDate} onChange={onDateSelect} 
        ref={pickerRef} style={{display: 'none'}} />

      <div data-cy="date-selection">
        { datesBefore }
        <DateSelection date={date} active={true} 
          onClick={onDateSelect} badge={isActive(date, activeDate)} />
        { datesAfter }
      </div>
    </Grid>
  );
};

DatePicker.propTypes = {
  //classes: PropTypes.object.isRequired,
  currentDate: PropTypes.string.isRequired,
  numDatesBefore: PropTypes.number,
  numDatesAfter: PropTypes.number
};

export default DatePicker;