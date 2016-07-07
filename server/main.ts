import './posts';
import '../collections/posts/methods';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/posts/posts';

Meteor.startup(() => {
  Posts.remove({});
  Meteor.users.remove({});
});
