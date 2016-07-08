import 'reflect-metadata';
import { MATERIAL_PROVIDERS, MATERIAL_DIRECTIVES } from 'ng2-material';
import { MdToolbar } from '@angular2-material/toolbar';

import { Component, provide } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { MeteorComponent } from 'angular2-meteor';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, Router } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from './imports/home/home-component';
import { PostComponent } from './imports/post/post-component';
import { RegisterForm } from './imports/user/register-form';
import { LoginForm } from './imports/user/login-form';
import { AboutComponent } from './imports/about/about-component';

@Component({
  selector: 'app',
  templateUrl: '/client/app.html',
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, MdToolbar]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent },
  { path: '/post', name: 'Post', component: PostComponent },
  { path: '/register', name: 'Register', component: RegisterForm },
  { path: '/login', name: 'Login', component: LoginForm },
  { path: '/about', name: 'About', component: AboutComponent }
])
class Socially extends MeteorComponent {

  idUser: String;

  constructor(private router: Router) {
    super();
    this.autorun(() => {
      this.idUser = Meteor.userId();
    });
  }

  logout() {
    let user = Meteor.users.findOne(Meteor.userId());

    Meteor.users.update(
      {
        _id: user._id
      }, {
        $set: {
          profile: {
            name: user.profile.name,
            status: 'offline'
          }
        }
      }
    );
    Meteor.logout();
    this.router.navigate(['Login']);
  }

}

bootstrap(Socially, [ROUTER_PROVIDERS, MATERIAL_PROVIDERS, HTTP_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
