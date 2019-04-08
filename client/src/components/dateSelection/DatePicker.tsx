import React, { Component, RefObject } from 'react';
import moment, { Moment } from 'moment';
import DateSelection from './DateSelection';
import { Grid, IconButton } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';
import { InlineDatePicker } from "material-ui-pickers";
import { API_DATE_FORMAT } from '../../common/nhl/helpers';

interface Props
{
  currentDate: string;
  activeDate: string | undefined;
  numDatesBefore: number;
  numDatesAfter: number;
  onDateSelect(date: string): void;
}

class DatePicker extends Component<Props>
{
  pickerRef: RefObject<JSX.Element>;

  constructor(props: Props)
  {
    super(props);

    this.pickerRef = React.createRef();
    
    this.openPicker = this.openPicker.bind(this);
  }

  isActive(date: string): boolean
  {
    const { activeDate } = this.props;

    if (activeDate)
    {
      return moment(date).isSame(activeDate, 'day');
    }
    return false;
  };

  getDatesBefore(): JSX.Element[]
  {
    const { currentDate, numDatesBefore, numDatesAfter, onDateSelect } = this.props;

    let datesBefore = [];
    for (let i = numDatesBefore; i > 0; i--)
    {
      const date = moment(currentDate).subtract(i, 'days').format(API_DATE_FORMAT);
      datesBefore.push(
        <DateSelection key={i} onClick={onDateSelect} 
          date={date} badge={this.isActive(date)} />
      );
    }

    return datesBefore;
  }

  getDatesAfter(): JSX.Element[]
  {
    const { currentDate, numDatesBefore, numDatesAfter, onDateSelect } = this.props;

    let datesAfter = [];
    for (let i = 1; i <= numDatesAfter; i++)
    {
      const date = moment(currentDate).add(i, 'days').format(API_DATE_FORMAT);
      datesAfter.push(
        <DateSelection key={i} onClick={onDateSelect}
          date={date} badge={this.isActive(date)} />
      );
    }

    return datesAfter;
  }

  openPicker(e: any)
  {
    if (this.pickerRef.current != null)
    {
      let current = this.pickerRef.current as any;
      current.open(e);
    }
  }

  render()
  {
    const { currentDate, onDateSelect } = this.props;

    return (
      [
        <Grid key={0} item>
          <IconButton onClick={this.openPicker} data-cy="calendar-date-picker">
            <CalendarToday />
          </IconButton>
          <InlineDatePicker value={currentDate} onChange={onDateSelect} 
            ref={this.pickerRef} style={{display: 'none'}} />
        </Grid>
      ,
        <Grid key={1} xs={12} md item>
          <div data-cy="date-selection">
            { this.getDatesBefore() }
            <DateSelection date={currentDate} active={true} 
              onClick={onDateSelect} badge={this.isActive(currentDate)} />
            { this.getDatesAfter() }
          </div>
        </Grid>
      ]
    );
  }
};

export default DatePicker;