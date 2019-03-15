import axios from 'axios';

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const requestGames = (date) =>
{
  return {
    type: REQUEST_GAMES,
    date
  }
};

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const receiveGames = (date, games) =>
{
  return {
    type: RECEIVE_GAMES,
    date,
    games,
    receivedAt: Date.now()
  }
};

export const fetchGames = (date) =>
{
  return async (dispatch) =>
  {
    dispatch(requestGames(date));

    const { data } = await axios.get('/api/nhl/scores');
    return dispatch(receiveGames(date, data.games));
  }
};

export const shouldFetchGames = (state, date) =>
{
  const games = state.gamesByDate[date];
  if (!games)
  {
    return true;
  }
  else if (games.isFetching)
  {
    return false;
  }
  else
  {
    return games.didInvalidate;
  }
};

export const fetchGamesIfNeeded = (date) =>
{
  return (dispatch, getState) =>
  {
    if (shouldFetchGames(getState(), date))
    {
      return dispatch(fetchGames(date));
    }
    else
    {
      return Promise.resolve();
    }
  }
};