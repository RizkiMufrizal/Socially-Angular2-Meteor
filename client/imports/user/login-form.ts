import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Meteor } from 'meteor/meteor';

@Component({
  selector: 'login-form',
  templateUrl: '/client/imports/user/login-template.html'
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

    let username: string = u.username;
    let password: string = u.password;

    Meteor.loginWithPassword(username, password, (error) => {
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
                name: user.profile.name,
                status: 'online'
              }
            }
          }
        );

        alert('berhasil login');
        window.location.href = '/post';
      }
    });

  }

}
