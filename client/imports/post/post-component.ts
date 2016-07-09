import { Component, OnInit } from '@angular/core';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { TimeAgoPipe } from 'angular2-moment';
import * as _ from 'underscore';
import { Posts } from '../../../collections/posts/posts';
import { TimeLines } from '../../../collections/timelines/timelines';
import { SecureComponent } from '../secure/secure-component';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'post-component',
  templateUrl: '/client/imports/post/post-template.html',
  pipes: [TimeAgoPipe]
})
export class PostComponent extends SecureComponent implements OnInit {

  posts: Mongo.Cursor<Object>;
  timelines: Mongo.Cursor<Object>;
  idPost: String;
  inputComment: String;
  inputPost: String;
  comments: Array<Object>;
  nameUserPost: String;

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {
    Meteor.subscribe('posts', () => {
      this.posts = Posts.find();
    });
    Meteor.subscribe('timelines', () => {
      this.timelines = TimeLines.find();
    });
  }

  sendPost(p) {
    let name = Meteor.users.findOne(Meteor.userId()).profile.name;
    Meteor.call('simpanPost', {
      idUser: Meteor.userId(),
      name: name,
      status: p,
      dateTime: new Date(),
      comments: [],
      likes: []
    }, (error) => {
      if (error) {
        console.log(error);
      }
      this.inputPost = '';

      Meteor.call('simpanTimeLine', {
        timeDate: new Date(),
        status: 'post',
        message: `${name} send post '${p}'`
      }, (error) => {
        if (error) {
          console.log(error);
        }
      });
    });
  }

  newComment(c) {
    this.comments = c.comments;
    this.nameUserPost = c.name;
    this.idPost = c._id;
  }

  sendComment(c) {

    let name = Meteor.users.findOne(Meteor.userId()).profile.name;

    this.comments.push({
      idUser: Meteor.userId(),
      name: name,
      comment: c
    });

    Posts.update(
      {
        _id: this.idPost
      }, {
        $set: {
          comments: this.comments
        }
      }
    );

    Meteor.call('simpanTimeLine', {
      timeDate: new Date(),
      status: 'comment',
      message: `${name} commented on ${this.nameUserPost}'s post`
    }, (error) => {
      if (error) {
        console.log(error);
      }
    });

    this.inputComment = '';
  }

  sendLike(idPost, l, n) {
    let checkUser: Boolean;
    let idUser = Meteor.userId();

    if (l.length === 0) {
      checkUser = false;
    } else {
      for (let i = 0; i < l.length; i++) {
        checkUser = idUser === _.property('idUser')(l[i]);
        if (checkUser === true) {
          break;
        }
      }
    }

    let name = Meteor.users.findOne(Meteor.userId()).profile.name;

    if (checkUser === false) {
      l.push({
        idUser: idUser,
        name: name,
      });

      Meteor.call('simpanTimeLine', {
        timeDate: new Date(),
        status: 'like',
        message: `${name} likes ${n}'s post`
      }, (error) => {
        if (error) {
          console.log(error);
        }
      });

    } else {
      l = _.without(l, _.findWhere(l, {
        idUser: Meteor.userId(),
        name: name,
      }));
    }

    Posts.update(
      {
        _id: idPost
      }, {
        $set: {
          likes: l
        }
      }
    );

  }
}
