import { Posts } from './posts';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  simpanPost(post) {
    Posts.insert(post);
  },
  hapusPost(post) {
    Posts.remove(post);
  }
});
