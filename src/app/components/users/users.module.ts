import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignInDialogComponent } from './sign-in-dialog/sign-in-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SignInComponent,
    SignInDialogComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    IonicModule.forRoot(),
  ]
})
export class UsersModule { }
