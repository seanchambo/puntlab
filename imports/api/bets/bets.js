import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Bets = new Mongo.Collection('Bets');

Bets.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Bets.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Bets.schema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  'user._id': {
    type: String,
  },
  date: {
    type: Date,
  },
  competition: {
    type: Object,
  },
  'competition.name': {
    type: String,
  },
  'competition._id': {
    type: String,
  },
  sport: {
    type: Object,
  },
  'sport.name': {
    type: String,
  },
  'sport._id': {
    type: String,
  },
  market: {
    type: Object,
  },
  'market._id': {
    type: String,
  },
  'market.name': {
    type: String,
  },
  event: {
    type: Object,
  },
  'event._id': {
    type: String,
  },
  'event.name': {
    type: String,
  },
  odds: {
    type: Number,
    decimal: true,
  }, 
  return: {
    type: Number,
    decimal: true,
  },
  stake: {
    type: Number,
    decimal: true,
  },
  notes: {
    type: String,
    optional: true,
  }
});

Bets.attachSchema(Bets.schema);

if (process.env.NODE_ENV === 'development') {
  global.Bets = Bets;
}

// Factory.define('document', Documents, {
//   title: () => faker.hacker.phrase(),
// });
