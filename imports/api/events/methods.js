import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Events } from './events';
// import { rateLimit } from '../../modules/rate-limit.js';

export const insertEvent = new ValidatedMethod({
  name: 'events.insert',
  validate: Events.schema.validator(),
  run(document) {
    return Events.insert(document);
  },
});