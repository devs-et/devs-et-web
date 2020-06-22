import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/users/auth.service';
import { SignInDialogService } from '../../services/users/sign-in-dialog.service';
import { UserCrudService } from '../../services/users/user-crud.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  $user: Observable<any>;

  constructor(
    public signInDialog: SignInDialogService,
    public auth: AuthService,
    public userCrud: UserCrudService,
    private router: Router,
  ) {
    this.auth.$uid.subscribe(uid => {
      this.$user = userCrud.getUser(uid)
    })
  }

  ngOnInit(): void {
  }

  showSignInDialog() {
    this.signInDialog.open()
  }

  userProfile(uid: string) {
    this.userCrud.getUser(uid).subscribe(user => {
      this.router.navigate([user.githubUser?.login])
    })
  }
}
