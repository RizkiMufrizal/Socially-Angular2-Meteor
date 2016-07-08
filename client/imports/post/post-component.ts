import { Component, OnInit } from '@angular/core';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdDialog, MdDialogActions, MdDialogTitle } from 'ng2-material/components/dialog';
import { MdButton } from 'ng2-material/components/button/button';
import { MD_INPUT_DIRECTIVES, MdInput } from '@angular2-material/input';
import { MdList, MdListItem } from 'ng2-material/components/list/list';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { TimeAgoPipe } from 'angular2-moment';
import * as _ from 'underscore';
import { Posts } from '../../../collections/posts/posts';
import { SecureComponent } from '../secure/secure-component';
import { Router } from '@angular/router-deprecated';
import { MD_GRID_LIST_DIRECTIVES, MdGridList } from '@angular2-material/grid-list';

@Component({
  selector: 'post-component',
  templateUrl: '/client/imports/post/post-template.html',
  pipes: [TimeAgoPipe],
  directives: [MdIcon, MdDialog, MdButton, MdList, MdListItem, MD_INPUT_DIRECTIVES, MdInput, MD_GRID_LIST_DIRECTIVES, MdGridList],
  providers: [MdIconRegistry]
})
export class PostComponent extends SecureComponent implements OnInit {

  posts: Mongo.Cursor<Object>;
  idPost: String;
  inputComment: String;
  inputPost: String;
  comments: Array<Object>;

  constructor(router: Router) {
    super(router);
  }

  ngOnInit() {
    Meteor.subscribe('posts', () => {
      this.posts = Posts.find();
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
    });
  }

  newComment(d, c) {
    d.show();
    this.comments = c.comments;
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

    this.inputComment = '';
  }

  checkIfUserLike(l) {
    let checkUser: Boolean;
    let idUser = Meteor.userId();

    for (let i = 0; i < l.length; i++) {
      checkUser = 'idUser' === _.property('idUser')(l[i]);
      if (checkUser === true) {
        break;
      }
    }

    return checkUser;

  }

  sendLike(idPost, l) {
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
