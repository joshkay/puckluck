import axios from 'axios';
import { Dispatch } from 'redux';
import {
  GamesResponse,
  REQUEST_GAMES_TODAY,
  REQUEST_GAMES_ON_DATE,
  REQUEST_GAMES_IN_DATE_RANGE,
  RECEIVE_GAMES,
  GameActionTypes
} from './types';

export const requestGamesToday = () : GameActionTypes =>
{
  return {
    type: REQUEST_GAMES_TODAY
  }
};

export const requestGamesOnDate = (date: string) : GameActionTypes =>
{
  return {
    type: REQUEST_GAMES_ON_DATE,
    date
  }
};

export const requestGamesInDateRange = (startDate: string, endDate: string) : GameActionTypes =>
{
  return {
    type: REQUEST_GAMES_IN_DATE_RANGE,
    startDate,
    endDate
  }
};

export const receiveGames = (gamesByDate: GamesResponse) =>
{
  return {
    type: RECEIVE_GAMES,
    gamesByDate,
    receivedAt: Date.now()
  }
};

export const fetchGamesToday = () =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestGamesToday());

    const { data } = await axios.get('/api/nhl/games');
    return dispatch(receiveGames(data.dates));
  }
};

export const fetchGamesOnDate = (date: string) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestGamesOnDate(date));

    const { data } = await axios.get(`/api/nhl/games/${date}`);
    return dispatch(receiveGames(data.dates));
  }
};

export const fetchGamesInDateRange = (startDate: string, endDate: string) =>
{
  return async (dispatch: Dispatch) =>
  {
    dispatch(requestGamesInDateRange(startDate, endDate));

    const { data } = await axios.get(`/api/nhl/games/${startDate}/${endDate}`);
    return dispatch(receiveGames(data.dates));
  }
};
