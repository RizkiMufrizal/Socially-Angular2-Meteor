import 'reflect-metadata';
import { MATERIAL_PROVIDERS, MATERIAL_DIRECTIVES } from 'ng2-material';
import { MdToolbar } from '@angular2-material/toolbar';

import { Component, provide } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { MeteorComponent } from 'angular2-meteor';
import { ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig } from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';

import { HomeComponent } from './imports/home/home-component';
import { PostComponent } from './imports/post/post-component';

@Component({
  selector: 'app',
  templateUrl: '/client/app.html',
  directives: [ROUTER_DIRECTIVES, MATERIAL_DIRECTIVES, MdToolbar]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent },
  { path: '/post', name: 'Post', component: PostComponent }
])
class Socially extends MeteorComponent { }

bootstrap(Socially, [ROUTER_PROVIDERS, MATERIAL_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);
