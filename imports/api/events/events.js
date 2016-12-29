import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Events = new Mongo.Collection('Events');

Events.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Events.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Events.schema = new SimpleSchema({
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

Events.attachSchema(Events.schema);

if (process.env.NODE_ENV === 'development') {
  global.Events = Events;
}

// Factory.define('document', Documents, {
//   title: () => faker.hacker.phrase(),
// });
