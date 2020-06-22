import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as $ from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/users/auth.service';

// import { graphql } from '@octokit/graphql';
// import * as auth from '@octokit/auth';
import { UserCrudService } from '../../../services/users/user-crud.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  $user: Observable<any>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public db: AngularFirestore,
    public auth: AuthService,
    public userCrud: UserCrudService,
  ) {
    this.$user = this.route.params.pipe(
      $.switchMap(params =>
        this.userCrud.getUserByUsername(params.username)
      ),
      $.tap(user => {
        if (user) {
          auth.$uid.subscribe(uid => {
            if (uid) {
              this.userCrud.refreshUser(user)
            }
          })
        } else {
          router.navigate(['/'])
        }
      })
    )

    this.gql()
  }

  ngOnInit(): void {
  }

  async gql() {
    // const cred = auth.createTokenAuth('2acb7e38a98ba4f7e1eea00e1bf843adef63e32c')

    // const graphqlWithAuth = graphql.defaults({
    //   request: {
    //     hook: cred.hook
    //   }
    // })

    // graphqlWithAuth(`{
    //   user()
    // }`).then(console.log).catch(console.log)
  }

}
