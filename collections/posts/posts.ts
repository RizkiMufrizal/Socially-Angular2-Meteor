import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export let Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: () => {
    let user = Meteor.user();

    return !!user;
  },
  update: () => {
    let user = Meteor.user();

    return true;
  },
  remove: () => {
    let user = Meteor.user();

    return !!user;
  }
})
