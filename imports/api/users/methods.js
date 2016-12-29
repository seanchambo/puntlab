import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Transactions } from '../transactions/transactions';

Meteor.methods({
  updateGeneralSettings: (fields) => {
    
    const schema = new SimpleSchema({
      first: { type: String },
      last: { type: String },
      email: { type: String, regEx: SimpleSchema.RegEx.Email },
      username: { type: String }
    });
    
    check(fields, schema);
    
    if (Meteor.user().username !== fields.username) {
      Accounts.setUsername(Meteor.userId(), fields.username);
    }
    
    if (Meteor.user().emails[0].address !== fields.email) {
      Accounts.removeEmail(Meteor.userId(), Meteor.user().emails[0].address);
      Accounts.addEmail(Meteor.userId(), fields.email, true);
    }
    
    if (Meteor.user().profile.name.first !== fields.first) {
      Meteor.users.update(Meteor.userId(), {$set: { 'profile.name.first': fields.first }});
    }
    
    if (Meteor.user().profile.name.last !== fields.last) {
      Meteor.users.update(Meteor.userId(), {$set: { 'profile.name.last': fields.last }});
    }
  },
  updateBankrollSettings: (fields) => {
    
    const schema = new SimpleSchema({
      initialBalance: { type: Number, decimal: true },
      name: { type: String },
      date: { type: Date },
    });
    
    check(fields, schema);
    
    if (Meteor.user().profile.bankroll.transactionId) {
      Transactions.update(Meteor.user().profile.bankroll.transactionId, { $set: { date: fields.date, amount: fields.initialBalance }});
    } else {
      const transactionId = Transactions.insert({ user: { _id: Meteor.userId() }, amount: fields.initialBalance, date: fields.date, type: 'initial' });
      Meteor.users.update(Meteor.userId(), { $set: { 'profile.bankroll.transactionId' : transactionId }});
    }
    
    if (Meteor.user().profile.bankroll.name !== fields.name) {
      Meteor.users.update(Meteor.userId(), { $set: { 'profile.bankroll.name': fields.name }});
    }
  }
});