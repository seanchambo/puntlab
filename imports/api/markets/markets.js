import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Markets = new Mongo.Collection('Markets');

Markets.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Markets.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Markets.schema = new SimpleSchema({
  name: {
    type: String,
  },
  'sport._id': {
    type: String,
  },
  'sport.name': {
    type: String,
  }
});

Markets.attachSchema(Markets.schema);

if (process.env.NODE_ENV === 'development') {
  global.Markets = Markets;
}

// Factory.define('document', Documents, {
//   title: () => faker.hacker.phrase(),
// });
