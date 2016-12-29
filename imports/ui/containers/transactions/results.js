import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import lodash from 'lodash';
import { Transactions } from '../../../api/transactions/transactions';
import { TransactionResults } from '../../components/transactions/results';

const mapStateToProps = (state) => {
  return {
    period: state.app.period,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const onPropsChange = (props, onData) => {
  
  const transactions = Transactions.find({ 'user._id': Meteor.userId(), date: { $gte: new Date(props.period.from), $lte: new Date(props.period.to) } }).fetch();
  
  const balance = Meteor.user().profile.bankroll.balance;
  
  let withdraw = 0;
  let deposit = 0;
  let result = 0;
  
  lodash.forEach(transactions, (transaction) => {
    if(transaction.type === 'withdrawl')
      withdraw += transaction.amount;
    else
      deposit += transaction.amount;
  });
  
  result = withdraw - deposit;
  
  onData(null, {
    balance,
    result,
    withdraw,
    deposit,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(TransactionResults));