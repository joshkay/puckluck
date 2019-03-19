import axios from 'axios';

export const SELECT_DATE = 'SELECT_DATE';
export const selectDate = (date) =>
{
  return {
    type: SELECT_DATE,
    date
  }
};

export const REQUEST_GAMES_TODAY = 'REQUEST_GAMES_TODAY';
export const requestGamesToday = () =>
{
  return {
    type: REQUEST_GAMES_TODAY
  }
};

export const REQUEST_GAMES_ON_DATE = 'REQUEST_GAMES_DATE';
export const requestGamesOnDate = (date) =>
{
  return {
    type: REQUEST_GAMES_TODAY,
    date
  }
};

export const REQUEST_GAMES_IN_DATE_RANGE = 'REQUEST_GAMES_IN_DATE_RANGE';
export const requestGamesInDateRange = (startDate, endDate) =>
{
  return {
    type: REQUEST_GAMES_IN_DATE_RANGE,
    startDate,
    endDate
  }
};

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const receiveGames = (gamesByDate) =>
{
  return {
    type: RECEIVE_GAMES,
    gamesByDate,
    receivedAt: Date.now()
  }
};

export const fetchGamesToday = () =>
{
  return async (dispatch) =>
  {
    dispatch(requestGamesToday());

    const { data } = await axios.get('/api/nhl/games');
    return dispatch(receiveGames(data.dates));
  }
};

export const fetchGamesOnDate = (date) =>
{
  return async (dispatch) =>
  {
    dispatch(requestGamesOnDate(date));

    const { data } = await axios.get(`/api/nhl/games/${date}`);
    return dispatch(receiveGames(data.dates));
  }
};

export const fetchGamesInDateRange = (startDate, endDate) =>
{
  return async (dispatch) =>
  {
    dispatch(requestGamesInDateRange(startDate, endDate));

    const { data } = await axios.get(`/api/nhl/games/${startDate}/${endDate}`);
    return dispatch(receiveGames(data.dates));
  }
};
