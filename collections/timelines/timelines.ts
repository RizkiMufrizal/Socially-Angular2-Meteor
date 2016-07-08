import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export let TimeLines = new Mongo.Collection('timelines');

TimeLines.allow({
  insert: () => {
    let user = Meteor.user();

    return !!user;
  }
});
