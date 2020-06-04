import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    BasicLayoutComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    RouterModule,
  ],
  exports: [
    BasicLayoutComponent,
    NavbarComponent,
  ]
})
export class LayoutModule { }
