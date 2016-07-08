import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'register-form',
  templateUrl: '/client/imports/user/register-template.html'
})
export class RegisterForm implements OnInit {
  registerForm: ControlGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    let rf = new FormBuilder();

    this.registerForm = rf.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  register(u) {
    Accounts.createUser({
      username: u.email,
      password: u.password,
      profile: {
        name: u.name,
        status: 'register'
      }
    }, (error) => {
      if (error) {
        console.log(error);
      }

      (<Control>this.registerForm.controls['email']).updateValue('');
      (<Control>this.registerForm.controls['password']).updateValue('');
      (<Control>this.registerForm.controls['name']).updateValue('');
      this.router.navigate(['Login']);
    });
  }

}
