import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { composeWithTracker } from 'react-komposer';
import { push } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../../api/transactions/transactions';
import { saveBankrollSettings, changeBankrollDate } from '../../../actions/settings';
import { BankrollTab } from '../../components/settings/bankroll-tab';

const mapStateToProps = (state) => {
  return {
    bankrollDate: state.settings.bankrollDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveBankrollSettings,
    changeBankrollDate,
  }, dispatch);
};

const onPropsChange = (props, onData) => {
  const user = Meteor.user();
  let transaction = null;
  
  if (user && user.profile.bankroll.transactionId)
    transaction = Transactions.findOne(user.profile.bankroll.transactionId);
    
  onData(null, {
    user,
    transaction,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(composeWithTracker(onPropsChange)(BankrollTab));