import { combineReducers } from 'redux';
import moment from 'moment';
import { API_DATE_FORMAT, activeDate } from '../common/nhl/helpers';
import {
  SELECT_DATE,
  REQUEST_GAMES_TODAY,
  REQUEST_GAMES_ON_DATE,
  REQUEST_GAMES_IN_DATE_RANGE,
  RECEIVE_GAMES
} from '../actions';

const selectedDate = (state = activeDate.format(API_DATE_FORMAT), action) =>
{
  switch (action.type)
  {
    case SELECT_DATE:
      return moment(action.date).format(API_DATE_FORMAT);
    default:
      return state;
  }
}

const games = (
  state =
  {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action,
  date
) =>
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
        items: action.gamesByDate[date].games,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

const gamesByDate = (state = {}, action) =>
{
  switch (action.type)
  {
    case REQUEST_GAMES_TODAY:
    case REQUEST_GAMES_ON_DATE:
    case REQUEST_GAMES_IN_DATE_RANGE:
    case RECEIVE_GAMES:
      let gamesByDate = Object.assign({}, state);
      for (const date in action.gamesByDate)
      {
        Object.assign(gamesByDate,
        {
          [date]: games(state[date], action, date)
        });
      }

      return gamesByDate;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedDate,
  gamesByDate
});

export default rootReducer;