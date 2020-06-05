import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignInDialogComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class UsersModule { }
