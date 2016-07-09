import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from '@angular/common';
import { Meteor } from 'meteor/meteor';
import { SweetAlertService } from 'ng2-sweetalert2';

@Component({
  selector: 'login-form',
  templateUrl: '/client/imports/user/login-template.html',
  providers: [SweetAlertService]
})
export class LoginForm implements OnInit {
  loginForm: ControlGroup;

  swalService: SweetAlertService;

  static get parameters() {
    return [[SweetAlertService]];
  }

  constructor(swal) {
    this.swalService = swal;
  }

  ngOnInit() {
    let rf = new FormBuilder();

    this.loginForm = rf.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginProcess(u) {

    let username: string = u.username;
    let password: string = u.password;

    Meteor.loginWithPassword(username, password, (error) => {
      if (typeof error !== 'undefined') {
        this.swalService.swal('Warning', error.reason, 'error');
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

        this.swalService.swal('Info', 'anda berhasil login', 'success');
        window.location.href = '/post';
      }
    });

  }

}
