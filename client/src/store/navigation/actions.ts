import {
  SELECT_DATE,
  NavigationActionTypes
} from './types';

export const selectDate = (date: string) : NavigationActionTypes =>
{
  return {
    type: SELECT_DATE,
    date
  }
};
