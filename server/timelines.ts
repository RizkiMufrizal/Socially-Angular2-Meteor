import { TimeLines } from '../collections/timelines/timelines';
import { Meteor } from 'meteor/meteor';

Meteor.publish('timelines', () => {
  return TimeLines.find();
});
