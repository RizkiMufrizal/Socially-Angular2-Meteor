import { Meteor } from 'meteor/meteor';

Meteor.publish('users', () => {
  return Meteor.users.find({}, {
    fields: {
      username: 1,
      profile: 1
    }
  });
});
