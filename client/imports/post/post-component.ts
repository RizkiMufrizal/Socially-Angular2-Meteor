import { Component, OnInit } from '@angular/core';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdDialog, MdDialogActions, MdDialogTitle } from 'ng2-material/components/dialog';
import { MdButton } from 'ng2-material/components/button/button';
import { MD_INPUT_DIRECTIVES, MdInput } from '@angular2-material/input';
import { MdList, MdListItem } from 'ng2-material/components/list/list';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import * as _ from 'underscore';
import { Posts } from '../../../collections/posts/posts';

@Component({
  selector: 'post-component',
  templateUrl: '/client/imports/post/post-template.html',
  directives: [MdIcon, MdDialog, MdButton, MdList, MdListItem, MD_INPUT_DIRECTIVES, MdInput],
  providers: [MdIconRegistry]
})
export class PostComponent implements OnInit {

  posts: Mongo.Cursor<Object>;
  idPost: String;
  inputComment: String;
  inputPost: String;
  comments: Array<Object>;

  ngOnInit() {
    Meteor.subscribe('posts', () => {
      this.posts = Posts.find();
    });
  }

  sendPost(p) {
    Meteor.call('simpanPost', {
      idUser: 'id',
      username: 'test',
      status: p,
      dateTime: new Date(),
      comments: [],
      likes: []
    }, (error) => {
      if (error) {
        console.log(error);
      }
      console.log('sukses');
      this.inputPost = '';
    });
  }

  newComment(d, c) {
    d.show();
    this.comments = c.comments;
    this.idPost = c._id;
  }

  sendComment(c) {

    //let user = Meteor.users.findOne(Meteor.userId());

    this.comments.push({
      username: 'test',
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

    for (let i = 0; i < l.length; i++) {
      checkUser = 'id' === _.property('id')(l[i]);
      if (checkUser === true) {
        break;
      }
    }

    return checkUser;

  }

  sendLike(idPost, l) {
    let checkUser: Boolean;

    if (l.length === 0) {
      checkUser = false;
    } else {
      for (let i = 0; i < l.length; i++) {
        checkUser = 'id' === _.property('id')(l[i]);
        if (checkUser === true) {
          break;
        }
      }
    }

    if (checkUser === false) {
      l.push({
        id: 'id',
        username: 'test'
      });
    } else {
      l = _.without(l, _.findWhere(l, {
        id: 'id',
        username: 'test'
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
