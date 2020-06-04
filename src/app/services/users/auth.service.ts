import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: Observable<User> = of(undefined)
  $uid: Observable<string> = of(undefined)

  constructor(
    public auth: AngularFireAuth
  ) {

    auth.authState.pipe(
      tap(user => {

        this.$user = of(user)
        if (user) {
          localStorage.setItem('uid', user.uid)
          this.$uid = of(user.uid)
        } else {
          localStorage.removeItem('uid')
        }
      })
    ).subscribe()

    this.$uid = of(localStorage.getItem('uid'))
  }

  signInWithGithub() {
    this.auth.signInWithPopup(new auth.GithubAuthProvider()).then(cred => {
      localStorage.setItem('uid', cred.user.uid)
      this.$uid = of(cred.user.uid)
    })
  }

  signOut() {
    this.auth.signOut()
    this.$uid = of(null)
  }
}
