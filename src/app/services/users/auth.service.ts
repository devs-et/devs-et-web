import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { Observable, of } from 'rxjs';
import * as $ from 'rxjs/operators';
import * as _ from 'ramda';
import { SignInDialogService } from './sign-in-dialog.service';
import { HttpClient } from '@angular/common/http';
import { UserCrudService } from './user-crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: Observable<User> = of(undefined)
  $uid: Observable<string> = of(undefined)
  loaded: boolean = false

  constructor(
    public auth: AngularFireAuth,
    public dialog: SignInDialogService,
    private userCrud: UserCrudService,
    private db: AngularFirestore,
  ) {

    auth.authState.pipe(
      $.tap(user => {
        this.$user = of(user)

        if (user) {
          localStorage.setItem('uid', user.uid)
          this.userCrud.getUserData(user).subscribe(user => {
            this.userCrud.updateUser(user.uid, user)
          })
          this.$uid = of(user.uid)
        } else {
          localStorage.removeItem('uid')
        }

        this.loaded = true
      })
    ).subscribe()

    this.$uid = of(localStorage.getItem('uid'))
  }

  async signInWithGithub() {
    return await this.auth.signInWithPopup(new auth.GithubAuthProvider()).then(cred => {
      localStorage.setItem('uid', cred.user.uid)
      this.$uid = of(cred.user.uid)
      this.userCrud.getUserData(cred.user).subscribe(user => {
        this.userCrud.updateUser(cred.user.uid, user)
      })
      this.dialog.close()
    }).catch(err => {
      this.dialog.open({
        error: 'Unable to sign in, please try again.'
      })
    })
  }

  signOut() {
    this.auth.signOut()
    this.$uid = of(null)
  }

  getUser(uid: string): Observable<any> {
    if (uid !== '') {
      return this.db.collection('users').doc(uid).valueChanges()
    } else {
      throw new Error(`Invalid UID "${uid}"`)
    }
  }
}
