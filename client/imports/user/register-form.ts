import { Component, OnInit } from '@angular/core';
import { MD_INPUT_DIRECTIVES, MdInput } from '@angular2-material/input';
import { MD_GRID_LIST_DIRECTIVES, MdGridList } from '@angular2-material/grid-list';
import { MdButton } from 'ng2-material/components/button/button';
import { FormBuilder, ControlGroup, Validators, Control } from '@angular/common';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

@Component({
  selector: 'register-form',
  templateUrl: '/client/imports/user/register-template.html',
  directives: [MD_INPUT_DIRECTIVES, MdInput, MD_GRID_LIST_DIRECTIVES, MdGridList, MdButton]
})
export class RegisterForm implements OnInit {
  registerForm: ControlGroup;

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
      email: u.email,
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
    });
  }

}
