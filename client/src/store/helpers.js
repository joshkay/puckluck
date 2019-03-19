import { 
  API_DATE_FORMAT, 
  activeDate,
  hasGameStarted,
  isGameInProgress
} from '../common/nhl/helpers';

export const getDateOfActiveGames = (state) =>
{
  const gamesByDate = state.gamesByDate[activeDate.format(API_DATE_FORMAT)];
  if (gamesByDate)
  {
    const activeGame = gamesByDate.items.find((element) =>
    (
      isGameInProgress(element.status)
    ));

    if (activeGame)
    {
      return activeDate.format(API_DATE_FORMAT);
    }
  }
};

export const getDateTimeOfNextGameToday = (state) =>
{
  const gamesByDate = state.gamesByDate[activeDate.format(API_DATE_FORMAT)];
  if (gamesByDate)
  {
    const nextGame = gamesByDate.items.find((element) =>
    (
      !hasGameStarted(element.status)
    ));
    
    if (nextGame)
    {
      return nextGame.date;
    }  
  } 
}