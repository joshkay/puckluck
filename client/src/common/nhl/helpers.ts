import moment from 'moment';

export const API_DATE_FORMAT = 'YYYY-MM-DD';

export const logoUrl = (id: number): string => 
(
  `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`
);

export const activeDate = moment().subtract(5, 'hours');
export const nhlAPIActiveDate = moment().subtract(11, 'hours');

export const hasGameStarted = (status: string) =>
(
  status !== 'Scheduled' && status !== 'Pre-Game'
);

export const isGameInProgress = (status: string) =>
(
  status.includes('In Progress')
);

export const isGameOver = (status: string) =>
(
  status === 'Final'
);

export const getGameStatus = (status: string, date: string, period: string, periodTimeLeft: string) =>
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

export const getGameScore = (status: string, score: number): number | undefined =>
{
  if (hasGameStarted(status))
  {
    return score;
  }
};