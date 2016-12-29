import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux';
import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../../api/transactions/transactions';
import { deleteTransaction } from '../../../actions/transactions';
import { TransactionTable } from '../../components/transactions/table';

const mapStateToProps = (state) => {
  return {
    period: state.app.period,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteTransaction,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  
  const transactions = Transactions.find({ 'user._id': Meteor.userId(), date: { $gte: new Date(props.period.from), $lte: new Date(props.period.to) } }).fetch();
  
  onData(null, {
    transactions,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(TransactionTable));