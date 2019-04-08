export interface NavigationState
{
  selectedDate: string;
}

export const SELECT_DATE = 'SELECT_DATE';

interface SelectDateAction 
{
  type: typeof SELECT_DATE;
  date: string;
}

export type NavigationActionTypes = SelectDateAction;