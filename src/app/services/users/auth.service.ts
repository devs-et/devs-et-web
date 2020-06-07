import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { SignInDialogService } from './sign-in-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: Observable<User> = of(undefined)
  $uid: Observable<string> = of(undefined)
  loaded: boolean = false

  constructor(
    public auth: AngularFireAuth,
    public db: AngularFirestore,
    public dialog: SignInDialogService,
  ) {

    auth.authState.pipe(
      tap(user => {

        this.$user = of(user)
        if (user) {
          localStorage.setItem('uid', user.uid)
          this.updateUser(user.uid, this.getUserData(user))
          this.$uid = of(user.uid)
        } else {
          localStorage.removeItem('uid')
        }

        this.loaded = true
      })
    ).subscribe()

    this.$uid = of(localStorage.getItem('uid'))
  }

  signInWithGithub() {
    this.auth.signInWithPopup(new auth.GithubAuthProvider()).then(cred => {
      localStorage.setItem('uid', cred.user.uid)
      this.$uid = of(cred.user.uid)
      this.updateUser(cred.user.uid, this.getUserData(cred.user))
      this.dialog.close()
    }).catch(err => {
      this.dialog.open({
        error: 'Unable to sign in, please try again.'
      })
    })
  }

  getUserData(user: User): any {
    return {
      displayName: user.displayName,
      email: user.email,
    }
  }

  signOut() {
    this.auth.signOut()
    this.$uid = of(null)
  }

  updateUser(uid: string, data: any) {
    this.db.collection('users').doc(uid).set(data, {
      merge: true
    })
  }

  getUser(uid: string): Observable<any> {
    return this.db.doc(`users/${uid}`).valueChanges()
  }
}
