import { Component, OnInit } from '@angular/core';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdDialog, MdDialogActions, MdDialogTitle } from 'ng2-material/components/dialog';
import { MdButton } from 'ng2-material/components/button/button';
import { MD_INPUT_DIRECTIVES, MdInput } from '@angular2-material/input';
import { MdList, MdListItem } from 'ng2-material/components/list/list';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Posts } from '../../../collections/posts/posts';

@Component({
  selector: 'post-component',
  templateUrl: '/client/imports/post/post-template.html',
  directives: [MdIcon, MdDialog, MdButton, MdList, MdListItem, MD_INPUT_DIRECTIVES, MdInput],
  providers: [MdIconRegistry]
})
export class PostComponent implements OnInit {

  posts: Mongo.Cursor<Object>;
  comments: Array<Object>;

  ngOnInit() {
    Meteor.subscribe('posts', () => {
      this.posts = Posts.find();
    });
  }

  newComment(d, c) {
    d.show();
    this.comments = c;
  }

  sendComment(c) {
    console.log(c);
  }

  sendLike() {

  }
}
