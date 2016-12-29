import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Sports = new Mongo.Collection('Sports');

Sports.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Sports.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Sports.schema = new SimpleSchema({
  name: {
    type: String,
  },
});

Sports.attachSchema(Sports.schema);

if (process.env.NODE_ENV === 'development') {
  global.Sports = Sports;
}

// Factory.define('document', Documents, {
//   title: () => faker.hacker.phrase(),
// });
