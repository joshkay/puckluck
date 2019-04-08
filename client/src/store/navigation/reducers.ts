import moment from 'moment';
import { API_DATE_FORMAT, activeDate } from '../../common/nhl/helpers';

import {
  NavigationState,
  SELECT_DATE,
  NavigationActionTypes
} from './types';

const initialState: NavigationState = 
{
  selectedDate: activeDate.format(API_DATE_FORMAT)
}

export const navigationReducer = (
  state = initialState,
  action: NavigationActionTypes
): NavigationState =>
{
  switch (action.type)
  {
    case SELECT_DATE:
      return {
        selectedDate: moment(action.date).format(API_DATE_FORMAT)
      };
    default:
      return state;
  }
}