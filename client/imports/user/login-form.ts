import { Component, OnInit } from '@angular/core';
import { MD_INPUT_DIRECTIVES, MdInput } from '@angular2-material/input';
import { MD_GRID_LIST_DIRECTIVES, MdGridList } from '@angular2-material/grid-list';
import { MdButton } from 'ng2-material/components/button/button';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Meteor } from 'meteor/meteor';

@Component({
  selector: 'login-form',
  templateUrl: '/client/imports/user/login-template.html',
  directives: [MD_INPUT_DIRECTIVES, MdInput, MD_GRID_LIST_DIRECTIVES, MdGridList, MdButton]
})
export class LoginForm implements OnInit {
  loginForm: ControlGroup;

  ngOnInit() {
    let rf = new FormBuilder();

    this.loginForm = rf.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginProcess(u) {
    Meteor.loginWithPassword(u.email, u.password, function(error) {
      if (typeof error !== 'undefined') {
        alert(error.reason);
      } else {
        var user = Meteor.users.findOne(Meteor.userId());

        Meteor.users.update(
          {
            _id: user._id
          }, {
            $set: {
              profile: {
                status: 'online'
              }
            }
          }
        );

        alert('berhasil login');
      }
    });
  }

}
