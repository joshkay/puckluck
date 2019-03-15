import { combineReducers } from 'redux';
import {
  REQUEST_GAMES,
  RECEIVE_GAMES
} from '../actions';

const games = (
  state =
  {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) =>
{
  switch (action.type)
  {
    case REQUEST_GAMES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_GAMES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.dates,
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
    case REQUEST_GAMES:
    case RECEIVE_GAMES:
      return Object.assign({}, state.gamesByDate, {
        [action.date]: games(state, action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  gamesByDate
});

export default rootReducer;