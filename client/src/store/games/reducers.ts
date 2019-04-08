import {
  GameState,
  GamesRequestStatus,
  REQUEST_GAMES_TODAY,
  REQUEST_GAMES_ON_DATE,
  REQUEST_GAMES_IN_DATE_RANGE,
  RECEIVE_GAMES,
  GameActionTypes
} from './types';

const initialState: GameState =
{

}

const initialGamesState: GamesRequestStatus =
{
  isFetching: false,
  didInvalidate: false,
  items: []
}

export const gamesReducer = (
  state = initialState, 
  action: GameActionTypes
): GameState =>
{
  switch (action.type)
  {
    // case REQUEST_GAMES_TODAY:
    // case REQUEST_GAMES_ON_DATE:
    // case REQUEST_GAMES_IN_DATE_RANGE:
    case RECEIVE_GAMES:
      let gamesByDate = Object.assign({}, state);
      for (const date in action.gamesByDate)
      {
        Object.assign(gamesByDate,
        {
          [date]: gamesOnDateReducer(state[date], action, date)
        });
      }

      return gamesByDate;
    default:
      return state;
  }
}

const gamesOnDateReducer = (
  state = initialGamesState,
  action: GameActionTypes,
  date: string
): GamesRequestStatus =>
{
  switch (action.type)
  {
    case REQUEST_GAMES_TODAY:
    case REQUEST_GAMES_ON_DATE:
    case REQUEST_GAMES_IN_DATE_RANGE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_GAMES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.gamesByDate[date],
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};