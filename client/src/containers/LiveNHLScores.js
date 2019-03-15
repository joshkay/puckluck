import { connect } from 'react-redux';
import moment from 'moment';
import { fetchGames } from '../actions';
import NHLScores from '../components/nhl/NHLScores';

const getGamesForDates = (dates) =>
{
  
}

const mapStateToProps = (state) =>
{
  return {
    games: state.gamesByDate[moment().format('YYYY-MM-DD')]
  }
}

const mapDispatchToProps = (dispatch) =>
{
  return {
    onScoreUpdateRequest: (date) => 
    {
      dispatch(fetchGames(date))
    }
  }
}

const LiveNHLScores = connect(
  mapStateToProps,
  mapDispatchToProps
)(NHLScores);

export default LiveNHLScores;