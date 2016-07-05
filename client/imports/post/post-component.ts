import { Component, OnInit } from '@angular/core';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../../collections/posts/posts';

@Component({
  selector: 'post-component',
  templateUrl: '/client/imports/post/post-template.html',
  directives: [MdIcon],
  providers: [MdIconRegistry]
})
export class PostComponent implements OnInit {

  posts: Mongo.Cursor<Object>;

  ngOnInit() {
    Meteor.subscribe('posts', () => {
      this.posts = Posts.find();
    });
  }
}
