import { Posts } from '../collections/posts/posts';
import { Meteor } from 'meteor/meteor';

Meteor.publish('posts', () => {
  return Posts.find();
});
