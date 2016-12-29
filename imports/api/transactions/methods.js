import { Transactions } from './transactions';

export const insertTransaction = new ValidatedMethod({
  name: 'transactions.insert',
  validate: Transactions.schema.validator(),
  run(document) {
    Transactions.insert(document);
  },
});

export const removeTransaction = new ValidatedMethod({
  name: 'transactions.delete',
  validate: new SimpleSchema({
    _id: {
      type: String
    }
  }).validator(),
  run(document) {
    const transaction = Transactions.findOne(document._id);
    
    if(transaction && transaction.user._id == Meteor.userId()){
      Transactions.remove({ _id: document._id }); 
    } else {
      throw new Meteor.Error(500, 'The bet could not be deleted, Try Again!');
    }
  },
});

Transactions.before.insert( (userId, doc) => {
  if (doc.type === 'withdrawl')
    Meteor.users.update({ _id: userId }, { $inc: { 'profile.bankroll.balance' : -doc.amount }});
  else
    Meteor.users.update({ _id: userId }, { $inc: { 'profile.bankroll.balance' : doc.amount }});
});

Transactions.before.remove( (userId, doc) => {
  if (doc.type === 'withdrawl')
    Meteor.users.update({ _id: userId }, { $inc: { 'profile.bankroll.balance' : doc.amount }});
  else
    Meteor.users.update({ _id: userId }, { $inc: { 'profile.bankroll.balance' : -doc.amount }});
});

Transactions.after.update(function (userId, doc, fieldNames, modifier, options) {
  Meteor.users.update({ _id: userId }, { $inc: { 'profile.bankroll.balance' : doc.amount - this.previous.amount }});
}, {fetchPrevious: true});