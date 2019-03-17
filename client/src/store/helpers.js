import { API_DATE_FORMAT, activeDate } from '../common/nhl/helpers';

export const getDateOfActiveGames = (state) =>
{
  const gamesByDate = state.gamesByDate[activeDate.format(API_DATE_FORMAT)];
  if (gamesByDate)
  {
    return gamesByDate.items.reduce((previousValue, currentValue) =>
    {
      if (!previousValue)
      {
        if (currentValue.status.includes('In Progress'))
        {
          return activeDate.format(API_DATE_FORMAT);
        }
      }
    });
  }
};

export const getDateTimeOfNextGameToday = (state) =>
{
  const gamesByDate = state.gamesByDate[activeDate.format(API_DATE_FORMAT)];
  if (gamesByDate)
  {
    return gamesByDate.items.reduce((previousValue, currentValue) =>
    {
      if (!previousValue)
      {
        if (currentValue.status.includes('Scheduled'))
        {
          return currentValue.date;
        }
      }
    });
  }
}