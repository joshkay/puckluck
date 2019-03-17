import { connect } from 'react-redux';
import { selectDate } from '../actions';
import DatePicker from '../components/dateSelection/DatePicker';
import { getDateOfActiveGames } from '../store/helpers';

const mapStateToProps = (state, ownProps) =>
{
  return {
    currentDate: state.selectedDate,
    activeDate: getDateOfActiveGames(state),
    numDatesBefore: ownProps.numDatesBefore, 
    numDatesAfter: ownProps.numDatesAfter
  }
}

const mapDispatchToProps = (dispatch) =>
{
  return {
    onDateSelect: (date) =>
    {
      dispatch(selectDate(date));
    }
  }
}

const SelectedDatePicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker);

export default SelectedDatePicker;