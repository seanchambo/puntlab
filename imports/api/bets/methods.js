import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Bets } from './bets';
// import { rateLimit } from '../../modules/rate-limit.js';

export const insertBet = new ValidatedMethod({
  name: 'bets.insert',
  validate: Bets.schema.validator(),
  run(document) {
    Bets.insert(document);
  },
});

export const removeBet = new ValidatedMethod({
  name: 'bets.delete',
  validate: new SimpleSchema({
    _id: {
      type: String
    }
  }).validator(),
  run(document) {
    const bet = Bets.findOne(document._id);
    
    if(bet && bet.user._id == Meteor.userId()){
      Bets.remove({_id: document._id}); 
    } else {
      throw new Meteor.Error(500, 'The bet could not be deleted, Try Again!');
    }
  },
});

export const updateBet = new ValidatedMethod({
  name: 'bets.update',
  validate: Bets.schema.validator(),
  run(document) {
    
    const betId = document._id;
    
    delete document._id;
    
    Bets.update(betId, {$set: document});
  },
});

Bets.before.insert( (userId, doc) => {
  if(doc.return <= 0)
    Meteor.users.update({ _id: userId}, { $inc: { 'profile.bankroll.balance' : - doc.stake }});
  else
    Meteor.users.update({ _id: userId}, { $inc: { 'profile.bankroll.balance' : doc.return - doc.stake }});
});

Bets.before.remove( (userId, doc) => {
  if(doc.return <= 0)
    Meteor.users.update({ _id: userId}, { $inc: { 'profile.bankroll.balance' : doc.stake }});
  else
    Meteor.users.update({ _id: userId}, { $inc: { 'profile.bankroll.balance' : doc.stake - doc.return }});
});

Bets.after.update(function (userId, doc, fieldNames, modifier, options) {
  
  const diffStake = this.previous.stake - doc.stake;
  const diffReturn = doc.return - this.previous.return;
  const diff = diffReturn + diffStake;
  
  console.log(diffStake);
  console.log(diffReturn);
  console.log(diff);
  
  Meteor.users.update({ _id: userId }, { $inc: { 'profile.bankroll.balance' : diff }});
}, {fetchPrevious: true});

// rateLimit({
//   methods: [
//     insertDocument,
//     updateDocument,
//     removeDocument,
//   ],
//   limit: 5,
//   timeRange: 1000,
// });
