import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: Observable<User>
  $uid: Observable<string>;

  constructor(
    public auth: AngularFireAuth
  ) {
    this.authState = auth.authState
    this.$uid = auth.authState.pipe(
      map(state => {
        localStorage.setItem('uid', state ? state.uid : null)

        return state ? state.uid : null
      })
    )

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
