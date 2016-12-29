import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Competitions } from './competitions';
// import { rateLimit } from '../../modules/rate-limit.js';

export const insertCompetition = new ValidatedMethod({
  name: 'competitions.insert',
  validate: Competitions.schema.validator(),
  run(document) {
    return Competitions.insert(document);
  },
});