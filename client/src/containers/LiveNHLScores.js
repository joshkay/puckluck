import { connect } from 'react-redux';
import moment from 'moment';
import { API_DATE_FORMAT } from '../common/nhl/helpers';
import { fetchGamesToday, fetchGamesOnDate } from '../actions';
import { getDateOfActiveGames, getDateTimeOfNextGameToday } from '../store/helpers';
import NHLScores from '../components/nhl/NHLScores';

const mapStateToProps = (state) =>
{
  const date = moment(state.selectedDate).format(API_DATE_FORMAT);
  return {
    games: state.gamesByDate[date],
    date,
    activeDate: getDateOfActiveGames(state),
    nextGameDateTime: getDateTimeOfNextGameToday(state)
  }
}

const mapDispatchToProps = (dispatch) =>
{
  return {
    onScoreLoadRequest: (date) =>
    {
      dispatch(fetchGamesOnDate(date));
    },
    onScoreUpdateRequest: () => 
    {
      dispatch(fetchGamesToday());
    }
  }
}

const LiveNHLScores = connect(
  mapStateToProps,
  mapDispatchToProps
)(NHLScores);

export default LiveNHLScores;