export interface Game 
{
  home: Team;
  away: Team;
  date: string;
  status: string;
  currentPeriodName: string;
  currentPeriodTimeLeft: string;
}

export interface Team 
{
  id: number;
  name: string;
  score: number;
}

export interface GameState
{
  [date: string]: GamesRequestStatus;
}

export interface GamesRequestStatus
{
  isFetching: boolean;
  didInvalidate: boolean;
  items: Game[];
}

export interface GamesResponse
{
  [date: string]: Game[];
}

export const REQUEST_GAMES_TODAY = 'REQUEST_GAMES_TODAY';
export const REQUEST_GAMES_ON_DATE = 'REQUEST_GAMES_DATE';
export const REQUEST_GAMES_IN_DATE_RANGE = 'REQUEST_GAMES_IN_DATE_RANGE';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';

interface RequestGamesTodayAction
{
  type: typeof REQUEST_GAMES_TODAY;
}

interface RequestGamesOnDateAction
{
  type: typeof REQUEST_GAMES_ON_DATE;
  date: string;
}

interface RequestGamesInDateRangeAction
{
  type: typeof REQUEST_GAMES_IN_DATE_RANGE;
  startDate: string;
  endDate: string;
}

interface ReceiveGamesAction
{
  type: typeof RECEIVE_GAMES;
  gamesByDate: {
    [date: string]: Game[];
  };
  receivedAt: Date;
}

export type GameActionTypes = RequestGamesTodayAction |
  RequestGamesOnDateAction |
  RequestGamesInDateRangeAction |
  ReceiveGamesAction;