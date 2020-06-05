import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as $ from 'rxjs/operators'
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AuthService } from '../../../services/users/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  $user: Observable<any>

  constructor(
    private router: ActivatedRoute,
    public db: AngularFirestore,
    public auth: AuthService,
  ) {
    this.$user = this.router.params.pipe(
      $.switchMap(params =>
        this.auth.getUser(params.id)
      )
    )
  }

  ngOnInit(): void {
  }

}
