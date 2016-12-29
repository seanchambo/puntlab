import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Markets } from './markets';
// import { rateLimit } from '../../modules/rate-limit.js';

export const insertMarket = new ValidatedMethod({
  name: 'markets.insert',
  validate: Markets.schema.validator(),
  run(document) {
    return Markets.insert(document);
  },
});