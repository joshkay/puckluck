import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../store';
import { selectDate } from '../store/navigation/actions';
import DatePicker from '../components/dateSelection/DatePicker';
import { getDateOfActiveGames } from '../store/helpers';
import { ViewportMinWidthProperty } from 'csstype';

interface Props
{
  numDatesBefore: number
  numDatesAfter: number
}

const mapStateToProps = (state: AppState, ownProps: Props) =>
{
  return {
    currentDate: state.navigation.selectedDate,
    activeDate: getDateOfActiveGames(state),
    numDatesBefore: ownProps.numDatesBefore, 
    numDatesAfter: ownProps.numDatesAfter
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
{
  return {
    onDateSelect: (date: string) =>
    {
      dispatch(selectDate(date));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker);