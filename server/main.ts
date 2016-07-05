import './posts';
import '../collections/posts/methods';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../collections/posts/posts';

Meteor.startup(() => {
  if (Posts.find().count() === 0) {
    let posts = [
      {
        username: 'rizki',
        status: 'latihan angular2 meteor',
        dateTime: new Date(),
        comments: [
          {
            username: 'mufrizal',
            comment: 'sedap'
          }
        ],
        likes: [
          {
            username: 'mufrizal'
          }
        ]
      },
      {
        username: 'mufrizal',
        status: 'angular 2 meteor',
        dateTime: new Date(),
        comments: [
          {
            username: 'rizki',
            comment: 'oke'
          }
        ],
        likes: [
          {
            username: 'rizki'
          }
        ]
      }
    ];

    for (let i = 0; i < posts.length; i++) {
      Posts.insert(posts[i]);
    }

  }
});
