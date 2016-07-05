import { Component, OnInit } from '@angular/core';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../../collections/posts/posts';

@Component({
  selector: 'post-component',
  templateUrl: '/client/imports/post/post-template.html'
})
export class PostComponent implements OnInit {

  posts: Mongo.Cursor<Object>;

  ngOnInit() {
    Meteor.subscribe('posts', () => {
      this.posts = Posts.find();
    });
  }
}
