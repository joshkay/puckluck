import React from 'react';
import moment from 'moment';
import { Button, Badge } from '@material-ui/core';
import PropTypes from 'prop-types';
import { GlobalsString } from 'csstype';

const DATE_FORMAT = 'MMMM D';

interface Props
{
  date: string;
  onClick(date: string): void;
  active?: boolean;
  badge: boolean;
}

let DateSelection = ({ date, onClick, active, badge }: Props) =>
{
  const displayedDate = moment(date).format(DATE_FORMAT);

  let content: any = displayedDate;
  if (badge)
  {
    content = (
      <Badge color="secondary" variant="dot">
        {displayedDate}
      </Badge>
    );
  }

  return (
    <Button color={ active ? 'secondary' : undefined } onClick={() => onClick(date)}>
      {content}
    </Button>
  );
};

export default DateSelection;