import './posts';
import '../collections/posts/methods';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/posts/posts';
import { TimeLines } from '../collections/timelines/timelines';

Meteor.startup(() => {
  Posts.remove({});
  TimeLines.remove({});
});
