import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import moment from 'moment';
import { API_DATE_FORMAT } from '../common/nhl/helpers';
import { fetchGamesToday, fetchGamesOnDate } from '../store/games/actions';
import { getDateOfActiveGames, getDateTimeOfNextGameToday } from '../store/helpers';
import NHLScores from '../components/nhl/NHLScores';
import { AppState } from '../store';

const mapStateToProps = (state: AppState) =>
{
  const date = moment(state.navigation.selectedDate).format(API_DATE_FORMAT);
  return {
    games: state.gamesByDate[date] ? state.gamesByDate[date].items : [],
    date,
    activeDate: getDateOfActiveGames(state),
    nextGameDateTime: getDateTimeOfNextGameToday(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
{
  return {
    onScoreLoadRequest: (date: string) =>
    {
      fetchGamesOnDate(date)(dispatch);
    },
    onScoreUpdateRequest: () => 
    {
      fetchGamesToday()(dispatch);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NHLScores);