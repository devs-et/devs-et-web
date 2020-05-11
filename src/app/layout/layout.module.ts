import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    BasicLayoutComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [
    BasicLayoutComponent,
    NavbarComponent,
  ]
})
export class LayoutModule { }
