import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'register-form',
  templateUrl: '/client/imports/user/register-template.html',
})
export class RegisterForm implements OnInit {
  registerForm: ControlGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    let rf = new FormBuilder();

    this.registerForm = rf.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  register(u) {
    Accounts.createUser({
      username: u.username,
      password: u.password,
      profile: {
        name: u.name,
        status: 'register'
      }
    }, (error) => {
      if (typeof error !== 'undefined') {
        alert(error.reason);
      } else {
        (<Control>this.registerForm.controls['username']).updateValue('');
        (<Control>this.registerForm.controls['password']).updateValue('');
        (<Control>this.registerForm.controls['name']).updateValue('');
        alert('anda berhasil register');
        this.router.navigate(['Login']);
      }
    });
  }

}
