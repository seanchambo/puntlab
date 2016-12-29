import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Transactions = new Mongo.Collection('Transactions');

Transactions.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Transactions.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

if (process.env.NODE_ENV === 'development') {
  global.Transactions = Transactions;
}

Transactions.schema = new SimpleSchema({
  date: {
    type: Date,
  },
  notes: {
    type: String,
    optional: true,
  },
  amount: {
    type: Number,
    decimal: true,
  }, 
  type: {
    type: String,
    allowedValues: ['withdrawl', 'deposit', 'initial']
  },
  user: {
    type: Object,
  },
  'user._id': {
    type: String,
  }
});

Transactions.attachSchema(Transactions.schema);

// Factory.define('document', Documents, {
//   title: () => faker.hacker.phrase(),
// });
