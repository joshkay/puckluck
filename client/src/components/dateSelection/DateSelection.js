import React from 'react';
import moment from 'moment';
import { Button, Badge } from '@material-ui/core';
import PropTypes from 'prop-types';

const DATE_FORMAT = 'MMMM D';

let DateSelection = ({ date, onClick, active, badge }) =>
{
  const displayedDate = moment(date).format(DATE_FORMAT);

  let content = displayedDate;
  if (badge)
  {
    content = (
      <Badge color="primary" variant="dot">
        {displayedDate}
      </Badge>
    );
  }

  return (
    <Button color={ active ? 'primary' : null } onClick={() => onClick(date)}>
      {content}
    </Button>
  );
};

DateSelection.propTypes = 
{
  date: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  badge: PropTypes.bool
};

export default DateSelection;