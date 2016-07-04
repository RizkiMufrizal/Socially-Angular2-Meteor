import 'reflect-metadata';
import { Component } from '@angular/core';
import { bootstrap } from 'angular2-meteor-auto-bootstrap';
import { MeteorComponent } from 'angular2-meteor';

@Component({
  selector: 'app',
  templateUrl: '/client/app.html'
})
class Socially extends MeteorComponent { }

bootstrap(Socially);
