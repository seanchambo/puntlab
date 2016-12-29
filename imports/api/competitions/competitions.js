import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Competitions = new Mongo.Collection('Competitions');

Competitions.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Competitions.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Competitions.schema = new SimpleSchema({
  name: {
    type: String,
  },
  'sport.name': {
    type: String,
  },
  'sport._id': {
    type: String,
  }
});

Competitions.attachSchema(Competitions.schema);

if (process.env.NODE_ENV === 'development') {
  global.Competitions = Competitions;
}

// Factory.define('document', Documents, {
//   title: () => faker.hacker.phrase(),
// });
