import { Router, OnActivate, ComponentInstruction } from '@angular/router-deprecated';
import { Meteor } from 'meteor/meteor';

export class SecureComponent implements OnActivate {
  constructor(private router: Router) { }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    if (Meteor.userId() === null) {
      this.router.navigate(['Login']);
    }
  }

}
