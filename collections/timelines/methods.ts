import { TimeLines } from './timelines';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  simpanTimeLine(timeLine) {
    TimeLines.insert(timeLine);
  }
});
