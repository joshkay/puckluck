import moment from 'moment';

export const API_DATE_FORMAT = 'YYYY-MM-DD';

export const logoUrl = (id) => 
(
  `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`
);

export const activeDate = moment().subtract(5 , 'hours');

export const hasGameStarted = (status) =>
(
  status !== 'Scheduled' && status !== 'Pre-Game'
);

export const isGameInProgress = (status) =>
(
  status.includes('In Progress')
);

export const isGameOver = (status) =>
(
  status === 'Final'
);

export const getGameStatus = (status, date, period, periodTimeLeft) =>
{
  if (!hasGameStarted(status))
  {
    return moment(date).format('h:mm A');
  }
  else if (isGameInProgress(status))
  {
    return `${period} ${periodTimeLeft === 'END' ? 'Intermission' : periodTimeLeft}`;
  }
  else if (isGameOver(status))
  {
    if (period === 'OT' || period === 'SO')
    {
      return `${status} / ${period}`;
    }

    return status;
  }
};

export const getGameScore = (status, score) =>
{
  if (hasGameStarted(status))
  {
    return score;
  }
};